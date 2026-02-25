import userModel from "../models/category.model.js";
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

const addcategory = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { useremail,name } = req.body;

        if (!useremail) {
            return res.status(400).json({
                errors: "Logged-in user email (useremail) is required"
            });
        }

            const userData = { name };

            userModel.addcategory(userData, (err, result) => {
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
                                message: "Added successfully",
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

const getcategory = (req,res) => {
    userModel.getcategory((err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "Data fetched sucessfully",
                data: result
            })
        }
    })
};

const getallcategories = (req,res) => {
    userModel.getallcategories((err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "Data fetched sucessfully",
                data: result
            })
        }
    })
};

const getcategorybyid = (req,res) => {
    const id = req.params.id;
    userModel.getcategorybyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "category fetched by id sucessfully",
                data: result[0]
            })
        }
    })
};

const updatecategory = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { useremail,name } = req.body;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }

    const id= req.params.id;
    const userData = {name};

    userModel.updatecategory(id,userData,(err,result)=>{
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

const deletecategory = (req, res) => {
    const id= req.params.id;
    const {useremail} = req.query;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    userModel.getcategorybyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "category not found"});
        }
        userModel.deletecategory(id,(err,result1)=>{
            if(err){
                return res.status(400).json({errors: err.message});
            }
            userModel.deletecategory(id,(err,result1)=>{
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
    })
};

export {addcategory, getcategory, getcategorybyid, updatecategory, deletecategory, getallcategories};