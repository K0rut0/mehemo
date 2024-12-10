"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DepartmentAverage } from "@/types/analytics/departmentAverages"
const chartData = [
  { browser: "chrome", visitors: 275},
  { browser: "safari", visitors: 200},
  { browser: "firefox", visitors: 187,},
  { browser: "edge", visitors: 173, fill: "violet"},
  { browser: "other", visitors: 90, fill: "red"},
]



interface BarChartProps {
    departmentData: DepartmentAverage[],
    config: ChartConfig
}

export function TestChart({departmentData, config}:BarChartProps) {
  return (
    <Card className="w-[50%]">
      <CardHeader>
        <CardTitle>Total Data</CardTitle>
        <CardDescription>2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={departmentData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="department"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="average" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="average" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Chart showing score averages per department
        </div>
        <div className="leading-none text-muted-foreground">
          Showing results for current questionnaire
        </div>
      </CardFooter>
    </Card>
  )
}
