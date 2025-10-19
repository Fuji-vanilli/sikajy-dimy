import { description } from "@/components/sidebar/chart-area-interactive";
import { title } from "process";
import z from "zod";

export const courseSchemma = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3),
    fileKey: z.string().min(1),
    price: z.number().min(1),
})