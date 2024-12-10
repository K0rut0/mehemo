import { createClient } from "./utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import {User} from "./types/database/user"

export async function middleware(request: NextRequest){
    const client = await createClient()
    const {
        data: userData,
        error: authError,
    } = await client.auth.getUser()
    if(authError){
        console.log(authError)
        return NextResponse.redirect("http://localhost:3000/login")
    }
    console.log("triggered by: ", request.nextUrl.pathname)
    const {
        data: userRoleInfo,
        error: userRoleInfoError
    } = await client.from('admin_users').select("*").eq('id', userData.user.id).single()
    if(userRoleInfoError){
        console.log(userRoleInfoError)
        return NextResponse.redirect("http://localhost:3000/not-authenticated")
        
    }
    if(!userRoleInfo.isApproved || userRoleInfo.adminType == 'none'){
        return NextResponse.redirect("http://localhost:3000/not-authenticated")
    }
}

export const config = {
    matcher: [
        '/admin',
        '/admin/:path*'
    ],
  };