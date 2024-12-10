"use server"
import { DepartmentAverage } from "@/types/analytics/departmentAverages"
import { Department } from "@/types/database/departments"
import { MonthlyAverage } from "@/types/database/monthly_average"
import { ProcessedResponse } from "@/types/database/processedResponses"
import { Question } from "@/types/database/questions"
import { createClient } from "@/utils/supabase/server"

export default async function getMonthlyAverages(): Promise<{
    success: boolean,
    message: string,
    data: any
}>{
    const client = await createClient()
    let months = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
    const parsedDate = []
    const {data: monthlyData, error} = await client.from("monthly_average").select("*").returns<MonthlyAverage[]>()
    if(error){
        return {
            success: false,
            message: error.message,
            data: null
        }
    }
    monthlyData.sort((a, b) => (a.month - b.month))
    const groupedData = []
    monthlyData.forEach(data => {
        let currMonth = months[data.month-1]
        let index = groupedData.findIndex(val => val.month === currMonth)
        if(index == -1){
            groupedData.push({
                month: months[data.month-1],
                [data.acronym]: data.avg
            })
        } else {
            groupedData[index][data.acronym] = data.avg
        }
    })
    console.log(groupedData)
    return {
        success: true,
        message: "Success",
        data: groupedData
    }
    
}