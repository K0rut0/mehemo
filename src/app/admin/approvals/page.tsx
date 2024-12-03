"use client"
import LoadingSpinner from '@/components/LoadingSpinner'
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
        setUsers([])
        setLoading(false)
        return
      }
      setUsers(data.data)
      setLoading(false)
    }
    getUserData()
  }, [])
  if(loading){
    return <LoadingSpinner />
  }
  
  return (
    <UserDataTable columns={UserApprovalColumn} data={users} />
  )
}
