import { NextResponse } from "next/server";
import Blog from '../../../../model/blogschema';
import { authorize } from '../../middleware/auth';
import ImageUpload from "../../../../utils/ImageUpload";
import DBConnection from '../../../../utils/Database';

//--------------------get singler blog--------------

export const GET = async (req, { params }) => {
    try {
        const { slug } =  await params;
        await DBConnection();

        const blog = await Blog.findOne({ slug });
        if (!blog) {
            return NextResponse.status(404).json({ success: false, message: "Blog not found" });
        }

        return NextResponse.json({ success: true, blog })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "server error" })
    }

}


//--------------------edit blog--------------

export const PATCH=async(req,{params})=>{
    try {
        const { slug } = await params;
  
        const authorizationResult = await authorize("admin")(req);
  
        if (authorizationResult.status !== 200) {
            return NextResponse.json({ success: false, message: authorizationResult.msg }, { status: authorizationResult.status });
        }
    
        await DBConnection();
        const data = await req.formData();
       
        const metatitle = data.get('metatitle');
        const metadescription = data.get('metadescription');
        const metakeyword = data.get('metakeyword');
        const title = data.get('title');
        const content = data.get('content');
      
        const file = data.get('image');
    
        let imageName = null;
        if (file) {
          await ImageUpload(file);
          imageName = file.name;
        }
    
        const updateData = {};
        if (metatitle) updateData.metatitle = metatitle;
        if (metadescription) updateData.metadescription = metadescription;
        if (metakeyword) updateData.metakeyword = metakeyword;
        if (title) updateData.title = title;
        if (content) updateData.content = content;
        if (imageName) updateData.image = imageName;
        updateData.slug = title ? title.toLowerCase() : null;
    
        const blog = await Blog.findByIdAndUpdate(slug, { $set: updateData }, { new: true });
        if (!blog) {
          return NextResponse.json({ success: false, message: "Blog not found" });
        }
    
        return NextResponse.json({ success: true, blog,message:"update successfully" });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "server error" });
      }
}


//----------------delete blog by id----------------

export const DELETE = async (req, { params }) => {
    try {
        const { slug } = await params;
  
        const authorizationResult = await authorize("admin")(req);
  
        if (authorizationResult.status !== 200) {
            return NextResponse.json({ success: false, message: authorizationResult.msg }, { status: authorizationResult.status });
        }
    
        await DBConnection();
        const blog = await Blog.findByIdAndDelete(slug);
        if (!blog) {
            return NextResponse.json({ success: false, message: "Blog not found" });
        }
    
        return NextResponse.json({ success: true, message: "Blog deleted successfully" });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "server error" });
      }
}