"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/utils/auth/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignUp() {
  const FormSchema = z.object({
    email: z
      .string({
        required_error: "Please enter your email",
      })
      .email(),
    firstName: z
      .string({
        required_error: "Please state your first name",
      }),
    lastName: z
      .string({
        required_error: "Please state your last name",
      }),
    password: z
      .string({
        required_error: "Please enter your password",
      }),
    confirmPassword: z
      .string({
        required_error: "Please enter your password",
      }),
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-green-100">
      
      {/* Background */}
      <div className="absolute inset-0">
        
        {/* le fuckin wave */}
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

      {/* sign-Up */}
      <form
        onSubmit={form.handleSubmit(signUp)}
        className="relative z-10 flex flex-col items-center w-full max-w-md p-6 space-y-6"
        style={{
          background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
          border: "2px solid rgba(0, 102, 255, 0.8)", // Blue border outline
          borderRadius: "15px", // Rounded corners
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.37)", // Glassmorphism shadow
          backdropFilter: "blur(8px)", // Blur effect
          WebkitBackdropFilter: "blur(8px)",
          transition: "all 0.3s ease-in-out", // transitions
        }}
      >
        <h2 className="text-2xl font-semibold text-black">Sign Up</h2>

        <Form {...form}>

          {/* Email Field */}
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
                    placeholder="sample@firstasia.edu.ph"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First at last Name */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      onChange={field.onChange}
                      className="w-full p-3 text-sm bg-transparent border border-blue-400 rounded-xl text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                      placeholder="Juan"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      onChange={field.onChange}
                      className="w-full p-3 text-sm bg-transparent border border-blue-400 rounded-xl text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                      placeholder="Dela Cruz"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Password fields */}
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    onChange={field.onChange}
                    className="w-full p-3 text-sm bg-transparent border border-blue-400 rounded-xl text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:scale-105 transition duration-300 ease-in-out"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
