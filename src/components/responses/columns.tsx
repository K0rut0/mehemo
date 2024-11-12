"use client";

import { ProcessedResponse } from "@/types/database/processedResponses";
import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button";

export const ProcessedResponseColumns: ColumnDef<ProcessedResponse>[] = [
    {
        accessorKey: "id",
        header: "Response ID",
    },
    {
        accessorKey: "user_email",
        header: "Student Number"
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

]