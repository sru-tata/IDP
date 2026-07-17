import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

import Card from "../ui/Card";

import { useHR } from "../../context/HRContext";

function ChartTooltip({ active, payload, label }) {

    if (!active || !payload?.length) {

        return null;

    }

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm shadow-xl">

            <p className="font-semibold">{label}</p>

            <p className="mt-1 text-blue-400">
                {payload[0].value}% avg readiness
            </p>

        </div>

    );

}

function ReadinessTrendChart() {

    const { readinessTrend } = useHR();

    return (

        <Card className="p-8">

            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
                    Tracking Impact Over Time
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                    Org-Wide Skill Readiness
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                    We don't just show current skill readiness — we track
                    how workforce capability changes.
                </p>
            </div>

            <div className="mt-6 h-72 w-full">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart data={readinessTrend} margin={{ left: -20, right: 10, top: 10 }}>

                        <defs>
                            <linearGradient id="readinessFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35}/>
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false}/>

                        <XAxis
                            dataKey="month"
                            stroke="#71717a"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                        />

                        <YAxis
                            stroke="#71717a"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                            domain={[40, 90]}
                            tickFormatter={value => `${value}%`}
                        />

                        <Tooltip content={<ChartTooltip/>}/>

                        <Area
                            type="monotone"
                            dataKey="readiness"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="url(#readinessFill)"
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

}

export default ReadinessTrendChart;
