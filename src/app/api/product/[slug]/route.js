import { NextResponse } from "next/server";
import Product from '../../../../model/productschema';
import {authorize} from '../../middleware/auth';
import ImageUpload from "../../../../utils/ImageUpload";
import DBConnection from '../../../../utils/Database';

// get product by slug

export const GET = async (req, {params}) => {
    try {
        const { slug } = await params;
 
        // const {slug}=params;
await DBConnection()
        const product =await Product.findOne({slug});
        if (!product) {
            return NextResponse.status(404).json({ success: false, message: "Product not found" });
        }

        return NextResponse.json({success:true,product})
        
    } catch (error) {
        return NextResponse.json({message:"server error"})
    }
}

//--------------------------update blog--------------------

export const PATCH = async (req, { params }) => {
    try {
      const { slug } = await params;

      const authorizationResult = await authorize("admin")(req);

      if (authorizationResult.status !== 200) {
          return NextResponse.json({ success: false, message: authorizationResult.msg }, { status: authorizationResult.status });
      }
  
      await DBConnection();
      const data = await req.formData();
      const title = data.get('title');
      const content = data.get('content');
      const file = data.get('image');
  
      let imageName = null;
      if (file) {
        await ImageUpload(file);
        imageName = file.name;
      }
  
      const updateData = {};
      if (title) updateData.title = title;
      if (content) updateData.content = content;
      if (imageName) updateData.image = imageName;
      updateData.slug = title ? title.toLowerCase() : null;
  
      const product = await Product.findByIdAndUpdate(slug, { $set: updateData }, { new: true });
      if (!product) {
        return NextResponse.json({ success: false, message: "Product not found" });
      }
  
      return NextResponse.json({ success: true, product,message:"update successfully" });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "server error" });
    }
  };


  //---------------------------delete blog buy id------------

  export const DELETE = async (req, { params }) => {
    try { 
      const { slug } = await params;
  
      // const authorizationResult = await authorize("admin")(req);
  
      // if (authorizationResult.status !== 200) {
      //   return NextResponse.json({ success: false, message: authorizationResult.msg }, { status: authorizationResult.status });
      // }

      await DBConnection();
  
      const product = await Product.findByIdAndDelete({_id:slug});
  
      if (!product) {
        return NextResponse.json({ success: false, message: "Product not found" });
      }
  
      return NextResponse.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "server error" });
    }
  };