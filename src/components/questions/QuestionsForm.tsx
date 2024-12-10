import { Question } from '@/types/database/questions'
import getQuestions from '@/utils/custom/questions/getQuestions'
import React, { ReactNode, SetStateAction, useEffect, useState } from 'react'
import {LoadingSpinner} from '../LoadingSpinner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import LikertRadio from '../custom/LikertRadio'
import { StudentInfoData } from '@/types/form/studentInformation'
import CustomSelect from '../custom/CustomSelect'
import { Course } from '@/types/database/courses'
import { Department } from '@/types/database/departments'
import getCourses from '@/utils/custom/courses/getCourses'
import getDepartments from '@/utils/custom/departments/getDepartments'
import insertAnswers from '@/utils/custom/questions/insertAnswers'
import { toast } from '@/hooks/use-toast'


export default function QuestionsForm({questions}: {
        questions: Question[]
    }) {
    const [loading, setLoading] = useState(true)
    const [disabled, setDisabled] = useState(false)
    const [ansLoading, setAnsLoading] = useState(false)
    const [buttonContent, setButtonContent] = useState<ReactNode>("Submit")
    const [courses, setCourses] = useState<Course[]>()
    const [departments, setDepartments] = useState<Department[]>()
    const [userCourse, setuserCourse] = useState("None")
    //Create useEffect to manage loading state
    useEffect(() => {
        async function fetchFormContent(){
            let courseData = await getCourses()
            setCourses(courseData)
            console.log(courseData.map(c => c.program_acronym))
            let departmentData = await getDepartments()
            setDepartments(departmentData)
            setLoading(false)
        }
        fetchFormContent()
    }, [])
    const ParsedSchemaTypes = questions.map(question => (
        {
            name: question.id.toString(),
            fieldType: z.string({
                required_error: "Please answer the question"
            })
        }
    ))
    const studentInformation = [
        {
            name: "firstName",
            fieldType: z.string({
                required_error: "Please enter your first name"
            }).min(1, {
                message: "Please enter your first name"
            })
        },
        {
            name: "lastName",
            fieldType: z.string({
                required_error: "Please enter your last name"
            }).min(1, {
                message: "Please enter your last name"
            })
        },
        {
            name: "studentNumber",
            fieldType: z.string({
                required_error: "Please enter your student number"
            }).min(11, "Please state your student number")
        },
        {
            name: "yearLevel",
            fieldType: z.string({
                required_error: "Please select your year level"
            }).max(1)
        },
        {
            name: "department",
            fieldType: z.string({
                required_error: "Please select your department"
            })
        },
        {
            name: "course",
            fieldType: z.string({
                required_error: "Please select a course",
            })
        }
    ]
    ParsedSchemaTypes.push(...studentInformation)
    const FormSchema = z.object(
        Object.fromEntries(
            ParsedSchemaTypes.map((field) => [field.name, field.fieldType])
        )
    )

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    if(loading){
        return <LoadingSpinner />
    }
    let departmentSelectContent = []
    departments.forEach(department => {
        departmentSelectContent.push({
            value: department.id.toString(),
            text: department.acronym
        })
    })
    let courseSelectContent = []
    courses.forEach(course => {
        let currentDepartment = form.watch("department")
        if(course.program_department == parseInt(currentDepartment)){
            courseSelectContent.push({
                value: course.program_acronym,
                text: course.program_acronym
            })
        }
    })
    function onSubmit(d: z.infer<typeof FormSchema>){
        console.log(d)
        setButtonContent(<LoadingSpinner />)
        async function submitData(){
            const submitResponse = await insertAnswers(d)
            if(submitResponse.success){
                setButtonContent("Submitted")
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Successfully Submitted Answer"
                })
            } else{
                setButtonContent("Error, Please Report to Admin")
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: submitResponse.message
                })
            }
            setDisabled(true)
        }
        submitData()
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-y-3 flex-1'>
            <Form {...form}>
                <div>
                <FormField
                            control={form.control}
                            name="firstName"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' onChange={field.onChange}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                        <Input type='text' onChange={field.onChange} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="studentNumber"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Student Number</FormLabel>
                                    <Input type='text' onChange={field.onChange} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="yearLevel"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Year Level</FormLabel>
                                    <CustomSelect content={[{value: "1", text:"1st Year"}, {value: "2", text:"2nd Year"}, {value: "3", text:"3rd Year"}, {value: "4", text:"4th Year"}]} placeholder='Select Your Year Level' setter={field.onChange} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="department"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <CustomSelect content={departmentSelectContent} placeholder='Select Your Department' setter={field.onChange}/>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="course"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Course</FormLabel>
                                    <CustomSelect content={courseSelectContent} placeholder='Select Your Course' setter={field.onChange} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                </div>
                <div>
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
                </div>
                <Button type='submit' disabled={disabled}>{buttonContent}</Button>
            </Form>
        </form>
    )
}
