"use server"
import { DepartmentAverage } from "@/types/analytics/departmentAverages"
import { Department } from "@/types/database/departments"
import { ProcessedResponse } from "@/types/database/processedResponses"
import { Question } from "@/types/database/questions"
import { createClient } from "@/utils/supabase/server"

export default async function refreshMonthlyTable(){
    const client = await createClient()
    const {data, error} = await client.rpc('updatemonthlyaverage')
    if(error){
        console.log(error.message)
    } else {
        console.log("updated table lkajkldjasljdlakjd")
    }

}