import {prisma } from "../config/prisma.js";
import { Role } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";
import {generateToken} from "../util/generateToken.js";
export class AuthService{
    static async createUser(data: any){

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const user =  await prisma.user.create({
            data:{
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role as Role
            }
        })
        const { password, ...rest } = user
        const token = generateToken(user.id, user.role)
        return { ...rest, token }
    }

    static async loginUser(data: any){
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(!user) throw new Error("invalid credentials")


     const isMatch =  await bcrypt.compare(data.password, user.password)
     if(!isMatch) throw new Error("invalid credentials")

        const token  = generateToken(user.id, user.role)

        const { password, ...rest} = user
        return { ...rest, token }
    }
}