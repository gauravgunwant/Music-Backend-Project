import musicModel from "../model/music.model.js";
import albumModel from "../model/album.model.js";
import uploadFileIMGKIT from "../service/storage.service.js";
import mongoose from "mongoose";

async function createMusic(req,res){
    const {title}  = req.body;
    const user = req.user;
        if(!req.file){
            return res.status(400).json({
                message: "Music file requireed!"
            })
        }
        const result = await uploadFileIMGKIT(req.file.buffer);

        const data = await musicModel.create({
            uri: result.url,
            title,
            artist: user.id,
        })
        
        res.status(201).json({
            message: "Music Created!",
        });


}

async function createAlbum(req,res){
    const {title, musics} = req.body;
    const user = req.user;
    const album = await albumModel.create({
        title,musics,
        artist: user.id
    })

    res.status(201).json({
        message: "Album created Successfully!",
        album
    });
}

async function getAllMusic(req,res){

    // ?page=page&limit=limit, added pagination  logic so that all music doesn't load at once!
    const {page, limit} = req.query;
    console.log(page,limit)

    const musics = await musicModel.find()
    .limit(limit)
    .skip((page-1)*limit)
    .select("uri title artist").populate("artist", "username");

    res.status(200).json({
        message: "Music fetched successfully",
        musics
    })
}   

export default {createMusic,createAlbum,getAllMusic};