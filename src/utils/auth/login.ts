'use server'
import { LoginData } from "@/types/form/loginForm"
import { createClient } from "../supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function login(data: LoginData){
    const client = await createClient()
    const userCredentials = {
        email: data.email as string,
        password: data.password as string
    }
    const { error } = await client.auth.signInWithPassword(data)
    if (error) {
        console.log(error)
        redirect('/error')
    }
    
    revalidatePath('/', 'layout')
    redirect('/admin')
}