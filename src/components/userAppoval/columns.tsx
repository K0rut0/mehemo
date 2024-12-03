"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "@/types/database/user";
import ApprovalForm from "./ApprovalForm";

export const UserApprovalColumn: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "User ID"
    },
    {
        accessorKey: "email",
        header: "User Email"
    },
    {
        accessorKey: "firstName",
        header: "First Name"
    },
    {
        accessorKey: "lastName",
        header: "Last Name"
    },
    {
        accessorKey: "isApproved",
        header: "Status",
        cell: ({row}) =>{
            const state = row.getValue("isApproved")
            if(state){
                return <div className="text-green-500">Approved</div>
            } else {
                return <div className="text-red-500">Not Approved</div>
            }
        }
    },
    {
        accessorKey: "adminType",
        header: "Admin Type"
    },
    {
        header: "Approve User",
        cell: ({row}) => {
            return <ApprovalForm id={row.getValue("id")}/>
        }
    }

]