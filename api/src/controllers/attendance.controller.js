import userModel from "../models/attendance.model.js";
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

const addattendance = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { useremail, attendance_data } = req.body;
        
        if (!useremail) {
            return res.status(400).json({
                errors: "Logged-in user email (useremail) is required"
            });
        }

        // Validate attendance_data structure
        if (!Array.isArray(attendance_data) || attendance_data.length < 2) {
            return res.status(400).json({
                errors: "attendance_data must be an array with at least 2 items: first item for meeting_id, followed by member attendance"
            });
        }

        // First item should contain meeting_id
        const meetingItem = attendance_data[0];
        if (!meetingItem.meeting_id) {
            return res.status(400).json({
                errors: "First item in attendance_data must contain meeting_id"
            });
        }

        const meeting_id = meetingItem.meeting_id;

        const checkmeetingid = {meeting_id};
        userModel.checkmeetingidinattendance(checkmeetingid,(err,result1)=>{
            if(err){
                return res.status(400).json({errors: err.message});
            }
            if(result1.length > 0){
                return res.status(400).json({
                    status: "error",
                    message: "Already attendance added to this meeting",
                    errors: "Attendance already exists for this meeting"
                });
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

                let completedCount = 0;
                let totalMembers = attendance_data.length - 1; // Exclude first item (meeting_id)
                let successfulAdditions = [];
                let failedAdditions = [];
                
                // Process each member attendance starting from index 1
                for (let i = 1; i < attendance_data.length; i++) {
                    const memberData = attendance_data[i];
                    
                    if (!memberData.member_id || !memberData.status) {
                        failedAdditions.push({
                            index: i,
                            data: memberData,
                            error: "Missing member_id or status"
                        });
                        completedCount++;
                        
                        if (completedCount === totalMembers) {
                            sendFinalResponse();
                        }
                        continue;
                    }

                    const userData = { 
                        member_id: memberData.member_id, 
                        meeting_id, 
                        status: memberData.status 
                    };
                    
                    userModel.addattendance(userData, (err, result) => {
                        if (err) {
                            failedAdditions.push({
                                member_id: memberData.member_id,
                                error: err.message
                            });
                        } else {
                            successfulAdditions.push({
                                member_id: memberData.member_id,
                                status: memberData.status,
                                attendance_id: result.insertId
                            });
                        }
                        
                        completedCount++;
                        
                        // When all members have been processed
                        if (completedCount === totalMembers) {
                            sendFinalResponse();
                        }
                    });
                }

                function sendFinalResponse() {
                    // Add log entry
                    const logData = { userid, memberid, role, referrenceid, ip_address };
                    userModel.addlog(logData, (err, logResult) => {
                        if (err) {
                            console.error("Failed to add log:", err.message);
                        }
                        
                        // Prepare response
                        const response = {
                            status: "success",
                            message: `Attendance processed for meeting ${meeting_id}`,
                            data: {
                                meeting_id,
                                total_members: totalMembers,
                                successful: successfulAdditions.length,
                                failed: failedAdditions.length,
                                successful_additions: successfulAdditions,
                                failed_additions: failedAdditions.length > 0 ? failedAdditions : undefined
                            }
                        };
                        
                        res.status(200).json(response);
                    });
                }
            });
        })

    } catch (error) {
        return res.status(500).json({ errors: error.message });
    }
};

const getattendances = (req,res) => {
    userModel.getattendances((err,result)=>{
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

const getattendancebyid = (req,res) => {
    const id = req.params.id;
    userModel.getattendancebyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "attendance fetched by id sucessfully",
                data: result[0]
            })
        }
    })
};

const updateattendance = (req,res) => {
    const { useremail,member_id,meeting_id,status } = req.body;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    const id= req.params.id;
    const userData = {member_id,meeting_id,status};

    userModel.updateattendance(id,userData,(err,result)=>{
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

const deleteattendance = (req, res) => {
    const id= req.params.id;
    const {useremail} = req.query;
    if (!useremail) {
        return res.status(400).json({
            errors: "Logged-in user email (useremail) is required"
        });
    }
    userModel.getattendancebyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "attendance not found"});
        }
        userModel.deleteattendance(id,(err,result1)=>{
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

export {addattendance, getattendances, getattendancebyid, updateattendance, deleteattendance};