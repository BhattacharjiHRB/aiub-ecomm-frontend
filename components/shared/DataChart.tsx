"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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


const chartData = [
  { month: "January", activity: 186 },
  { month: "February", activity: 198 },
  { month: "March", activity: 150 },
  { month: "April", activity: 173 },
  { month: "May", activity: 190 },
  { month: "June", activity: 204 },
  { month: "july", activity: 186 },
  { month: "August", activity: 198 },
  { month: "September", activity: 150 },
  { month: "October", activity: 173 },
  { month: "November", activity: 190 },
  { month: "December", activity: 204 },
]

const chartConfig = {
  activity: {
    label: "activity",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function DataChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>
          According to the activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="activity"
              type="natural"
              fill="var(--color-activity)"
              fillOpacity={0.4}
              stroke="var(--color-activity)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
