import bcrypt from "bcrypt";
import userModel from "../models/changepassword.model.js";
import { validationResult } from "express-validator";
import os from "os";

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

const changepassword = (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({errors: errors.array()})
    }
    const {email, oldpassword, newpassword, confirmpassword} = req.body;  
    const userData = {email};  
    userModel.checkchangepass(userData, async (err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message})
        }

        if(!result || result.length == 0){
            return res.status(400).json({errors: "User not found"});
        }
        const user = result[0];
        const isMatch = await bcrypt.compare(oldpassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: "Invalid user" });
        }

        if(newpassword != confirmpassword){
            return res.status(400).json({ errors: "New password and Confirm password must be same" });
        }

        const saltRounds = 10;
        
        const hashedPassword = await bcrypt.hash(confirmpassword, saltRounds);

        const userData1= {email, password: hashedPassword};
        userModel.changepassword(userData1,(err,result)=>{
            if(err){
                return res.status(400).json({errors: err.message})
            }
            userModel.getuserbyemail(email,(err,userresult)=>{
                if(err){
                    return res.status(400).json({errors: err.message});
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
                const logData = {userid,memberid,role,referrenceid,ip_address}
                userModel.addlog(logData,(err,result)=>{
                    if(err){
                        return res.status(400).json({errors: err.message});
                    }else{
                        res.status(200).json({
                            status: "success",  
                            message: "Password Changed successfully"
                        })
                    }
                })
            })    
        })        
    })
} 

export {changepassword};