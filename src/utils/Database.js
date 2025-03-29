import mongoose from "mongoose";

 const DBConnection=async()=>{
    try {
        await mongoose.connect("mongodb+srv://jiyakhurana68:EJEYD0dONF5Fa7HP@cluster0.7qewb.mongodb.net/accordcable");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to mongodb")
    }
}
export default DBConnection