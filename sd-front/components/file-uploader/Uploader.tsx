"use client";

import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { RenderEmptyState, RenderErrorState } from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { ca } from "zod/v4/locales";

interface UploaderState {
    id: string | null;
    file: File | null;
    uploading: boolean;
    progress: number;
    key ?: string
    isDeleting: boolean;
    error: boolean;
    objectURL?: string;
    fileType: "image" | "video";
}

export function Uploader() {
    const [fileState, SetFileState] = useState<UploaderState>({
        error: false,
        file: null,
        id: null,
        uploading: false,
        progress: 0,
        isDeleting: false,
        fileType: "image",
    });

    async function uploadFile(file: File) {
        SetFileState((prevState) => ({
            ...prevState,
            uploading: true,
            progress: 0, 
        }));

        try {
            const presignedResponse = await fetch('/api/s3/upload', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                    isImage: true,
                }),
            })
        } catch (error) {

        }
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            SetFileState({
                file: file,
                uploading: false,
                progress: 0,
                objectURL: URL.createObjectURL(file),
                id: uuidv4(),
                isDeleting: false,
                error: false,
                fileType: "image",
            })
        }
    }, [])

    function rejectedFiles(fileRejection: FileRejection[]) {
        if (fileRejection.length) {
            const tooManyFiles = fileRejection.find((rejection)=> rejection.errors
                [0].code === "too-many-files");
            const fileSizeTooBig = fileRejection.find((rejection)=> rejection.errors
                [0].code === "file-too-large");

            if (tooManyFiles) {
                toast.error("Too many files. Please upload only one file.");
            } 
            if (fileSizeTooBig) {
                toast.error("File size is too big. Maximum size is 5MB.");
            }
        }
    }

    const {
        getRootProps, 
        getInputProps, 
        isDragActive
    } = useDropzone({
        onDrop,
        accept: {"image/*": []},
        maxFiles: 1,
        multiple: false,
        maxSize: 5 * 1024 * 1024,
        onDropRejected: rejectedFiles,
    });

    return (
        <Card {...getRootProps()}
            className={cn(
                "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-52",
                isDragActive ? 'border-primary bg-primary/10 border-solid' : 
                                'border-border hover:border-primary'
            )}
        >
            <CardContent className="flex items-center justify-center h-full w-full p-4">
                <input {...getInputProps()} />
                <RenderEmptyState isDragActive= {isDragActive} />
            </CardContent>
        </Card>
    )
}