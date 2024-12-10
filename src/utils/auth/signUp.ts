'use server'
import { LoginData } from "@/types/form/loginForm"
import { createClient } from "../supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { SignUpData } from "@/types/form/signUpForm"

export async function signUp(data: SignUpData){
    const client = await createClient()
    const userCredentials = {
        email: data.email as string,
        password: data.password as string,
        options:{
            data: {
                firstName: data.firstName,
                lastName: data.lastName
            }
        }
    }
    console.log(userCredentials)
    const { data: singUpResponseData, error } = await client.auth.signUp(userCredentials)
    if(error){
        return({
            success: false,
            message: error.message
        })
    } else {
        return({
            success: true,
            message: "Successfully signed up"
        })
    }

}