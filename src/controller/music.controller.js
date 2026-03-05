import musicModel from "../model/music.model.js";
import albumModel from "../model/album.model.js";
import uploadFileIMGKIT from "../service/storage.service.js";
import jwt from "jsonwebtoken";

async function createMusic(req,res){
    const {title}  = req.body;
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "First Login/Register! "
        })
    }
    try {
        const user = jwt.verify(token,process.env.JWT_TOKEN);
        console.log(user.role);

        if(user.role !== "artist"){
            return res.status(403).json({
                message: "You are not allowed to create music"
            })
        }
        
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

        
    } catch (error) {
        res.status(403).json({
            message: "Unauthorized",
        })
    }

}

async function createAlbum(req,res){
    const {title, musics} = req.body;
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message: "First Login/Register! "
        })
    }

    try {
        const user = jwt.verify(token,process.env.JWT_TOKEN);

        if(user.role !== "artist"){
            return res.status(403).json({
                message: "You are not allowed to create album"
            })
        }

        const album = await albumModel.create({
            title,musics,
            artist: user.id
        })

        res.status(201).json({
            message: "Album created Successfully!",
            album
        });

    } catch (error) {
        return res.status(401).json({
            message: "I dont know kya error hai",
            error: error.message
        })
    }
}

export default {createMusic,createAlbum};