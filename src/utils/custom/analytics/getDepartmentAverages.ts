"use server"
import { DepartmentAverage } from "@/types/analytics/departmentAverages"
import { Department } from "@/types/database/departments"
import { ProcessedResponse } from "@/types/database/processedResponses"
import { Question } from "@/types/database/questions"
import { createClient } from "@/utils/supabase/server"

export default async function getDepartmentAverages(): Promise<DepartmentAverage[]>{
    const client = await createClient()
    const {data: departments, error: departmentsError} = await client.from('departments').select("*").returns<Department[]>()
    const {data: responses, error: responsesError} = await client.from('processed_responses').select("*").returns<ProcessedResponse[]>()
    const data = []
    departments.forEach(department => {
        let sum = 0
        let count = 0
        let fill = "red"
        switch(department.id){
            case 1:
                fill = "red"
                break
            case 2:
                fill = "blue"
                break
            case 3:
                fill = "orange"
                break
            case 4:
                fill = "yellow"
                break
            case 5:
                fill = "violet"
                break
            case 6:
                fill = "green"
                break
        }
        responses.forEach(response => {
            if(response.user_department == department.id){
                sum+=response.summed_result
                count++
            }
        })
        data.push(
            {
                department: department.acronym,
                average: (sum/count),
                fill: fill
            } as DepartmentAverage
        )
    })
    console.log(data)
    return(data)
}