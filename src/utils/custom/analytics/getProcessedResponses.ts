"use server"
import { Course } from "@/types/database/courses"
import { ProcessedResponse } from "@/types/database/processedResponses"
import { createClient } from "@/utils/supabase/server"

export default async function getProcessedResponses(): Promise<ProcessedResponse[]>{
    const client = await createClient()
    const {data, error} = await client.from("processed_responses").select("*").returns<ProcessedResponse[]>()
    if(error){
        throw new Error(error.message)
    }
    return data
}