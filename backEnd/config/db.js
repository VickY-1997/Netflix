import mongoose from "mongoose";
import { ENV_VARS } from "./envVariables.js";

export const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(ENV_VARS.mongo_url)
        console.log(`Mongodb Connected : ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error in connect database`);
        process.exit(1)
    }
}