"use client"
import { Question } from "@/types/database/questions";
import getQuestions from "@/utils/custom/questions/getQuestions";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from 'react'

export default function Test() {
    let client = createClient()

    //Create Loading state
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState<Question[]>()

    //Create useEffect to manage loading state
    useEffect(() => {
        async function fetchQuestions(){
            let data = await getQuestions()
            setQuestion(data)
            setLoading(false)
        }
        fetchQuestions()
    }, [])

    if(loading){
        return <div>Loading</div>
    }
    console.log(question)
    return (
        <div>Tite</div>
    )
}
