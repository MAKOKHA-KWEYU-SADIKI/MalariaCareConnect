import { z } from "zod";
export const userSchema=z.object({
    name:z.string(),
    email:z.string(),
    phone:z.number(),
    location:z.string(),
    age:z.number(),
    date_of_birth:z.string(),
    gender:z.boolean(),
})

export const authSchema=z.object({
    password:z.string()
})
export const loginSchema=z.object({
    email:z.string(),
    password:z.string()
})
export const usersSchema=z.object({
    name:z.string(),
    email:z.string(),
    phone:z.number(),
    location:z.string(),
    age:z.number(),
    date_of_birth:z.string(),
    gender:z.boolean(),
    role:z.string()
})