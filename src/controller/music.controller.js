import musicModel from "../model/music.model.js";
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

export default {createMusic};