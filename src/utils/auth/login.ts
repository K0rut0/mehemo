'use server'
import { LoginData } from "@/types/form/loginForm"
import { createClient } from "../supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { User } from "@/types/database/user"

export async function login(data: LoginData){
    const client = await createClient()
    const userCredentials = {
        email: data.email as string,
        password: data.password as string
    }
    const { data: loginResponse, error } = await client.auth.signInWithPassword(data)
    if(!data){
        console.log("erorr")
    }
    if (error) {
        console.log(error)
        return({
            success: false,
            message: error.message
        })
    }
    let userId = loginResponse.user.id
    const {data: userInfo, error: userInfoError} = await client.from('admin_users').select("*").eq('id', userId).returns<User>()
    if(userInfo.isApproved || userInfo.adminType == 'none'){
        redirect('http://localhost:3000/')
    } else {
        revalidatePath('/', 'layout')
        redirect('/admin')
    }
}