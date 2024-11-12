"use server"
import { Course } from "@/types/database/courses"
import { createClient } from "@/utils/supabase/server"

export default async function getCourses(): Promise<Course[]>{
    const client = await createClient()
    const {data, error} = await client.from("programs").select("*").returns<Course[]>()
    if(error){
        throw new Error(error.message)
    }
    return data
}