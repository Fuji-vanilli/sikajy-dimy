import { NextResponse } from "next/server";
import z, { size } from "zod";

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
    } catch (error) {
        
    }
}