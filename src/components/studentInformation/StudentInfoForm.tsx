"use client"
import React, { SetStateAction, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Test from '../Test'
import { Course } from '@/types/database/courses'
import getCourses from '@/utils/custom/courses/getCourses'
import { LoadingSpinner } from '../LoadingSpinner'
import CustomSelect from '../custom/CustomSelect'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import getDepartments from '@/utils/custom/departments/getDepartments'
import { Department } from '@/types/database/departments'
import { StudentInfoData } from '@/types/form/studentInformation'

interface StudentInfoFormProps {
    setter: React.Dispatch<SetStateAction<StudentInfoData>>
    setEnabled: React.Dispatch<SetStateAction<boolean>>
}

export default function StudentInfoForm({setter, setEnabled}:StudentInfoFormProps) {
    const [loading, setLoading] = useState(true)
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
    const FormSchema = z.object({
        firstName: z.string({
            required_error: "Please enter your first name"
        }).min(1, {
            message: "Please enter your first name"
        }),
        lastName: z.string({
            required_error: "Please enter your last name"
        }).min(1, {
            message: "Please enter your last name"
        }),
        studentNumber: z.string({
            required_error: "Please enter your student number"
        }).min(11, "Please state your student number"),
        yearLevel: z.string({
            required_error: "Please select your year level"
        }).max(1),
        department: z.string({
            required_error: "Please select your department"
        }),
        course: z.string({
            required_error: "Please select a course",
        }),
    })
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
        setter(d as StudentInfoData)
        console.log(d)
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-y-3 flex-1 max-h-[500px]'>
                    <Form {...form}>
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
                    </Form>
                    <Button type='submit'>Done</Button>
        </form>
    )
}
