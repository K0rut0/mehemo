"use client"
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { TestChart } from '@/components/charts/TestChart'
import { DepartmentAverage } from '@/types/analytics/departmentAverages'
import getDepartmentAverages from '@/utils/custom/analytics/getDepartmentAverages'
import { ChartConfig } from '@/components/ui/chart'
import { ProcessedResponse } from '@/types/database/processedResponses'
import getProcessedResponses from '@/utils/custom/analytics/getProcessedResponses'
import { DataTable } from '@/components/responses/data-table'
import { ProcessedResponseColumns } from '@/components/responses/columns'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { MultipleLineChart } from '@/components/charts/MultipleLineChart'
import getMonthlyAverages from '@/utils/custom/analytics/getMonthlyAverages'
import refreshMonthlyTable from '@/utils/custom/analytics/refreshMonthlyTable'
import { MonthlyAverage } from '@/types/database/monthly_average'
export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [departmentData, setDepartmentData] = useState<DepartmentAverage[] | null>()
  const [monthlyData, setMonthlyData] = useState<any>(null)
  const [responseData, setResponseData] = useState<ProcessedResponse[] | null>()
  const [barConfig, setBarConfig] = useState<Object | null>()
  const [lineConfig, setLineConfig] = useState<Object | null>()
  useEffect(() => {
    async function getCurrentUser(){
      getMonthlyAverages()
      const client = await createClient()
      const { error, data: { user } } = await client.auth.getUser()
      if(error){
        console.log(error)
        return <div>an error has occured</div>
      }
      setUser(user)
      const currentData = await getDepartmentAverages()
      const monthlyDatas = await getMonthlyAverages()
      
      setMonthlyData(monthlyDatas.data)
      setDepartmentData(currentData)
      let barsConfig = {
        average: {
          label: "Average"
        }
      } satisfies ChartConfig
      currentData.forEach(data => {
        barsConfig[data.department] = {
          label: data.department
        }
      })
      setBarConfig(barsConfig)
      
      
      
      const resData = await getProcessedResponses()
      setResponseData(resData)
      refreshMonthlyTable()
      console.log(monthlyDatas.data)
      setLoading(false)
    }
    
    getCurrentUser()
  }, [])
  if(loading){
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className='flex flex-col gap-3 p-10'>
      <div className='flex flex-row gap-x-5 w-full'>
        <TestChart departmentData={departmentData} config={barConfig as ChartConfig}/>
        <MultipleLineChart monthlyData={monthlyData}/>
      </div>
      <DataTable columns={ProcessedResponseColumns} data={responseData} />
    </div>
  )
}
