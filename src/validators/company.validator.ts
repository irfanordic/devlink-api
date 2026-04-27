import { z } from 'zod';

export const companyCreateSchema = z.object({
    name: z.string().min(3, "Company name must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    website: z.string().url("Invalid URL format").optional()
})


export const companyUpdateSchema = z.object({
    name: z.string().min(3, "Company name must be at least 3 characters long").optional(),
    description: z.string().min(10, "Description must be at least 10 characters long").optional(),
    website: z.string().url("Invalid URL format").optional()
})