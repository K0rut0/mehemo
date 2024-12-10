"use client"

import { LoadingSpinner } from '@/components/LoadingSpinner'
import { UserApprovalColumn } from '@/components/userAppoval/columns'
import { UserDataTable } from '@/components/userAppoval/data-table'
import { User } from '@/types/database/user'
import getUserSignups from '@/utils/custom/superadmin/getUserSignups'
import React, { useEffect, useState } from 'react'

export default function Approvals() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>()

  useEffect(() =>{
    async function getUserData(){
      const data = await getUserSignups()
      if(!data.sucess){
        console.log("An error occured while retrieving users")
        setUsers([])  // set to empty array in case of error
        setLoading(false)
        return
      }
      setUsers(data.data)
      setLoading(false)
    }
    getUserData()
  }, [])

  if(loading){
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen overflow-hidden">
      <div className="max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-lg overflow-hidden">
    
        <h1 className="text-3xl font-bold text-center text-dark-blue mb-6">User Approval</h1>

        <UserDataTable columns={UserApprovalColumn} data={users} />
      </div>
    </div>
  )
}
