"use server"
import { Department } from "@/types/database/departments"
import { createClient } from "@/utils/supabase/server"

export default async function getDepartments(): Promise<Department[]>{
    const client = await createClient()
    const {data, error} = await client.from("departments").select("*").returns<Department[]>()
    if(error){
        throw new Error(error.message)
    }
    return data
}