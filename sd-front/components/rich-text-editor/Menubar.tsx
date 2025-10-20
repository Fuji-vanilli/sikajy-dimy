import { Editor } from "@tiptap/react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import { Bold } from "lucide-react";

interface iAppProps {
    editor: Editor | null;
}

export function Menubar({ editor }: iAppProps) {
    if (!editor) {
        return null;
    }

    return (
        <div>
            <TooltipProvider>
                <div>
                    <Tooltip>
                        <TooltipTrigger>
                            <Toggle>
                                <Bold />
                            </Toggle>
                        </TooltipTrigger>
                    </Tooltip>
                </div>
            </TooltipProvider>
        </div>
    );
}  