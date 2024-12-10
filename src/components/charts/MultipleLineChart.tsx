"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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

    const chartConfig = {
        CCIT: {
            label: "CCIT",
            color: "red",
        },
        CAHS: {
            label: "CAHS",
            color: "blue",
        },
        COE: {
            label: "COE",
            color: "orange",
        },
        CBMA: {
            label: "CBMA",
            color: "yellow",
        },
        COPS: {
            label: "COPS",
            color: "purple",
        },
        CASE: {
            label: "CASE",
            color: "green"
        }
    } satisfies ChartConfig
interface LineChartProps {
    monthlyData: any[],
}
export function MultipleLineChart({monthlyData}:LineChartProps) {
  return (
    <Card className="w-[50%]">
      <CardHeader>
        <CardTitle>Monthly Data</CardTitle>
        <CardDescription>2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={monthlyData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.keys(chartConfig).map((key, index) => (
                <Line
                    key={`linechart-${key}`}
                    dataKey={key}
                    type="monotone"
                    stroke={`var(--color-${key})`}
                    strokeWidth={2}
                    dot={true}
                />
            ))}
            
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Monthly Data
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing data for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
