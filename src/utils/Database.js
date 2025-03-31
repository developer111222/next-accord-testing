import mongoose from "mongoose";

const  DBConnection = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://jiyakhurana68:EJEYD0dONF5Fa7HP@cluster0.7qewb.mongodb.net/accordcable", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                bufferCommands: false,
                serverSelectionTimeoutMS: 50000,
                socketTimeoutMS: 45000,
             
            }
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // This ensures you don't proceed if DB is not connected
    }
};

export default DBConnection;