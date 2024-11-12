"use server"
import { Question } from "@/types/database/questions"
import { createClient } from "@/utils/supabase/server"

export default async function getQuestions(): Promise<Question[]>{
    const client = await createClient()
    const {data, error} = await client.from("questions").select("*").returns<Question[]>()
    if(error){
        throw new Error(error.message)
    }
    return data
}