import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';

const ImageUpload = async (file) => {
  if (!file) {
    return NextResponse.json({ success: false });
  }

  try {
    // If file is a stream, convert it to a buffer
    const buffer = await file.arrayBuffer ? Buffer.from(await file.arrayBuffer()) : file.buffer;
    
    // Set the upload path
    const path = `./public/uploads/${file.name}`;

    // Write the buffer data to the file
    await writeFile(path, buffer);

    // Return success response
    return NextResponse.json({ response: "Successfully Uploaded", success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ MESSAGE: "IMAGE UPLOAD ERROR", success: false });
  }
}

export default ImageUpload;
