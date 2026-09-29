import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/context/auth-context'
import { dashboardService, type DateRange } from '@/services/dashboard.service'
import type { EnquiryTotals } from '@/types/dashboard'

type Preset = 'all' | 'today' | '7d' | '30d' | '90d' | 'custom'

const PRESETS: { value: Preset; label: string; days?: number }[] = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Today', days: 1 },
  { value: '7d', label: '7 days', days: 7 },
  { value: '30d', label: '30 days', days: 30 },
  { value: '90d', label: '90 days', days: 90 },
  { value: 'custom', label: 'Custom' },
]

const KPIS: { key: keyof EnquiryTotals; label: string }[] = [
  { key: 'all_time', label: 'Total enquiries' },
  { key: 'today', label: 'Today' },
  { key: 'last_7_days', label: 'Last 7 days' },
  { key: 'last_30_days', label: 'Last 30 days' },
]

const toDateInput = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const presetRange = (days?: number): DateRange => {
  if (!days) return {}
  const from = new Date()
  from.setDate(from.getDate() - (days - 1))
  return { from: toDateInput(from), to: toDateInput(new Date()) }
}

export function DashboardPage() {
  const { user } = useAuth()
  const [preset, setPreset] = useState<Preset>('30d')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const range: DateRange =
    preset === 'custom'
      ? { from: from || undefined, to: to || undefined }
      : presetRange(PRESETS.find((p) => p.value === preset)?.days)

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'enquiries', range],
    queryFn: () => dashboardService.enquiryStats(range),
    placeholderData: keepPreviousData,
  })

  const rangeLabel = PRESETS.find((p) => p.value === preset)?.label
  const chartData = data?.by_form.filter((f) => f.count > 0) ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user?.name}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map(({ key, label }) => (
          <Card key={key}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">
                {isLoading ? '…' : (data?.totals[key] ?? 0).toLocaleString()}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((p) => (
          <Button
            key={p.value}
            size="sm"
            variant={preset === p.value ? 'default' : 'outline'}
            onClick={() => setPreset(p.value)}
          >
            {p.label}
          </Button>
        ))}
        {preset === 'custom' && (
          <>
            <Input type="date" className="w-40" title="From" value={from} max={to || undefined} onChange={(e) => setFrom(e.target.value)} />
            <span className="text-sm text-muted-foreground">to</span>
            <Input type="date" className="w-40" title="To" value={to} min={from || undefined} onChange={(e) => setTo(e.target.value)} />
          </>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Enquiries by form</CardTitle>
            <CardDescription>
              {(data?.totals.in_range ?? 0).toLocaleString()} enquiries · {rangeLabel}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!chartData.length ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                {isLoading ? 'Loading...' : 'No enquiries in this period'}
              </p>
            ) : (
              <div style={{ height: Math.max(160, chartData.length * 44) }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
                    <CartesianGrid horizontal={false} stroke="var(--border)" />
                    <XAxis type="number" allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                    <YAxis type="category" dataKey="name" width={140} tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                    <Tooltip
                      cursor={{ fill: 'var(--muted)' }}
                      contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: 'var(--popover-foreground)' }}
                      itemStyle={{ color: 'var(--popover-foreground)' }}
                    />
                    <Bar dataKey="count" name="Enquiries" fill="var(--primary)" radius={[0, 4, 4, 0]} maxBarSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Form breakdown</CardTitle>
            <CardDescription>{rangeLabel}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Form</TableHead>
                  <TableHead className="text-right">Enquiries</TableHead>
                  <TableHead className="text-right">Share</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!data?.by_form.length ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      {isLoading ? 'Loading...' : 'No forms found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  data.by_form.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>
                        <Link to={`/forms/${f.id}`} className="font-medium hover:underline">
                          {f.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{f.count.toLocaleString()}</TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        {data.totals.in_range ? `${Math.round((f.count / data.totals.in_range) * 100)}%` : '—'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent enquiries</CardTitle>
          <CardDescription>Latest submissions · {rangeLabel}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Form</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!data?.recent.length ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    {isLoading ? 'Loading...' : 'No enquiries found'}
                  </TableCell>
                </TableRow>
              ) : (
                data.recent.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.phone}</TableCell>
                    <TableCell>
                      <Link to={`/forms/${e.form.id}`} className="hover:underline">
                        {e.form.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{new Date(e.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
