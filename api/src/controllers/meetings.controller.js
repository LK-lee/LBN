import userModel from "../models/meetings.model.js";
import { validationResult } from "express-validator";
import os from "os";

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

const addmeetings = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { useremail,meeting_title,meeting_date,meeting_type,meeting_time,meeting_mode,meeting_status,meeting_place,status } = req.body;
        if (!useremail) {
            return res.status(400).json({
                errors: "Logged-in user email (useremail) is required"
            });
        }    
            const userData = { meeting_title,meeting_date,meeting_type,meeting_time,meeting_mode,meeting_status,meeting_place,status };

            userModel.addmeetings(userData, (err, result) => {
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

const getmeetings = (req,res) => {
    userModel.getmeetings((err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "meetings data fetched sucessfully",
                data: result
            })
        }
    })
};

const getmeetingbyid = (req,res) => {
    const id = req.params.id;
    userModel.getmeetingbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "meeting fetched by id sucessfully",
                data: result[0]
            })
        }
    })
};

const updatemeeting = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { useremail,meeting_title,meeting_date,meeting_type,meeting_time,meeting_mode,meeting_status,meeting_place,status } = req.body;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    const id= req.params.id;
    const userData = {meeting_title,meeting_date,meeting_type,meeting_time,meeting_mode,meeting_status,meeting_place,status};

    userModel.updatemeeting(id,userData,(err,result)=>{
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
                        status: "success",
                        message: "Updated sucessfully",
                        data: userData
                    })
                }
            })    
        })    
    })
}

const deletemeeting = (req, res) => {
    const id= req.params.id;
    const {useremail} = req.query;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    userModel.getmeetingbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "meeting not found"});
        }
        userModel.deletemeeting(id,(err,result1)=>{
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
                            message: "Deleted sucessfully"
                        })
                    }
                })
            })        
        })
    })
};

const countofmeetings = (req,res) => {
    userModel.countofmeetings((err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "meetings count fetched successfully",
                data: result[0].meetingscount
            })
        }
    })
}

const getmembersattendance = (req,res) => {
    const id = req.params.id;
    userModel.getmembersattendance(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "meetings count fetched successfully",
                data: result
            })
        }
    })
}

const getmeetingid = (req,res) => {
    userModel.getmeetingid((err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "meetings count fetched successfully",
                data: result[0]
            })
        }
    })
}

export {addmeetings, getmeetings, getmeetingbyid, updatemeeting, deletemeeting, countofmeetings, getmembersattendance,getmeetingid};