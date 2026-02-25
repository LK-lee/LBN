import userModel from "../models/coreleaders.model.js";
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

const addleaders = (req,res) => {

    const {useremail,leaders} = req.body;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }

    if (!Array.isArray(leaders)) {
        return res.status(400).json({
            error: "leaders must be an array"
        });
    }

    for (const l of leaders) {
        if (!l.member_id || !l.designation || l.status === undefined) {
            return res.status(400).json({
                error: "Invalid leader data"
            });
        }
    }

    userModel.addleaders(leaders,(err,result)=>{
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
            userModel.addlog(logData,(err,result)=>{
                if(err){
                    return res.status(400).json({errors: err.message});
                }else{
                    res.status(200).json({
                        status:"success",
                        message:"Multiple leaders inserted successfully",
                        insertedRows: result.affectedRows
                    })
                }
            })    
        })    
    });
}


const getcoreleaders = (req,res) =>{
    userModel.getcoreleaders((err,result)=>{
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

const getleaderbyid = (req,res) =>{
    const id = req.params.id;
    userModel.getleaderbyid(id,(err,result)=>{
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

const updateleaders = async (req,res) => {

    const {useremail,leaders} = req.body;

    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }

    if(!Array.isArray(leaders)){
        return res.status(400).json({
            error:"Request body must be array"
        });
    }

    try {
        const promises = leaders.map(item => {
            return new Promise((resolve,reject)=>{

                const {id,member_id,designation,status} = item;
                userModel.updateleader(id,{member_id,designation,status},(err,result)=>{
                    if(err){
                        return reject(err);
                    }
                    if (result.affectedRows === 0) {
                        return reject(new Error(`No row updated for id ${id}`));
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
                            }
                            resolve(result);
                        })
                    })
                });
            });
        });

        await Promise.all(promises);

        res.status(200).json({
            status:"success",
            message:"all update successful"
        });

    } catch (error) {

        res.status(400).json({
            error:error.message
        });

    }

}

const deleteleader = (req,res) => {
    const id = req.params.id;
    const {useremail} = req.query;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }

    userModel.getleaderbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "Data not found"});
        }
        userModel.deleteleader(id,(err,result)=>{
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

const getmemberstoaddcoreleaders = (req,res) =>{
    userModel.getmemberstoaddcoreleaders((err,result)=>{
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

const getdesignationstoaddcoreleaders = (req,res) =>{
    userModel.getdesignationstoaddcoreleaders((err,result)=>{
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

export {addleaders,getcoreleaders,getleaderbyid,updateleaders,deleteleader,getmemberstoaddcoreleaders,getdesignationstoaddcoreleaders}