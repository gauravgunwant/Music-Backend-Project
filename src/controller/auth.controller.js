import userModel from "../model/db.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function userRegister(req,res){
    const {username, email,password,role = "user"} = req.body;
    //verify 
    const isUserExists = await userModel.findOne({
        $or: [
            {username},{email}
        ]
    })

    if(isUserExists || !password ){
        return res.status(400).json({
            message: "User already exists, Try Different Credentials! or Enter Valid Password"
        })
    }

    if(role !== "artist" && role !== "user"){
        return res.status(400).json({
            message: "Role can't be other then artist or user!"
        })
    }

    const pass =  await bcrypt.hash(password,10);

    const data = await userModel.create({
        username,
        email,
        password: pass,
        role
    })

    const token = jwt.sign({
        id: data._id.toString(),
        role
    },process.env.JWT_TOKEN);

    res.cookie("token", token);


    res.status(201).json({
        message: "User Registered Succesfully!",
    })
}


async function userLogin(req,res){
    const {username,email,password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {username}, {email}
        ]
    })

    if(!user){
        return res.status(401).json({
            message: "Enter correct username or email to login!"
        })
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(401).send("Password incorrect!");
    }
    

    // if(!req.cookies.token){
    //     return res.status(401).send("First Login/Register Yourself!");
    // }
    // // { id: '69a8a62bb5e44221e4483049', role: 'user', iat: 1772660267 }
    // if(jwt.verify(req.cookies.token,process.env.JWT_TOKEN) !== user._id){
    //     return res.status(401).send("Unauthorised User");
    // }

    const token = jwt.sign({
        id: user._id,
        role: user.role,
    },process.env.JWT_TOKEN);

    res.cookie("token", token);

    res.status(200).json({
        message: "You are logged in!",
    })
}


async function userLogout(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "Successfully logout!"
    })
}

export default {userRegister,userLogin,userLogout};