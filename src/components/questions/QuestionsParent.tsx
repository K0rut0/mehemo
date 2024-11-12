"use client"
import React, { SetStateAction, Suspense, useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner'
import { Question } from '@/types/database/questions'
import getQuestions from '@/utils/custom/questions/getQuestions'
import QuestionsForm from './QuestionsForm'

interface QuestionsParentProps {
  setter: React.Dispatch<SetStateAction<Object>>;
  setEnabled: React.Dispatch<SetStateAction<boolean>>
}

export default function QuestionsParent({setter, setEnabled}:QuestionsParentProps) {
  const [questions, setQuestions] = useState<Question[]>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchQuestions(){
      const data =await getQuestions()
      setQuestions(data)
      
      setLoading(false)
      console.log(data)
  }
  fetchQuestions()
}, [])
  if(loading){
    return <LoadingSpinner />
  }
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QuestionsForm questions={questions} setter={setter} setEnabled={setEnabled}/>
    </Suspense>
  )
}
