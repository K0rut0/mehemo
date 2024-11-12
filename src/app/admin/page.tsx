"use client"
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import LoadingSpinner from '@/components/LoadingSpinner'
import { TestChart } from '@/components/charts/TestChart'
import { DepartmentAverage } from '@/types/analytics/departmentAverages'
import getDepartmentAverages from '@/utils/custom/analytics/getDepartmentAverages'
import { ChartConfig } from '@/components/ui/chart'
import { ProcessedResponse } from '@/types/database/processedResponses'
import getProcessedResponses from '@/utils/custom/analytics/getProcessedResponses'
import { DataTable } from '@/components/responses/data-table'
import { ProcessedResponseColumns } from '@/components/responses/columns'
export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [departmentData, setDepartmentData] = useState<DepartmentAverage[] | null>()
  const [responseData, setResponseData] = useState<ProcessedResponse[] | null>()
  const [barConfig, setBarConfig] = useState<Object | null>()
  useEffect(() => {
    async function getCurrentUser(){
      const client = await createClient()
      const { error, data: { user } } = await client.auth.getUser()
      if(error){
        console.log(error)
        return <div>an error has occured</div>
      }
      setUser(user)
      const data = await getDepartmentAverages()
      setDepartmentData(data)
      let config = {
        average: {
          label: "Average"
        }
      } satisfies ChartConfig
      data.forEach(data => {
        config[data.department] = {
          label: data.department
        }
      })
      setBarConfig(config)
      const resData = await getProcessedResponses()
      setResponseData(resData)
      console.log(resData)
      setLoading(false)
    }
   

    getCurrentUser()
  }, [])
  if(loading){
    return <LoadingSpinner />
  }
  return (
    <div className='flex flex-col gap-3 p-10'>
      <TestChart departmentData={departmentData} config={barConfig as ChartConfig}/>
      <DataTable columns={ProcessedResponseColumns} data={responseData} />
    </div>
  )
}
