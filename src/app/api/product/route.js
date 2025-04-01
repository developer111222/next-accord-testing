import { NextResponse } from "next/server";
import Product from '../../../model/productschema';
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

        // Continue with product creation logic if authorized
        await DBConnection();
        const data = await req.formData();
        const title = data.get('title');
        const content = data.get('content');
        const file = data.get('image');
        
        
        if (!title || !content || !file) {
            return NextResponse.json({ success: false, response: "All fields are required" });
        }
        
        await ImageUpload(file)
        
        const product = new Product({ title, content, image: file.name, slug: title.toLowerCase() });
        await product.save();

        return NextResponse.json({ success: true, message: "Product created successfully" });
    } catch (error) {
        return NextResponse.json({ message: "SERVER ERROR", success: false, error });
    }
}

export async function GET(req) {
    try {
      
        await DBConnection();
        const products = await Product.find();
        return NextResponse.json({ success: true, products });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "SERVER ERROR", success: false, error });
    }
}




