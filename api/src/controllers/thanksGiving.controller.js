import userModel from "../models/thanksGiving.model.js";
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

const addThanknote = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { useremail,meeting_id,given_by,given_to,amount,notes } = req.body;
        if (!useremail) {
            return res.status(400).json({
                errors: "Logged-in user email (useremail) is required"
            });
        }
            const userData = {meeting_id, given_by,given_to,amount,notes };

            userModel.addThanknote(userData, (err, result) => {
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

const getThanksnote = (req,res) =>{
    userModel.getThanksnote((err,result)=>{
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

const getThanksnoteamount = (req,res) =>{
    userModel.getThanksnoteamount((err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "Data fetched successfully",
                data: result[0].totalamount
            })
        }
    })
}

const getThanksnotebyid = (req,res) =>{
    const id = req.params.id;
    userModel.getThanksnotebyid(id,(err,result)=>{
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

const updateThanksnote = (req,res) =>{
    const id= req.params.id;
    const {useremail,meeting_id,given_by,given_to,amount,notes} = req.body;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    userModel.getThanksnotebyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "Data not found"});
        }
        const userData = {meeting_id,given_by,given_to,amount,notes};
        userModel.updateThanksnote(id,userData,(err,result1)=>{
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

const deleteThanksnote = (req,res) => {
    const id = req.params.id;
    const { useremail } = req.query;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    userModel.getThanksnotebyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "Data not found"});
        }
        userModel.deleteThanksnote(id,(err,result)=>{
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

const getUserTransactions = (req,res)=>{
    const {useremail} = req.query;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    userModel.getUserTransactions(useremail,(err,result)=>{
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

const getAllTransactions = (req,res)=>{
    userModel.getAllTransactions((err,result)=>{
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

export {addThanknote,getThanksnote,getThanksnotebyid,updateThanksnote,deleteThanksnote,getThanksnoteamount,getUserTransactions,getAllTransactions};