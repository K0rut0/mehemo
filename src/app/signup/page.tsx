"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUp } from '@/utils/auth/signUp'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function SignUp() {
    const FormSchema = z.object({
        email: z.string({
            required_error: "Please enter your email"
        }).email(),
        firstName: z.string({
            required_error: "Please state your first name"
        }),
        lastName: z.string({
            required_error: "Please state your last name"
        }),
        password: z.string({
            required_error: "Please enter your password"
        }),
        confirmPassword: z.string({
            required_error: "Please enter your password"
        })
    }).superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
          ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
          });
        }
      });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    return (
        <div className='flex max-w-[360px] md:max-w-[480px]'>
            <form onSubmit={form.handleSubmit(signUp)}>
                <Form {...form}>
                    <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='text' onChange={field.onChange} placeholder='sample@firstasia.edu.ph'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="firstName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input type='text' onChange={field.onChange} placeholder='Juan'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="lastName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input type='text' onChange={field.onChange} placeholder='Dela Cruz'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type='password' onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </Form>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}
