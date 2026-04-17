import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export const signupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const linkSchema  = z.object({
    platform: z.string().min(3, "Platform must be at least 3 characters long"),
    url: z.string().url("Invalid URL format")
})

export const partialSchema = z.object({
    platform: z.string().min(3, "Platform must be at least 3 characters long").optional(),
    url: z.string().url("Invalid URL format").optional()
})