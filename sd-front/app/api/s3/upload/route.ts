import { env } from "@/lib/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import z, { size } from "zod";
import { v4 as uuidv4 } from "uuid";

export const fileUploadSchema = z.object({
    fileName: z.string().min(1, {message: "Flilename required"}),
    contentType: z.string().min(1, {message: "Content type required"}), 
    size: z.number().min(1, {message: "File size required"}),
    isImage: z.boolean(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation =  fileUploadSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({error: "Invalid request"}, {status: 400});    
        }

        const {fileName, contentType, size, isImage} = validation.data;
    
        const uniqueKey = `${uuidv4()}-${fileName}`;
        const command = new PutObjectCommand({
            Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGE,
            ContentType: contentType,
            ContentLength: size,
            Key: uniqueKey
        })
    } catch (error) {
        
    }
}