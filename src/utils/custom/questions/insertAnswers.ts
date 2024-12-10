"use server"
import { Question } from "@/types/database/questions"
import { createClient } from "@/utils/supabase/server"

export default async function insertAnswers(formAnswers): Promise<{
    success: boolean,
    message: string
}>{
    const client = await createClient()
    console.log(formAnswers)
    let sum = 0
    let date = new Date().toUTCString()
    const keyExclusions = ["course", "department", "firstName", "lastName", "studentNumber", "yearLevel"]
    for(let key of Object.keys(formAnswers)){
        if(!keyExclusions.includes(key)){
            let singleQuestionData = {
                survey_id: 1,
                user_email: `${formAnswers.studentNumber}`,
                question_id: parseInt(key),
                response_value: parseInt(formAnswers[key]),
                date_answered: date,
                year_level: parseInt(formAnswers.yearLevel),
                program: formAnswers.course,
                user_name: `${formAnswers.firstName} ${formAnswers.lastName}`,
                user_department: parseInt(formAnswers.department),
            }
            const {error : singleQuestionDataError} = await client.from('responses').insert(singleQuestionData)
            if(singleQuestionDataError){
                console.log(singleQuestionDataError)
            } else {
                console.log("nice")
            }
            sum+=parseInt(formAnswers[key])
        }
    }
    
    let data = {
        user_email: `${formAnswers.studentNumber}`,
        date_answered: date,
        period_answered: "test_period",
        summed_result: sum,
        user_name: `${formAnswers.firstName} ${formAnswers.lastName}`,
        user_department: parseInt(formAnswers.department),
        user_program: formAnswers.course
    }
    const {error : processedDataError} = await client.from('processed_responses').insert(data)
    if(processedDataError){
        console.log(processedDataError.message)
        return {
            success: false,
            message: processedDataError.message
        }
    }


    console.log(sum)
    return {
        success: true,
        message: "Successfully inserted data"
    }
}