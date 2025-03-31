import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });



const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema); // ✅ Fix OverwriteModelError

export default Product;
