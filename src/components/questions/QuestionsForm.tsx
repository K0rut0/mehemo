import { Question } from '@/types/database/questions'
import getQuestions from '@/utils/custom/questions/getQuestions'
import React, { SetStateAction, useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import LikertRadio from '../custom/LikertRadio'
import { StudentInfoData } from '@/types/form/studentInformation'

interface QuestionsFormProps {
    questions: Question[];
    setter: React.Dispatch<SetStateAction<Object>>;
    setEnabled: React.Dispatch<SetStateAction<boolean>>
}

export default function QuestionsForm({questions, setter, setEnabled}:QuestionsFormProps) {
    
    const ParsedSchemaTypes = questions.map(question => (
        {
            name: question.id.toString(),
            fieldType: z.string({
                required_error: "Please answer the question"
            })
        }
    ))
    const FormSchema = z.object(
        
        Object.fromEntries(
            ParsedSchemaTypes.map((field) => [field.name, field.fieldType])
        )
    )

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    function onSubmit(d: z.infer<typeof FormSchema>){
        console.log(d)
        setter(d)
        
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-y-3 flex-1 max-h-[500px] overflow-y-scroll'>
            <Form {...form}>
                {questions.map(question => (
                    <FormField 
                        control={form.control}
                        key={`${Math.random().toString(16).slice(2)}-questions`}
                        name={question.id.toString()}
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>{question.question}</FormLabel>
                                    <FormControl>
                                        <LikertRadio setter={field.onChange} scale={question.scale} is_reversed={question.is_reversed} defaultValue={field.value}/> 
                                    </FormControl>  
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button type='submit'>Submit</Button>
            </Form>
        </form>
    )
}
