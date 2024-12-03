"use server"
import { User } from "@/types/database/user"
import { createClient } from "@/utils/supabase/server"

interface ApproveUserParams {
    id: string,
    type: string
}

export default async function approveUser(id: string, type: string): Promise<{
    sucess: boolean,
    message: string,
}>{
    const updatedData = {
        adminType: type,
        isApproved: false
    }
    if(type == 'none'){
        updatedData.isApproved = false
    } else {
        updatedData.isApproved = true
    }
    const client = await createClient()
    const {data, error} = await client.from("admin_users").update(updatedData).eq('id', id).select()
    if(error){
        console.log(error.message)
        return {
            sucess: false,
            message: error.message
        }
    }
    console.log(data)
    return {
        sucess: true,
        message: "none",
    }
}