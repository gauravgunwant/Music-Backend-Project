import jwt from "jsonwebtoken";

function artistAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "First Login/Register! ",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    console.log(user.role);

    if (user.role !== "artist") {
      return res.status(403).json({
        message: "You are not allowed to create music",
      });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  
}

function userAuth(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "Login/Register First!"});
    }

    try {

        const user = jwt.verify(token,process.env.JWT_TOKEN);
        console.log(user.role);
        if(user.role !== "artist" && user.role !== "user"){
            return res.status(401).json({message: "Unauthorized"})
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized", error})
    }
}

export default { artistAuth, userAuth};