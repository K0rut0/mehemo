"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import StudentInfoForm from './studentInformation/StudentInfoForm'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CustomCarouselNext,
    CustomCarouselPrev,
  } from "@/components/ui/carousel"
import { StudentInfoData } from '@/types/form/studentInformation'
import QuestionsForm from './questions/QuestionsForm'
import QuestionsParent from './questions/QuestionsParent'
import { fallbackModeToFallbackField } from 'next/dist/lib/fallback'
import { Button } from './ui/button'
import insertAnswers from '@/utils/custom/questions/insertAnswers'
import { toast, useToast } from "@/hooks/use-toast"

export default function MainCard() {
    const [studentInformation, setStudentInformation] = useState<StudentInfoData | null>(null)
    const [questionAnswers, setQuestionAnswers] = useState(null)
    const [enabled, setEnabled] = useState<boolean>(false)
    useEffect(()=>{
        if(studentInformation != null){
            setEnabled(true)
        }
    },[studentInformation, questionAnswers])

    return (
        <Card className='flex flex-col md:max-w-[480px] max-w-[360px] overflow-x-hidden '>
            <CardHeader>
                <CardTitle>
                    MeHeMo
                </CardTitle>
                <CardDescription>
                    Enter your information below. Ensure that it is accurate.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <QuestionsParent/>
            </CardContent>
            <CardFooter>
                <CardDescription>
                    Questions adopted from the <a className="text-blue-500 underline" target='_blank' href='https://www.psicothema.com/pdf/3564.pdf'>GHQ-12 Questionnaire</a>
                </CardDescription>
            </CardFooter>
        </Card>
    )
}
