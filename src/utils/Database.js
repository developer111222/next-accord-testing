import mongoose from "mongoose";


const  DBConnection = async () => {
    try {
        
        await mongoose.connect(
        process.env.DB , {
            
             
                bufferCommands: false,
                serverSelectionTimeoutMS: 100000,
                socketTimeoutMS: 45000,
                connectTimeoutMS: 30000
             
            }
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // This ensures you don't proceed if DB is not connected
    }
};

export default DBConnection;