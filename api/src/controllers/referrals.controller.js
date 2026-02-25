import userModel from "../models/referrals.model.js"
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

const addReferral = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {useremail,meeting_id,referred_by,name,mobile,status } = req.body;
            if (!useremail) {
                return res.status(400).json({
                    errors: "Logged-in user email (useremail) is required"
                });
            }
            const userData = {meeting_id,referred_by,name,mobile,status };

            userModel.addReferral(userData, (err, result) => {
                if (err) {
                    return res.status(400).json({ errors: err.message });
                }
                userModel.getuserbyemail(useremail,(err,userresult)=>{
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
                                message: "Registered successfully",
                                data: userData
                            });
                        }
                    })                        
                })                        
            });
    } catch (error) {
        return res.status(500).json({ errors: error.message });
    }
};


const getReferral = (req,res) =>{
    userModel.getReferral((err,result)=>{
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

const getReferralbyid = (req,res) =>{
    const id = req.params.id;
    userModel.getReferralbyid(id,(err,result)=>{
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

const updateReferral = (req,res) =>{
    const id= req.params.id;
    const {useremail,meeting_id,referred_by,name,mobile,status} = req.body;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    userModel.getReferralbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "Data not found"});
        }
        const userData = {meeting_id,referred_by,name,mobile,status};
        userModel.updateReferral(id,userData,(err,result1)=>{
            if(err){
                return res.status(400).json({errors: err.message});
            }
            userModel.getuserbyemail(useremail,(err,userresult)=>{
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
                userModel.insertupdatelog(logData,(err,result)=>{
                    if(err){
                        return res.status(400).json({errors: err.message});
                    }else{
                        res.status(200).json({
                            status : "success",
                            message : "Updated successfully",
                            data: userData
                        })
                    }
                })
            })
        })
    })
}

const deleteReferral = (req,res) => {
    const id = req.params.id;
    const { useremail } = req.query;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    userModel.getReferralbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "Data not found"});
        }
        userModel.deleteReferral(id,(err,result)=>{
            if(err){
                return res.status(400).json({errors: err.message});
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
                        res.status(200).json({
                            status: "success",
                            message: "Deleted successfully"
                        })
                    }
                })
            })
        })
    }) 
}


export {addReferral,getReferral,getReferralbyid,updateReferral,deleteReferral};