import userModel from "../models/footer.model.js";
import { validationResult } from "express-validator";

const addfooter = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { address, email, number, map } = req.body;

            const userData = { address, email, number, map };

            userModel.addfooter(userData, (err, result) => {
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

const getfooters = (req,res) => {
    userModel.getfooters((err,result)=>{
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

const getfooterbyid = (req,res) => {
    const id = req.params.id;
    userModel.getfooterbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }else{
            res.status(200).json({
                status: "success",
                message: "footer fetched by id sucessfully",
                data: result[0]
            })
        }
    })
};

const updatefooter = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address, email, number, map } = req.body;

    const id= req.params.id;
    const userData = {address, email, number, map};

    userModel.updatefooter(id,userData,(err,result)=>{
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

const deletefooter = (req, res) => {
    const id= req.params.id;
    userModel.getfooterbyid(id,(err,result)=>{
        if(err){
            return res.status(400).json({errors: err.message});
        }
        if(!result || result.length === 0){
            return res.status(400).json({errors: "footer not found"});
        }
        userModel.deletefooter(id,(err,result1)=>{
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

export {addfooter, getfooters, getfooterbyid, updatefooter, deletefooter};