import { cn } from "@/lib/utils";
import { CloudUploadIcon } from "lucide-react";

export function RenderEmptyState({isDragActive}: {isDragActive: boolean}) {
    return (
        <div className="text-center">
            <div className="flex items-center mx-auto justify-center size-12">
                <CloudUploadIcon className={cn(
                    "size-6 text-muted-foreground",
                    isDragActive && "text-primary"
                )} />
            </div>
        </div>
    )
}