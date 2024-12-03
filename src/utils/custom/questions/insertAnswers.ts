"use server"
import { Question } from "@/types/database/questions"
import { createClient } from "@/utils/supabase/server"

export default async function insertAnswers(studentInformation, questionAnswers): Promise<{
    success: boolean,
    message: string
}>{
    const client = await createClient()
    console.log(studentInformation)
    console.log(questionAnswers)
    let sum = 0
    let date = new Date().toUTCString()
    for(let key of Object.keys(questionAnswers)){
        let singleQuestionData = {
            survey_id: 1,
            user_email: `${studentInformation.studentNumber}`,
            question_id: parseInt(key),
            response_value: parseInt(questionAnswers[key]),
            date_answered: date,
            year_level: parseInt(studentInformation.yearLevel),
            program: studentInformation.course,
            user_name: `${studentInformation.firstName} ${studentInformation.lastName}`,
            user_department: parseInt(studentInformation.department),
        }
        const {error : singleQuestionDataError} = await client.from('responses').insert(singleQuestionData)
        if(singleQuestionDataError){
            console.log(singleQuestionDataError)
        } else {
            console.log("nice")
        }
        sum+=parseInt(questionAnswers[key])
    }
    
    let data = {
        user_email: `${studentInformation.studentNumber}`,
        date_answered: date,
        period_answered: "test_period",
        summed_result: sum,
        user_name: `${studentInformation.firstName} ${studentInformation.lastName}`,
        user_department: parseInt(studentInformation.department),
        user_program: studentInformation.course
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