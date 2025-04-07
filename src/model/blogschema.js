import mongoose, { Mongoose } from "mongoose";

const BlogSchema=new mongoose.Schema({
metatitle:{
    type:String,
    },
    metadescription:{
        type:String,
    },
    metakeyword:{
        type:String,
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
},{timestamps:true}
)


const Blog= mongoose.models.Blog || mongoose.model("Blog",BlogSchema);

export default Blog;