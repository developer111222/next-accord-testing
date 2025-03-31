import Product from "../model/productschema";
import DBConnection from "@/utils/Database";

export const getPosts = async (req) => {
    await DBConnection();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
};

export const CreateProduct = async (req) => {
    await DBConnection();
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const image = formData.get("image");

    if (!title || !content || !image) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        const newProduct = new Product({ title, content, image });
        await newProduct.save();
        return NextResponse.json({ message: "Product created successfully", product: newProduct }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const updatePost = async (req) => {
    return NextResponse.json({ message: "Updating product" }, { status: 200 });
};

export const deletePost = async (req) => {
    return NextResponse.json({ message: "Deleting product" }, { status: 200 });
};
