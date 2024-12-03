"use server"
import { User } from "@/types/database/user"
import { createClient } from "@/utils/supabase/server"

export default async function getUsers(): Promise<{
    sucess: boolean,
    message: string,
    data: User[]
}>{
    const client = await createClient()
    const {data, error} = await client.from("admin_users").select("*").returns<User[]>()
    if(error){
        throw new Error(error.message)
    }
    console.log(data)
    return {
        sucess: true,
        message: "none",
        data: data
    }
}