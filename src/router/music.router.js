import express from "express";
import musicController from "../controller/music.controller.js";
import multer from "multer";
const router = express.Router();

const upload = multer({storage: multer.memoryStorage()})

router.post("/upload", upload.single("music") ,musicController.createMusic)

export default router;