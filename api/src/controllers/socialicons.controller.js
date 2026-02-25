import userModel from "../models/socialicons.model.js";
import { validationResult } from "express-validator";

const addsocialicon = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { icon_name, link } = req.body;

            const userData = { icon_name, link };

            userModel.addsocialicon(userData, (err, result) => {
                if (err) {
                    return res.status(400).json({ errors: err.message });
                }else{
                    res.status(200).json({
                        status: "success",
                        message: "Added successfully",
                        data: userData
                    });
                }                        
            });
    } catch (error) {
        return res.status(500).json({ errors: error.message });
    }
};

const getsocialicons = (req,res) => {
    userModel.getsocialicons((err,result)=>{
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

const getsocialiconbyid = (req,res) => {
    const id = req.params.id;
    userModel.getsocialiconbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "socialicon fetched by id sucessfully",
                data: result[0]
            })
        }
    })
};

const updatesocialicon = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { icon_name, link, status } = req.body;

    if(!status){
        return res.status(400).json({errors: "Status is required"});
    }

    const id= req.params.id;
    const userData = {icon_name, link, status};

    userModel.updatesocialicon(id,userData,(err,result)=>{
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

const deletesocialicon = (req, res) => {
    const id= req.params.id;
    userModel.getsocialiconbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "socialicon not found"});
        }
        userModel.deletesocialicon(id,(err,result1)=>{
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

export {addsocialicon, getsocialicons, getsocialiconbyid, updatesocialicon, deletesocialicon};