"use server"
import { Course } from "@/types/database/courses"
import { ProcessedResponse } from "@/types/database/processedResponses"
import { FormResponse } from "@/types/database/response"
import { createClient } from "@/utils/supabase/server"

interface getIndividualResponseParams {
    date_answered: Date,
    user_email: string
}

export default async function getIndividualResponse(date_answered: Date, user_email: string): Promise<FormResponse[]>{
    const client = await createClient()
    const {data, error} = await client.from("responses").select("*").eq('user_email', user_email).eq('date_answered', date_answered).returns<FormResponse[]>()
    if(error){
        throw new Error(error.message)
    }
    return data
}