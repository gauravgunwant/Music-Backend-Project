import express from "express";
import musicController from "../controller/music.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js"

import multer from "multer";
const router = express.Router();

const upload = multer({storage: multer.memoryStorage()})

router.post("/upload",authMiddleware.verifyToken, upload.single("music") ,musicController.createMusic)
router.post("/create-album",authMiddleware.verifyToken,musicController.createAlbum);

export default router;