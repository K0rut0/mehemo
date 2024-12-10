"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { login } from "@/utils/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AdminLogin() {
  const [buttonContent, setButtonContent] = useState<ReactNode>("Login")
  const FormSchema = z.object({
    email: z
      .string({
        required_error: "Please enter your email",
      })
      .email(),
    password: z
      .string({
        required_error: "Please enter your password",
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  async function loginUser(d){
    setButtonContent(<LoadingSpinner />)
    const loginRes = await login(d)
    if(!loginRes.success){
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please check your credentials and try again"
      })
      setButtonContent("Login")
    }
  }
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-green-100">
      
      <div className="absolute inset-0">
        <div className="absolute bottom-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
            fill="url(#gradient)"
          >
            <defs>
              <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#0033cc" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gradient)"
              fillOpacity="1"
              d="M0,224L40,240C80,256,160,288,240,293.3C320,299,400,277,480,245.3C560,213,640,171,720,144C800,117,880,107,960,128C1040,149,1120,203,1200,224C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(loginUser)}
        className="relative z-10 flex flex-col items-center w-full max-w-[360px] p-8 space-y-6"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          border: "2px solid rgba(0, 102, 255, 0.8)",
          borderRadius: "15px",
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.37)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h2 className="text-2xl font-helvetica font-bold text-black mb-4">MeHeMo</h2>

        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black">Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    onChange={field.onChange}
                    className="w-full p-3 text-sm bg-transparent border border-blue-400 rounded-xl text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                    placeholder="username"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    onChange={field.onChange}
                    className="w-full p-3 text-sm bg-transparent border border-blue-400 rounded-xl text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                    placeholder="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>

        <Button
          type="submit"
          className="w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:scale-105 transition duration-300 ease-in-out"
        >
          {buttonContent}
        </Button>
      </form>
    </div>
  );
}