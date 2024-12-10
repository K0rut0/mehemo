"use client"
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function NotAuthenticated() {
    useEffect(() => {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "User has not yet been approved. Please contact the admins for further inquiries"
        })
    })
  return (
    <div className='flex flex-col gap-y-5 w-full h-[100vh] items-center justify-center'>
        <div>
            Error, user has not yet been authenticated
        </div>
        <Link href={"http://localhost:3000/login"}>
            <Button>Back to Login</Button>
        </Link>
    </div>
  )
}
