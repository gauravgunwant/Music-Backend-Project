import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
})

import app from "./src/app.js";
import { connectDB } from "./src/db/db.js";

connectDB();
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
})