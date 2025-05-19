import { NextResponse } from "next/server";
import { storage } from "@/config/appwriteConfig";
import { ID } from "appwrite";
import { db } from "@/config/db";
import { aiGeneratedImage } from "@/config/schema";

export async function POST(req) {
  // const {user} = useUser() 
  try {
    const { imageUrl, roomType, designType, additionalReq, userEmail } = await req.json();

    if (!roomType || !designType) {
      return NextResponse.json(
        { error: "Room type and design type are required" },
        { status: 400 }
      );
    }

    const prompt = `A ${roomType} with ${designType} style interior. ${additionalReq || ''}`;

    const form = new FormData();
    form.append("prompt", prompt);

    const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      body: form,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Clipdrop API Error:", errorText);
      throw new Error("Failed to generate image");
    }

    // Get the image as a blob
    const imageBlob = await response.blob();

    // Convert blob to File object (Appwrite needs a File object)
    const imageFile = new File([imageBlob], `${ID.unique()}.png`, {
      type: imageBlob.type,
    });

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;

    // Upload to Appwrite
    const uploadResponse = await storage.createFile(
      bucketId,
      ID.unique(),
      imageFile
    );

    // Get the file URL for displaying
    const fileUrl = storage.getFileView(bucketId, uploadResponse.$id);
    // const fileUrl = 'https://cloud.appwrite.io/v1/storage/buckets/67e1b6920004cdbcecfa/files/6803749f00010643eacb/view?project=67e1b668001d2034e073'
    console.log("File URL from Appwrite:", fileUrl);

    // Fetch the file from Appwrite storage as a blob
    const fileResponse = await fetch(fileUrl);
    const fileBlob = await fileResponse.blob();

    // Convert the file blob to base64
    const base64Image = await convertBlobToBase64(fileBlob);


    const dbResult = await db.insert(aiGeneratedImage).values({
      roomType: roomType,
      designType: designType,
      orgImage: imageUrl,
      aiImage: fileUrl,
      userEmail: userEmail
    }).returning({ id: aiGeneratedImage.id })

    console.log(dbResult)
    // return NextResponse.json({'result': dbResult})

    return NextResponse.json(
      {
        fileUrl,
        base64Image,
        fileId: uploadResponse.$id,
        result: dbResult
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to convert a Blob to Base64
async function convertBlobToBase64(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer).toString('base64');
}
