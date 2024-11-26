"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useEffect, useState } from 'react'
import getIndividualResponse from '@/utils/custom/analytics/getIndividualResponse'
import { FormResponse } from '@/types/database/response'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Question } from '@/types/database/questions'
import getQuestions from '@/utils/custom/questions/getQuestions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default function ResponsePage() {
    const [loading, setLoading] = useState(true)
    const [responses, setResponses] = useState<FormResponse[]>()
    const [questions, setQuestions] = useState<Question[]>()
    const searchParams = useSearchParams()
    const stringData = searchParams.get("data")
    const parsedData = JSON.parse(stringData)

    useEffect(()=>{
        async function getResponseData(){
            const responseData = await getIndividualResponse(parsedData.date_answered, parsedData.user_email)
            console.log(responseData)
            setResponses(responseData)
            const questions =await getQuestions()
            setQuestions(questions)
            console.log(questions)
            setLoading(false)
        }
        getResponseData()
    },[])
    if(loading){
        return <LoadingSpinner />
    }

    function sortResponses(a, b){
        if (a.question_id < b.question_id){
            return -1
        }
        if (a.question_id > b.question_id){
            return 1
        }
        return 0
    }
    function sortQuestions(a, b){
        if (a.id < b.id){
            return -1
        }
        if (a.id > b.id){
            return 1
        }
        return 0
    }
    questions.sort(sortQuestions)
    responses.sort(sortResponses)
    const interpretations = ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree']
    const inversedInterprestations = ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree']
    const combinedData = responses.map((x, i) => (
        {
            response_value: x.response_value,
            question_statement: questions[i].question,
            interpretation: questions[i].is_reversed ? inversedInterprestations[x.response_value] : interpretations[x.response_value]
        }
    ))
    console.log(combinedData)
    
    return (
        
        <div className='flex p-10 flex-col gap-y-7'>
            <Link href={`${process.env.NEXT_PUBLIC_URL}/admin`}><Button>&lt; Back</Button></Link>
            <h1 className='font-bold'>{parsedData.user_email}</h1>
            <h1 className='font-bold'>{parsedData.userName}</h1>
            <div className='flex flex-row justify-between'>
                <div>Question </div>
                <div>Response </div>
                
            </div>
            {combinedData.map( x => (
                <div key={`${Math.random().toString(16).slice(2)}-response`} className='flex flex-row justify-between'>
                    <div>{x.question_statement}</div>
                    <div>{x.interpretation}</div>
                </div>
            ))}
        </div>
    )
}
