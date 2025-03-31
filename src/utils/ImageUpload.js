
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';

const ImageUpload = async(file) => {

    if(!file) {
        return NextResponse.json({success:false})
    }
    const bufferData = await file.arrayBuffer();
    const buffer = Buffer.from(bufferData);
    const path = `./public/uploads/${file.name}`;

    try {
        await writeFile(path,buffer)
        return NextResponse.json({response: "Successfully Uploaded", success:true})
    }
    catch (error){
        console.log(error);
        return NextResponse.json({MESSAGE:"IMAGE UPLOADED ERROR",success:false})
    }
}

export default ImageUpload