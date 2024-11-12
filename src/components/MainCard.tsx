"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
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
export default function MainCard() {
    const [studentInformation, setStudentInformation] = useState<StudentInfoData | null>(null)
    const [questionAnswers, setQuestionAnswers] = useState(null)
    const [enabled, setEnabled] = useState<boolean>(false)
    useEffect(()=>{
        if(studentInformation != null){
            setEnabled(true)
        }
    },[studentInformation, questionAnswers])

    function submitAnswers(){
        insertAnswers(studentInformation, questionAnswers)
    }

    return (
        <Card className='flex flex-col md:max-w-[480px] max-w-[360px] overflow-y-scroll overflow-x-hidden max-h-[600px]'>
            <CardHeader>
                <CardTitle>
                    MeHeMo
                </CardTitle>
                <CardDescription>
                    Enter your information below. Ensure that it is accurate.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Carousel className='flex flex-col md:max-w-[480px] max-w-[360px]'
                opts={{
                    active: true,
                    watchDrag: false
                }}
                orientation='horizontal'
                >
                    <CarouselContent className='flex md:max-w-[480px] max-w-[360px] p-3'>
                        <CarouselItem>
                            <StudentInfoForm setter={setStudentInformation} setEnabled={setEnabled}/>
                        </CarouselItem>
                        <CarouselItem>
                            <QuestionsParent setter={setQuestionAnswers} setEnabled={setEnabled}/>
                        </CarouselItem>
                        <CarouselItem>
                            <Button 
                                disabled={(studentInformation != null && questionAnswers != null) ? false : true} 
                                onClick={submitAnswers}
                                className='w-full'
                            > 
                                Submit 
                            </Button>
                        </CarouselItem>
                    </CarouselContent>
                    <div className='flex justify-end md:max-w-[480px] max-w-[360px] p-3 gap-x-3'>
                        <CustomCarouselPrev className={`bg-black text-white font-semibold w-1/2`}/>
                        <CustomCarouselNext className={`bg-green-500 text-white font-semibold w-1/2  ${enabled ? "opacity-100" : "opacity-50"}` } disabled={!enabled}/>
                    </div>
                </Carousel>
            </CardContent>
        </Card>
    )
}
