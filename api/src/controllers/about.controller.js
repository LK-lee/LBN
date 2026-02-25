import { existsSync, unlinkSync } from "fs";
import userModel from "../models/about.model.js";
import { validationResult } from "express-validator";
import path from 'path';

const addabout = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {title,para1,para2,para3,para4} = req.body;
    const image = req.file ? req.file.filename : null;
    if(!image){
        return res.status(400).json({errors: [{msg: "image is required", path: "image"}]});
    }
    const userData = {image,title,para1,para2,para3,para4};
    userModel.addabout(userData,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "About added successfully",
                data: userData
            })
        }
    })
}

const getabout = (req,res) =>{
    userModel.getabout((err,result)=>{
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

const getaboutbyid = (req,res) =>{
    const id = req.params.id;
    userModel.getaboutbyid(id,(err,result)=>{
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

const updateabout = (req,res) =>{
    const id= req.params.id;
    const {title,para1,para2,para3,para4} = req.body;
    userModel.getaboutbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "Data not found"});
        }
        const oldimage = result[0].image;
        const image = req.file ? req.file.filename : oldimage;
        if(req.file && oldimage){
            const filePath = path.join("uploads",oldimage);
            if(existsSync(filePath)){
                unlinkSync(filePath);
            }
        }
        const userData = {image,title,para1,para2,para3,para4};
        userModel.updateabout(id,userData,(err,result1)=>{
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
}

const deleteabout = (req,res) => {
    const id = req.params.id;

    userModel.getaboutbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "Data not found"});
        }
        const oldimage = result[0].image;
        if(oldimage){
            const filePath = path.join("uploads",oldimage);
            if(existsSync(filePath)){
                unlinkSync(filePath);
            }
        }
        userModel.deleteabout(id,(err,result)=>{
            if(err){
                return res.status(400).json({errors: err.message});
            }else{
                res.status(200).json({
                    status: "success",
                    message: "Deleted successfully"
                })
            }
        })
    }) 
}

export {addabout,getabout,getaboutbyid,updateabout,deleteabout}