import userModel from "../models/contact.model.js";
import { validationResult } from "express-validator";

const addcontacts = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name,last_name,email,mobile,trade,message } = req.body;

            const userData = { first_name,last_name,email,mobile,trade,message };

            userModel.addcontacts(userData, (err, result) => {
                if (err) {
                    return res.status(400).json({ errors: err.message });
                }else{
                    res.status(200).json({
                        status: "success",
                        message: "Registered successfully",
                        data: userData
                    });
                }                        
            });
    } catch (error) {
        return res.status(500).json({ errors: error.message });
    }
};

const getcontacts = (req,res) => {
    userModel.getcontacts((err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "contacts data fetched sucessfully",
                data: result
            })
        }
    })
};

const getcontactbyid = (req,res) => {
    const id = req.params.id;
    userModel.getcontactbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "contact fetched by id sucessfully",
                data: result[0]
            })
        }
    })
};

const updatecontact = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { first_name,last_name,email,mobile,trade,message } = req.body;

    const id= req.params.id;
    const userData = {first_name,last_name,email,mobile,trade,message};

    userModel.updatecontact(id,userData,(err,result)=>{
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
}

const deletecontact = (req, res) => {
    const id= req.params.id;
    userModel.getcontactbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "contact not found"});
        }
        userModel.deletecontact(id,(err,result1)=>{
            if(err){
                return res.status(400).json({errors: err.message});
            }else{
                res.status(200).json({
                    status: "success",
                    message: "Deleted sucessfully"
                })
            }
        })
    })
};

const countofcontacts = (req,res) => {
    userModel.countofcontacts((err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "contacts count fetched successfully",
                data: result[0].contactscount
            })
        }
    })
}

export {addcontacts, getcontacts, getcontactbyid, updatecontact, deletecontact, countofcontacts};