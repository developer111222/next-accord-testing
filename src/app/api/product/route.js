import { NextResponse } from "next/server";
import ImageUpload from "../../../utils/ImageUpload";
import Product from '../../../model/productschema';
import DBConnection from '../../../utils/Database';
import slugify from "slugify";

export async function POST(req) {
    
    
    
    try {
        await DBConnection();
            const data = await req.formData();
            console.log(data)
            const title=data.get('title');
            const content=data.get('content');
            const file = data.get('image');
         
        
            if (!title || !content || !file){
                return NextResponse.json({success: false, response: "All fields are required"})
            }
            if(file){
        
                await ImageUpload(file)
            } 
            const slug = slugify(title, { lower: true, strict: true });


            const product = new Product({
                title,
                content,
                image: file? file.name : '',
                slug
            });
            await product.save();
            return NextResponse.json({success: true, response: "Product created successfully"})
        
    }
    catch (error){
      
        return NextResponse.json({message:"SERVER ERROR",success:false,error})
    }
}

export async function GET(req){
try {
    const product=await Product.find({});

return NextResponse.json({success:true,product})
} catch (error) {
    return NextResponse.json({message:"SERVER ERROR",success:false,error})
}
}


