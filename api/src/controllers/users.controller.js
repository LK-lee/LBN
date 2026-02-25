import userModel from "../models/users.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import path from 'path';
import { existsSync, unlinkSync } from "fs";
import jwt from 'jsonwebtoken';
import {sendUserDetails} from '../utils/email.js';
import os from "os";
import dns from 'dns';
import { promisify } from 'util';
import net from 'net';

const dnsResolveMx = promisify(dns.resolveMx);

const jwt_secret = "lbnwebsite";

function getSystemIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    const lname = name.toLowerCase();
    if (!lname.includes("wi-fi") && !lname.includes("ethernet")) continue;
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "127.0.0.1";
}

const ip_address = getSystemIP();

function validateEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getEmailDomain(email) {
  return email.split('@')[1];
}

// ============ SMTP EMAIL VERIFICATION WITH PROPER ASYNC/AWAIT ============

/**
 * Check if email domain has MX records (can receive emails)
 */
async function checkDomainHasMX(domain) {
  try {
    const mxRecords = await dnsResolveMx(domain);
    return mxRecords && mxRecords.length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Get MX server for domain
 */
async function getMXServer(domain) {
  try {
    const mxRecords = await dnsResolveMx(domain);
    if (mxRecords && mxRecords.length > 0) {
      mxRecords.sort((a, b) => a.priority - b.priority);
      return mxRecords[0].exchange;
    }
  } catch (error) {
    console.error(`Error getting MX server for ${domain}:`, error.message);
  }
  return null;
}

/**
 * Verify if email actually exists by connecting to SMTP server
 * This performs a real email existence check without sending an email
 * Optimized with Promise.race for timeout
 */
async function verifyEmailExists(email) {
  const domain = getEmailDomain(email);
  
  // Step 1: Check if domain has MX records
  const hasMX = await checkDomainHasMX(domain);
  if (!hasMX) {
    return { 
      valid: false, 
      reason: 'Email domain does not exist or cannot receive emails' 
    };
  }

  // Step 2: Get MX server
  const mxServer = await getMXServer(domain);
  if (!mxServer) {
    return { 
      valid: false, 
      reason: 'Could not find mail server for this domain' 
    };
  }

  // Step 3: Connect to SMTP server and verify email with Promise
  return new Promise((resolve) => {
    let step = 0;
    let rcptToResponse = false;
    let isResolved = false;
    
    const socket = net.createConnection(25, mxServer);
    
    // Set timeout - 5 seconds max
    const timeout = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        socket.destroy();
        resolve({ 
          valid: false, 
          reason: 'Connection timeout - email verification failed' 
        });
      }
    }, 5000);

    socket.on('connect', () => {
      console.log(`Connected to MX server: ${mxServer}`);
    });

    socket.on('data', async (data) => {
      if (isResolved) return;
      
      const response = data.toString();

      if (step === 0 && response.startsWith('220')) {
        socket.write(`HELO ${domain}\r\n`);
        step = 1;
      } 
      else if (step === 1 && response.startsWith('250')) {
        socket.write('MAIL FROM:<verify@example.com>\r\n');
        step = 2;
      }
      else if (step === 2 && (response.startsWith('250') || response.startsWith('550'))) {
        socket.write(`RCPT TO:<${email}>\r\n`);
        step = 3;
      }
      else if (step === 3) {
        rcptToResponse = response.startsWith('250');
        socket.write('QUIT\r\n');
        
        clearTimeout(timeout);
        
        if (!isResolved) {
          isResolved = true;
          socket.end();
          
          if (rcptToResponse) {
            resolve({ valid: true, reason: 'Email exists and can receive messages' });
          } else {
            resolve({ 
              valid: false, 
              reason: 'Email address does not exist on this server' 
            });
          }
        }
      }
    });

    socket.on('error', (error) => {
      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeout);
        socket.destroy();
        resolve({ 
          valid: false, 
          reason: `Could not verify email: ${error.message}` 
        });
      }
    });

    socket.on('end', () => {
      clearTimeout(timeout);
    });
  });
}

/**
 * Fast pre-validation before SMTP check
 */
async function preValidateEmail(email) {
  // Check 1: Basic format validation
  if (!validateEmailFormat(email)) {
    return { valid: false, reason: 'Invalid email format', skipSMTP: true };
  }

  const domain = getEmailDomain(email);
  const localPart = email.split('@')[0];
  
  // Check 2: Disposable email check
  const disposableDomains = [
    'tempmail.com', 'temp-mail.org', 'guerrillamail.com', 'yopmail.com',
    'mailinator.com', '10minutemail.com', 'throwawaymail.com', 'trashmail.com',
    'sharklasers.com', 'spambox.us', 'tempinbox.com', 'maildrop.cc',
    'getnada.com', 'fakeinbox.com', 'emailondeck.com', 'tempr.email',
    'burnermail.io', 'spamgourmet.com', 'mailnator.com', 'tempemail.net'
  ];
  
  if (disposableDomains.includes(domain.toLowerCase())) {
    return { valid: false, reason: 'Disposable/temporary email addresses are not allowed', skipSMTP: true };
  }

  // Check 3: Obvious test/dummy patterns
  const testLocalParts = ['test', 'dummy', 'fake', 'example', 'sample', 'demo', 'asdf', 'qwerty', 'abcd'];
  const testDomainPatterns = ['example.com', 'test.com', 'domain.com', 'yourcompany.com', 'yourdomain.com'];
  
  if (testLocalParts.some(part => localPart.toLowerCase().includes(part))) {
    return { valid: false, reason: 'Test/dummy email addresses are not allowed', skipSMTP: true };
  }
  
  if (testDomainPatterns.includes(domain.toLowerCase())) {
    return { valid: false, reason: 'Test/dummy email addresses are not allowed', skipSMTP: true };
  }

  // Check 4: Local part validation
  if (localPart.length < 3) {
    return { valid: false, reason: 'Email address is too short', skipSMTP: true };
  }
  
  if (/^\d+$/.test(localPart)) {
    return { valid: false, reason: 'Numeric-only email addresses are not allowed', skipSMTP: true };
  }

  return { valid: true, skipSMTP: false };
}

/**
 * Comprehensive email validation with SMTP verification
 */
async function isEmailReal(email) {
  // Step 1: Fast pre-validation (no network calls)
  const preValidation = await preValidateEmail(email);
  if (preValidation.skipSMTP) {
    return preValidation;
  }

  // Step 2: SMTP verification (network call)
  return await verifyEmailExists(email);
}

const addusers = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const {useremail,name,email,password,referred_by,mobile,role,status,trade_category,company_name,join_date,address,dob,instagram_link,linkedin_link,whatsapp_link} = req.body;
    
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    
    if (!password) {
        return res.status(400).json({
            errors: "Password is required"
        });
    }
    
    const emailVerificationPromise = isEmailReal(email);
    
    const existingUser = await new Promise((resolve) => {
        userModel.getuseremail(email, (err, result) => {
            if (err) resolve({ error: err });
            else resolve({ data: result });
        });
    });

    if (existingUser.error) {
        return res.status(400).json({ errors: existingUser.error.message });
    }
    
    if (existingUser.data && existingUser.data.length > 0) {
        return res.status(400).json({
            errors: "Email address is already registered"
        });
    }

    const emailVerification = await emailVerificationPromise;
    
    if (!emailVerification.valid) {
        return res.status(400).json({
            errors: `Invalid email: ${emailVerification.reason}`
        });
    }
    
    const profile_image = req.files?.profile_image?.[0]?.filename || null;
    const company_logo = req.files?.company_logo?.[0]?.filename || null;

    if (!req.files) {
        return res.status(400).json({errors: "No files uploaded"});
    }

    if (!profile_image) {
        return res.status(400).json({errors: "Profile image is required"});
    }

    if (!company_logo) {
        return res.status(400).json({errors: "Company logo is required"});
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {name,email,password:hashedPassword,mobile,role,status};

    try {
        sendUserDetails(role,email,password);
    } catch (mailError) {
        return res.status(500).json({
            errors: "Failed to send registered user details to user email"
        });
    }
    
    // Use promise-based approach for database operations
    await new Promise((resolve, reject) => {
        userModel.addusers(userData, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    }).then(async (result) => {
        const user_id = result.insertId;
        const userData1 = {user_id,referred_by,status,trade_category,company_name,join_date,address,dob,instagram_link,linkedin_link,whatsapp_link,profile_image,company_logo};
        
        return new Promise((resolve, reject) => {
            userModel.addmembers(userData1, (err, result1) => {
                if (err) reject(err);
                else resolve({ user_id, userData1 });
            });
        });
    }).then(({ user_id, userData1 }) => {
        return new Promise((resolve, reject) => {
            userModel.getuserbyemail(useremail, (err, userresult) => {
                if (err) reject(err);
                else resolve({ user_id, userData1, userresult });
            });
        });
    }).then(({ user_id, userData1, userresult }) => {
        if (!userresult || userresult.length === 0) {
            throw new Error("Logged-in user not found");
        }
        
        const userid = userresult[0].id;
        const memberid = userresult[0].member_id;
        const role = userresult[0].role;
        const referrenceid = userresult[0].referred_by ?? 0;
        const logData = {userid,memberid,role,referrenceid,ip_address};
        
        return new Promise((resolve, reject) => {
            userModel.addlog(logData, (err, result) => {
                if (err) reject(err);
                else resolve({ userData, userData1 });
            });
        });
    }).then(({ userData, userData1 }) => {
        res.status(200).json({
            status: "success",
            message: "Added successfully",
            usersdata: userData,
            membersdata: userData1,
        });
    }).catch(err => {
        return res.status(400).json({ errors: err.message });
    });
}

const verifyEmail = async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({
            errors: "Email is required"
        });
    }
    
    res.status(202).json({
        status: "processing",
        message: "Email verification in progress",
        email: email
    });
    
    const result = await isEmailReal(email);
    
};

const getEmailVerificationStatus = async (req, res) => {
    const { email } = req.query;
    res.status(200).json({
        status: "pending",
        message: "Verification still in progress"
    });
};

const updateuser = async (req, res) => {
    const id = req.params.id;
    const { useremail, name, email, mobile, role, status, referred_by, trade_category, company_name, join_date, address, dob, instagram_link, linkedin_link, whatsapp_link } = req.body;
    
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }

    try {
        // Get current user data - wrap in Promise
        const user = await new Promise((resolve, reject) => {
            userModel.getuserbyid(id, (err, result) => {
                if (err) reject(err);
                else if (!result || result.length === 0) reject(new Error("Data not found"));
                else resolve(result[0]);
            });
        });

        const user_id = user.id;

        // Check if email is being changed
        if (email && email !== user.email) {
            // Check if email exists in database
            const existingUser = await new Promise((resolve, reject) => {
                userModel.getuseremail(email, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            if (existingUser && existingUser.length > 0) {
                return res.status(400).json({
                    errors: "Email address is already registered to another user"
                });
            }

            // Verify email is real (SMTP check)
            const emailVerification = await isEmailReal(email);
            if (!emailVerification.valid) {
                return res.status(400).json({
                    errors: `Invalid email: ${emailVerification.reason}`
                });
            }
            console.log(`✓ Email ${email} is valid and exists`);
        }

        // Handle image uploads
        const oldProfileImage = user.profile_image;
        const oldCompanyLogo = user.company_logo;

        const profile_image = req.files?.profile_image?.[0]?.filename;
        const company_logo = req.files?.company_logo?.[0]?.filename;

        const finalProfileImage = profile_image || oldProfileImage;
        const finalCompanyLogo = company_logo || oldCompanyLogo;

        // Delete old files if new ones uploaded
        if (oldProfileImage && profile_image) {
            const filePath = path.join("uploads", oldProfileImage);
            if (existsSync(filePath)) unlinkSync(filePath);
        }

        if (oldCompanyLogo && company_logo) {
            const filePath = path.join("uploads", oldCompanyLogo);
            if (existsSync(filePath)) unlinkSync(filePath);
        }

        // Prepare update data
        const userData = { name, email, mobile, role, status };
        const userData1 = {
            user_id,
            status,
            referred_by,
            trade_category,
            company_name,
            join_date,
            address,
            dob,
            instagram_link, linkedin_link, whatsapp_link,
            profile_image: finalProfileImage,
            company_logo: finalCompanyLogo
        };

        // Update member data
        await new Promise((resolve, reject) => {
            userModel.updatemembers(userData1, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // Update user data
        await new Promise((resolve, reject) => {
            userModel.updateuser(id, userData, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // Get updated user data
        const updatedUser = await new Promise((resolve, reject) => {
            userModel.getuserbyid(id, (err, result) => {
                if (err) reject(err);
                else resolve(result[0] || {});
            });
        });

        // Log the action
        const logUser = await new Promise((resolve, reject) => {
            userModel.getuserbyemail(useremail, (err, result) => {
                if (err) reject(err);
                else if (!result || result.length === 0) reject(new Error("Logged-in user not found"));
                else resolve(result[0]);
            });
        });

        const logData = {
            userid: logUser.id,
            memberid: logUser.member_id,
            role: logUser.role,
            referrenceid: logUser.referred_by ?? 0,
            ip_address: getSystemIP()
        };

        // Don't wait for log to complete
        userModel.insertupdatelog(logData, (err) => {
            if (err) console.error("Error logging update:", err);
        });

        res.status(200).json({
            success: true,
            status: "success",
            message: "Updated successfully",
            data: {
                user: updatedUser,
                files: {
                    profile_image: finalProfileImage,
                    company_logo: finalCompanyLogo
                }
            }
        });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            success: false,
            errors: error.message || "Internal server error during update"
        });
    }
};
const getusers = (req,res) =>{
    userModel.getusers((err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "Data fetched successfully",
                data: result
            })
        }
    })
}

const getuserbyid = (req,res) =>{
    const id = req.params.id;
    userModel.getuserbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "Data not found"});
        }
        res.status(200).json({
            status: "success",
            message: "Data fetched successfully",
            data: result
        })
    })
}

const deleteuser = (req, res) => {
    const id = req.params.id;
    const { useremail } = req.query;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    userModel.getuserbyid(id, (err, result) => {
        if (err) {
            return res.status(400).json({ errors: err.message });
        }
        if (!result || result.length === 0) {
            return res.status(400).json({ errors: "Data not found" });
        }

        const user_id = result[0].id;
        const profile_image = result[0].profile_image;
        const company_logo = result[0].company_logo;

        userModel.deletemember(user_id, (err) => {
            if (err) {
                return res.status(400).json({ errors: err.message });
            }

            userModel.deleteuser(id, (err) => {
                if (err) {
                    return res.status(400).json({ errors: err.message });
                }

                if (profile_image) {
                    const filePath = path.join("uploads", profile_image);
                    if (existsSync(filePath)) unlinkSync(filePath);
                }

                if (company_logo) {
                    const filePath = path.join("uploads", company_logo);
                    if (existsSync(filePath)) unlinkSync(filePath);
                }

                userModel.getuserbyemail(useremail, (err, userresult) => {
                    if (err) {
                        return res.status(400).json({ errors: err.message });
                    }
                    if (!userresult || userresult.length === 0) {
                        return res.status(400).json({
                            errors: "Logged-in user not found"
                        });
                    }

                    const userid = userresult[0].id;
                    const memberid = userresult[0].member_id;
                    const role = userresult[0].role;
                    const referrenceid = userresult[0].referred_by ?? 0; 

                    const logData = {userid,memberid,role,referrenceid,ip_address};

                    userModel.insertdeletelog(logData, (err) => {
                        if (err) {
                            return res.status(400).json({ errors: err.message });
                        }else{                        
                            return res.status(200).json({
                                status: "success",
                                message: "Deleted successfully"
                            });
                        }
                    });
                });
            });
        });
    });
};

const checklogin = async (req, res) => {
    const { email, role, password } = req.body;

    if (!email || !role || !password) {
        return res.status(400).json({
            errors: "Email, role and password are required"
        });
    }
    userModel.getuseremail(email, async (err, result) => {
        const ip_address = getSystemIP();

        if (err) return res.status(400).json({ errors: err.message });

        if (!result || result.length === 0) {
            return res.status(400).json({ errors: "Invalid login" });
        }

        const user = result[0];

        if (user.role !== role) {
            return res.status(400).json({ errors: "Invalid login" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const logData = {
                userid: user.id, 
                memberid: user.member_id ?? null,
                role: user.role,
                referrenceid: user.referred_by ?? 0,
                ip_address
            };

            userModel.insertloginfailedlog(logData, () => {});
            return res.status(400).json({ errors: "Invalid login" });
        }
        const payload = {
            email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600
        };

        const token = jwt.sign(payload, jwt_secret, { algorithm: "HS256" });
        const logData = {
            userid: user.id,
            memberid: user.member_id ?? null,
            role: user.role,
            referrenceid: user.referred_by ?? 0,
            ip_address
        };

        userModel.insertloginlog(logData, () => {});

        return res.status(200).json({
            status: "success",
            message: "Login successfully",
            token,
            email: user.email
        });
    });
};

const getuserbyemail = (req,res) =>{
    const useremail = req.params.email;
    userModel.getuserbyemail(useremail,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "Data not found"});
        }
        res.status(200).json({
            status: "success",
            message: "Data fetched successfully",
            data: result
        })
    })
}

const getapplog = (req,res) => {
    userModel.getapplog((err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "Data fetched successfully",
                data: result
            })
        }
    })
}
const totalusers = (req,res) =>{
    userModel.totalusers((err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "Data fetched successfully",
                data: result[0].totalusers
            })
        }
    })
}

const deleteLogsByDate = (req, res) => {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return res.status(400).json({
            errors: "Start date and End date required"
        });
    }

    userModel.deleteLogsByDate(startDate, endDate, (err, result) => {
        if (err) {
            return res.status(400).json({ errors: err.message });
        }

        res.status(200).json({
            status: "success",
            message: `${result.affectedRows} records deleted`
        });
    });
};

export {addusers,getusers,getuserbyid,updateuser,deleteuser,checklogin,getuserbyemail,getapplog, verifyEmail, getEmailVerificationStatus,totalusers,deleteLogsByDate};









// import userModel from "../models/users.model.js";
// import { validationResult } from "express-validator";
// import bcrypt from "bcrypt";
// import path from 'path';
// import { existsSync, unlinkSync } from "fs";
// import jwt from 'jsonwebtoken';
// import {sendUserDetails} from '../utils/email.js';
// import os from "os";

// const jwt_secret = "lbnwebsite";

// function getSystemIP() {
//   const nets = os.networkInterfaces();

//   for (const name of Object.keys(nets)) {
//     const lname = name.toLowerCase();
//     if (!lname.includes("wi-fi") && !lname.includes("ethernet")) continue;

//     for (const net of nets[name]) {
//       if (net.family === "IPv4" && !net.internal) {
//         return net.address;
//       }
//     }
//   }

//   return "127.0.0.1";
// }

// const ip_address = getSystemIP();

// const addusers = async (req,res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()});
//     }
//     const {useremail,name,email,password,referred_by,mobile,role,status,trade_category,company_name,join_date,address,dob,instagram_link,linkedin_link,whatsapp_link} = req.body;
//     if (!useremail) {
//         return res.status(400).json({
//             errors: "Logged-in user email (useremail) is required"
//         });
//     }
//     if (!password) {
//         return res.status(400).json({
//             errors: "Password is required"
//         });
//     }
//     const profile_image = req.files?.profile_image?.[0]?.filename;
//     const company_logo = req.files?.company_logo?.[0]?.filename;

//     if(!profile_image || !company_logo){
//         return res.status(400).json({errors: "Profile image and company logos are required"});
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const userData = {name,email,password:hashedPassword,mobile,role,status};

//     try {
//         sendUserDetails(role,email,password);
//     } catch (mailError) {
//         return res.status(500).json({
//             errors: "Failed to send registered user details to user email"
//         });
//     }
//     userModel.addusers(userData,(err,result)=>{
//         if(err){
//             return res.status(400).json({errors: err.message});
//         }
//         const user_id = result.insertId;
//         const userData1 = {user_id,referred_by,status,trade_category,company_name,join_date,address,dob,instagram_link,linkedin_link,whatsapp_link,profile_image,company_logo};
//         userModel.addmembers(userData1,(err,result1)=>{
//             if(err){
//                 return res.status(400).json({errors: err.message});
//             }
//             userModel.getuserbyemail(useremail,(err,userresult)=>{
//                 if(err){
//                     return res.status(400).json({errors: err.message});
//                 }
//                 if (!userresult || userresult.length === 0) {
//                     return res.status(400).json({
//                         errors: "Logged-in user not found"
//                     });
//                 }
//                 const userid = userresult[0].id;
//                 const memberid = userresult[0].member_id;
//                 const role = userresult[0].role;
//                 const referrenceid = userresult[0].referred_by ?? 0;
//                 const logData = {userid,memberid,role,referrenceid,ip_address}
//                 userModel.addlog(logData,(err,result)=>{
//                     if(err){
//                         return res.status(400).json({errors: err.message});
//                     }else{
//                         res.status(200).json({
//                             status: "success",
//                             message: "Added successfully",
//                             usersdata: userData,
//                             membersdata: userData1,
//                         })
//                     }  
//                 })
//             })                      
//         })
//     })
// }

// const getusers = (req,res) =>{
//     userModel.getusers((err,result)=>{
//         if(err){
//             return res.status(400).json({errors: err.message});
//         }else{
//             res.status(200).json({
//                 status: "success",
//                 message: "Data fetched successfully",
//                 data: result
//             })
//         }
//     })
// }

// const getuserbyid = (req,res) =>{
//     const id = req.params.id;
//     userModel.getuserbyid(id,(err,result)=>{
//         if(err){
//             return res.status(400).json({errors: err.message});
//         }
//         if(!result || result.length === 0){
//             return res.status(400).json({errors: "Data not found"});
//         }
//         res.status(200).json({
//             status: "success",
//             message: "Data fetched successfully",
//             data: result
//         })
//     })
// }

// const updateuser = async (req, res) => {
//     const id = req.params.id;
//     const { useremail, name, email, mobile, role, status, referred_by, trade_category, company_name, join_date, address, dob, instagram_link,linkedin_link,whatsapp_link } = req.body;
    
//     if (!useremail) {
//         return res.status(400).json({
//             errors: "Logged-in user email (useremail) is required"
//         });
//     }

//     try {
//         // Get current user data
//         userModel.getuserbyid(id, async (err, result) => {
//             if (err) {
//                 console.error("Error fetching user:", err);
//                 return res.status(400).json({ errors: err.message });
//             }
//             if (!result || result.length === 0) {
//                 return res.status(400).json({ errors: "Data not found" });
//             }

//             const user = result[0];
//             const user_id = user.id;

//             // Store old image paths
//             const oldProfileImage = user.profile_image;
//             const oldCompanyLogo = user.company_logo;

//             // Get new files if uploaded
//             const profile_image = req.files?.profile_image?.[0]?.filename;
//             const company_logo = req.files?.company_logo?.[0]?.filename;

//             // Determine final image paths
//             const finalProfileImage = profile_image || oldProfileImage;
//             const finalCompanyLogo = company_logo || oldCompanyLogo;

//             // Delete old files if new ones are uploaded
//             if (oldProfileImage && profile_image) {
//                 const filePath = path.join("uploads", oldProfileImage);
//                 if (existsSync(filePath)) {
//                     unlinkSync(filePath);
//                     console.log("Deleted old profile image:", filePath);
//                 }
//             }

//             if (oldCompanyLogo && company_logo) {
//                 const filePath = path.join("uploads", oldCompanyLogo);
//                 if (existsSync(filePath)) {
//                     unlinkSync(filePath);
//                     console.log("Deleted old company logo:", filePath);
//                 }
//             }

//             // Prepare update data
//             const userData = { name, email, mobile, role, status };
//             const userData1 = {
//                 user_id,
//                 status,
//                 referred_by,
//                 trade_category,
//                 company_name,
//                 join_date,
//                 address,
//                 dob,
//                 instagram_link,linkedin_link,whatsapp_link,
//                 profile_image: finalProfileImage,
//                 company_logo: finalCompanyLogo
//             };

//             // Update member data first
//             userModel.updatemembers(userData1, (err, result1) => {
//                 if (err) {
//                     console.error("Error updating members:", err);
//                     return res.status(400).json({ errors: err.message });
//                 }

//                 // Update user data
//                 userModel.updateuser(id, userData, (err, result) => {
//                     if (err) {
//                         console.error("Error updating user:", err);
//                         return res.status(400).json({ errors: err.message });
//                     }

//                     // Get updated user data to return
//                     userModel.getuserbyid(id, (err, updatedResult) => {
//                         if (err) {
//                             console.error("Error fetching updated user:", err);
//                             return res.status(400).json({ errors: err.message });
//                         }

//                         // Log the action
//                         userModel.getuserbyemail(useremail, (err, userresult) => {
//                             if (err) {
//                                 console.error("Error fetching logged-in user:", err);
//                                 return res.status(400).json({ errors: err.message });
//                             }
                            
//                             if (!userresult || userresult.length === 0) {
//                                 return res.status(400).json({
//                                     errors: "Logged-in user not found"
//                                 });
//                             }

//                             const logUser = userresult[0];
//                             const logData = {
//                                 userid: logUser.id,
//                                 memberid: logUser.member_id,
//                                 role: logUser.role,
//                                 referrenceid: logUser.referred_by ?? 0,
//                                 ip_address
//                             };

//                             userModel.insertupdatelog(logData, (err, result) => {
//                                 if (err) {
//                                     console.error("Error logging update:", err);
//                                 }

//                                 // Return success with updated data
//                                 res.status(200).json({
//                                     success: true,
//                                     status: "success",
//                                     message: "Updated successfully",
//                                     data: {
//                                         user: updatedResult[0] || {},
//                                         files: {
//                                             profile_image: finalProfileImage,
//                                             company_logo: finalCompanyLogo
//                                         }
//                                     }
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     } catch (error) {
//         console.error("Update error:", error);
//         res.status(500).json({
//             success: false,
//             errors: "Internal server error during update"
//         });
//     }
// };

// const deleteuser = (req, res) => {
//     const id = req.params.id;
//     const { useremail } = req.query;
//     if (!useremail) {
//         return res.status(400).json({
//             errors: "Logged-in user email (useremail) is required"
//         });
//     }
//     userModel.getuserbyid(id, (err, result) => {
//         if (err) {
//             return res.status(400).json({ errors: err.message });
//         }
//         if (!result || result.length === 0) {
//             return res.status(400).json({ errors: "Data not found" });
//         }

//         const user_id = result[0].id;
//         const profile_image = result[0].profile_image;
//         const company_logo = result[0].company_logo;

//         userModel.deletemember(user_id, (err) => {
//             if (err) {
//                 return res.status(400).json({ errors: err.message });
//             }

//             userModel.deleteuser(id, (err) => {
//                 if (err) {
//                     return res.status(400).json({ errors: err.message });
//                 }

//                 if (profile_image) {
//                     const filePath = path.join("uploads", profile_image);
//                     if (existsSync(filePath)) unlinkSync(filePath);
//                 }

//                 if (company_logo) {
//                     const filePath = path.join("uploads", company_logo);
//                     if (existsSync(filePath)) unlinkSync(filePath);
//                 }

//                 userModel.getuserbyemail(useremail, (err, userresult) => {
//                     if (err) {
//                         return res.status(400).json({ errors: err.message });
//                     }
//                     if (!userresult || userresult.length === 0) {
//                         return res.status(400).json({
//                             errors: "Logged-in user not found"
//                         });
//                     }

//                     const userid = userresult[0].id;
//                     const memberid = userresult[0].member_id;
//                     const role = userresult[0].role;
//                     const referrenceid = userresult[0].referred_by ?? 0; 

//                     const logData = {userid,memberid,role,referrenceid,ip_address};

//                     userModel.insertdeletelog(logData, (err) => {
//                         if (err) {
//                             return res.status(400).json({ errors: err.message });
//                         }else{                        
//                             return res.status(200).json({
//                                 status: "success",
//                                 message: "Deleted successfully"
//                             });
//                         }
//                     });
//                 });
//             });
//         });
//     });
// };

// const checklogin = async (req, res) => {
//     const { email, role, password } = req.body;

//     if (!email || !role || !password) {
//         return res.status(400).json({
//             errors: "Email, role and password are required"
//         });
//     }
//     userModel.getuseremail(email, async (err, result) => {
//         const ip_address = getSystemIP();

//         if (err) return res.status(400).json({ errors: err.message });

//         if (!result || result.length === 0) {
//             return res.status(400).json({ errors: "Invalid login" });
//         }

//         const user = result[0];

//         if (user.role !== role) {
//             return res.status(400).json({ errors: "Invalid login" });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             const logData = {
//                 userid: user.id, 
//                 memberid: user.member_id ?? null,
//                 role: user.role,
//                 referrenceid: user.referred_by ?? 0,
//                 ip_address
//             };

//             userModel.insertloginfailedlog(logData, () => {});
//             return res.status(400).json({ errors: "Invalid login" });
//         }
//         const payload = {
//             email,
//             iat: Math.floor(Date.now() / 1000),
//             exp: Math.floor(Date.now() / 1000) + 3600
//         };

//         const token = jwt.sign(payload, jwt_secret, { algorithm: "HS256" });
//         const logData = {
//             userid: user.id,
//             memberid: user.member_id ?? null,
//             role: user.role,
//             referrenceid: user.referred_by ?? 0,
//             ip_address
//         };

//         userModel.insertloginlog(logData, () => {});

//         return res.status(200).json({
//             status: "success",
//             message: "Login successfully",
//             token,
//             email: user.email
//         });
//     });
// };

// const getuserbyemail = (req,res) =>{
//     const useremail = req.params.email;
//     userModel.getuserbyemail(useremail,(err,result)=>{
//         if(err){
//             return res.status(400).json({errors: err.message});
//         }
//         if(!result || result.length === 0){
//             return res.status(400).json({errors: "Data not found"});
//         }
//         res.status(200).json({
//             status: "success",
//             message: "Data fetched successfully",
//             data: result
//         })
//     })
// }

// const getapplog = (req,res) => {
//     userModel.getapplog((err,result)=>{
//         if(err){
//             return res.status(400).json({errors: err.message});
//         }else{
//             res.status(200).json({
//                 status: "success",
//                 message: "Data fetched successfully",
//                 data: result
//             })
//         }
//     })
// }

// export {addusers,getusers,getuserbyid,updateuser,deleteuser,checklogin,getuserbyemail,getapplog}