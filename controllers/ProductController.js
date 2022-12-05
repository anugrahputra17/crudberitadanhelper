import Product from "../models/ProductModel.js";
import Helper from "../models/HelperModel.js";
import path from "path";
import fs from "fs";

//crudBerita
export const getProducts = async(req, res)=>{
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = async(req, res)=>{
    try {
        const response = await Product.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveProduct = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.title;
    const file = req.files.file;
    const deskripsi = req.body.deskripsi;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Product.create({name: name, image: fileName, deskripsi: deskripsi, url: url});
            res.status(201).json({msg: "News Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateProduct = async(req, res)=>{
    const product = await Product.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = product.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.title;
    const deskripsi = req.body.deskripsi;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Product.update({name: name, image: fileName, deskripsi: deskripsi, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "News Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProduct = async(req, res)=>{
    const product = await Product.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "News Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

//formBantuan
export const getHelp = async(req,res) =>{
    try{
        const response = await Helper.findAll();
        res.status(200).json(response);
    }catch(error){
        console.log(error.message);
    }
}

export const getHelpById = async(req,res) =>{
    try{
        const response = await Helper.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    }catch(error){
        console.log(error.message);
    }
}

//create
export const createHelp  = async(req,res) =>{
    try{
        await Helper.create(req.body);
        res.status(201).json({msg:"help create succesfully"});
    }catch(error){
        console.log(error.message);
    }
}

//update
export const updateHelp  = async(req,res) =>{
    try{
        await Helper.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg:"help updated"});
    }catch(error){
        console.log(error.message);
    }
}

//delete
export const deleteHelp = async(req,res) =>{
    try{
        await Helper.destroy({
            where: {
                id: req.params.id 
            }
        });
        res.status(201).json({msg:"help deleted"});
    }catch(error){
        console.log(error.message);
    }
}