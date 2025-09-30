'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, DollarSign } from 'lucide-react'

interface RevenueChartProps {
  data?: any[]
  type?: 'bar' | 'line' | 'pie'
  title?: string
  description?: string
}

export function RevenueChart({ data, type = 'bar', title = 'Ingresos por Mes', description = 'Evolución de ingresos en los últimos 12 meses' }: RevenueChartProps) {
  const defaultData = [
    { month: 'Ene', tournaments: 120000, travels: 180000, total: 300000 },
    { month: 'Feb', tournaments: 150000, travels: 220000, total: 370000 },
    { month: 'Mar', tournaments: 180000, travels: 250000, total: 430000 },
    { month: 'Abr', tournaments: 200000, travels: 280000, total: 480000 },
    { month: 'May', tournaments: 160000, travels: 240000, total: 400000 },
    { month: 'Jun', tournaments: 190000, travels: 300000, total: 490000 },
    { month: 'Jul', tournaments: 220000, travels: 320000, total: 540000 },
    { month: 'Ago', tournaments: 210000, travels: 310000, total: 520000 },
    { month: 'Sep', tournaments: 240000, travels: 350000, total: 590000 },
    { month: 'Oct', tournaments: 260000, travels: 380000, total: 640000 },
    { month: 'Nov', tournaments: 280000, travels: 400000, total: 680000 },
    { month: 'Dic', tournaments: 300000, travels: 450000, total: 750000 },
  ]

  const pieData = [
    { name: 'Torneos', value: 2850000, color: '#10b981' },
    { name: 'Viajes', value: 4200000, color: '#3b82f6' },
    { name: 'Otros', value: 950000, color: '#f59e0b' },
  ]

  const chartData = data || defaultData
  const chartConfig = {
    tournaments: { label: 'Torneos', color: '#10b981' },
    travels: { label: 'Viajes', color: '#3b82f6' },
    total: { label: 'Total', color: '#8b5cf6' },
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ChartContainer config={chartConfig}>
            <LineChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="total" stroke={chartConfig.total.color} strokeWidth={3} dot={{ fill: chartConfig.total.color, strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ChartContainer>
        )
      case 'pie':
        return (
          <ChartContainer config={chartConfig}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }: any) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{d.name}</p>
                        <p className="text-sm text-muted-foreground">${d.value.toLocaleString()}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ChartContainer>
        )
      default:
        return (
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="tournaments" fill={chartConfig.tournaments.color} radius={[4, 4, 0, 0]} />
              <Bar dataKey="travels" fill={chartConfig.travels.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )
    }
  }

  const totalRevenue = chartData.reduce((sum, item) => sum + (item.total || 0), 0)
  const averageRevenue = totalRevenue / chartData.length
  const growth = chartData.length > 1 ? ((chartData[chartData.length - 1].total - chartData[0].total) / chartData[0].total) * 100 : 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
          <span className="text-emerald-600 font-medium">+{growth.toFixed(1)}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
        {type !== 'pie' && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">${averageRevenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Promedio</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">+{growth.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">Crecimiento</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


