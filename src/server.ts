
import app from "./app";
import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();



const PORT =process.env.PORT;
const mongo_url = process.env.MONGODB_URI

async function main() {
    try {
        await mongoose.connect(mongo_url as string)
        app.listen(PORT, ()=>{
            console.log(` server listening at ${PORT}`);
            
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

main()