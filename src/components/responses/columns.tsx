"use client";

import { ProcessedResponse } from "@/types/database/processedResponses";
import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button";
import Link from "next/link";

export const ProcessedResponseColumns: ColumnDef<ProcessedResponse>[] = [
    {
        accessorKey: "id",
        header: "Response ID",
    },
    {
        accessorKey: "user_email",
        header: "Student Number",
        cell: ({row}) => {
            function mailUser(){
                const studentNumber = row.getValue("user_email")
                window.open(`mailto:${studentNumber}@firstasia.edu.ph`)
            }
            return (
                <div>
                    <Button onClick={mailUser}>Email Student:   {row.getValue("user_email")}</Button>
                </div>
            )
        }
    },
    {
        accessorKey: "summed_result",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Total Score
                    <ArrowUpDown className="ml-2 h-4 w-4 " />
                </Button>
            )
        },  
        cell: ({row}) => {
            return row.getValue("summed_result")
        }
    },
    {
        header: "Interpretation",
        cell: ({row}) => {
            const result = parseInt(row.getValue("summed_result"))
            if(result <= 12){
                return <div className="text-green-400">Normal</div>
            } else if(result > 12 && result < 25){
                return <div className="text-orange-400">At Risk</div>
            } else {
                return <div className="text-red-400">At Severe Risk</div>
            }
        }
    },
    {
        accessorKey: "user_name",
        header: "Name"
    },
    {
        accessorKey: "user_department",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Department
                    <ArrowUpDown className="ml-2 h-4 w-4 " />
                </Button>
            )
        },
    },
    {
        accessorKey: "user_program",
        header: "Program"
    },
    {
        id: "individual_response",
        header: "View Response",
        cell: ({row}) => {
            const data = row.original
            const params = {
                date_answered: data.date_answered,
                user_email: data.user_email,
                userName: data.user_name
            }
            return(
                <Link href={{pathname: 'admin/responses', query: {data: JSON.stringify(params)}}}><Button>View Response</Button></Link>
            )
        }
    }

]