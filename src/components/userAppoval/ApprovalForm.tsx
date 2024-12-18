import React, { ReactNode, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Select } from '../ui/select'
import CustomSelect from '../custom/CustomSelect'
import approveUser from '@/utils/custom/superadmin/approveUser'
import { Button } from '../ui/button'
import { toast, useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from '../LoadingSpinner'

const userTypes = [
    {
        text: "Admin",
        value: "admin"
    },
    {
        text: "Super Admin",
        value: "superAdmin"
    },
    {
        text: "None",
        value: "none"
    }
]
interface ApprovalFormParams {
    id: string
}
export default function ApprovalForm({id}: ApprovalFormParams) {
    const [buttonContent, setButtonContent] = useState<ReactNode>("Approve")
    const [adminType, setAdminType] = useState('none')
    async function setUserData(){
        setButtonContent(<LoadingSpinner />)
        const data = await approveUser(id, adminType)
        if(data.sucess){
            toast({
                title: "Approved User for the specified type",
                variant: "success"
            })
            setButtonContent("Approved")
        } else {
            toast({
                title: "An error has occured",
                description: data.message,
                variant: "destructive"
            })
            setButtonContent("Error, try again")
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-green-400'>Approve User</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Approve User</DialogTitle>
                    <DialogDescription>
                        Choose an admin type for the user
                    </DialogDescription>
                </DialogHeader>
                <CustomSelect content={userTypes} placeholder='Approve User' setter={setAdminType} />
                <Button onClick={setUserData}>{buttonContent}</Button>
            </DialogContent>
        </Dialog>
    )
}
