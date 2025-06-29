
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

let server:Server

const PORT =process.env.PORT;
const mongo_url = process.env.MONGODB_URI

async function main() {
    try {
        await mongoose.connect(mongo_url as string)
        server = app.listen(PORT, ()=>{
            console.log(` server listening at ${PORT}`);
            
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

main()