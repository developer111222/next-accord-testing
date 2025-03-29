import mongoose from "mongoose";
import slugify from "slugify";

const ProductSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},  { timestamps: true })


ProductSchema.pre('save', function (next) {
    if (this.isModified('title') || this.isNew) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema); // ✅ Fix OverwriteModelError

export default Product;