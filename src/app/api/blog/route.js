import { NextResponse } from "next/server";
import Blog from '../../../model/blogschema';
import DBConnection from '../../../utils/Database';
import { authorize } from '../middleware/auth';
import ImageUpload from '../../../utils/ImageUpload'

export async function POST(req, res) {
    try {

         // Protect this route by requiring the 'admin' role
         const authorizationResult = await authorize("admin")(req);

         if (authorizationResult.status !== 200) {
             return NextResponse.json({ success: false, message: authorizationResult.msg }, { status: authorizationResult.status });
         }
       const author=authorizationResult.user._id;
        

    //  console.log(authorizationResult,"authorize")
        await DBConnection();
        const data = await req.formData();
       
        const metatitle = data.get('metatitle');
        const metadescription = data.get('metadescription');
        const metakeyword = data.get('metakeyword');
        const title = data.get('title');
        const content = data.get('content');
      
        const file = data.get('image');

        if (!title || !content || !file) {
            return NextResponse.json({ success: false, message: "All fields are required" });
        }

        await ImageUpload(file)
        const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

        const blog=new Blog({
            metatitle,
            metadescription,
            metakeyword,
            title,
            slug,
            content,
            image: file.name,
            author
           
        })

        await blog.save();
        return NextResponse.json({ success: true, message: "Blog created successfully" });

    } catch (error) {
        return NextResponse.json({ message: "SERVER ERROR", success: false, error });
    }
}


//-------------------get blog -------

export async function GET(req, res) {
    try {
        await DBConnection();
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).populate('author','email role');
        return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "SERVER ERROR", success: false, error });
    }
}