"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { login } from '@/utils/auth/login'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function AdminLogin() {
  const FormSchema = z.object({
    email: z.string({
      required_error: "Please enter your email"
    }).email(),
    password: z.string({
      required_error: "Please enter your password"
    })
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  return (
    <div className='flex max-w-[360px] md:max-w-[480px]'>
      <form onSubmit={form.handleSubmit(login)}>
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='text' onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type='password' onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
        <Button type='submit'>Login</Button>
      </form>
    </div>
  )
}
