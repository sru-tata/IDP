import {
    BrainCircuit,
    Bot,
    Cpu,
    Factory,
    ShieldCheck,
    TrendingUp,
    Workflow
} from "lucide-react";

import Card from "../ui/Card";

import { useHR } from "../../context/HRContext";
import { gapImpactBand } from "../../utils/hrBands";

const ICONS = {
    factory: Factory,
    "shield-check": ShieldCheck,
    cpu: Cpu,
    "brain-circuit": BrainCircuit,
    bot: Bot,
    workflow: Workflow
};

function LevelBar({ value, max = 5, color }) {

    return (

        <div className="flex items-center gap-2">

            <div className="h-2 w-28 overflow-hidden rounded-full bg-zinc-800">
                <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${(value / max) * 100}%` }}
                />
            </div>

            <span className="w-8 text-sm text-zinc-400">
                {value.toFixed(1)}
            </span>

        </div>

    );

}

function TeamCompetencyTable() {

    const { competencyOverview } = useHR();

    return (

        <Card className="p-8">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
                        Managers instantly see where capability gaps exist
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                        Team Competency Overview
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        Average skill level by competency, org-wide.
                    </p>
                </div>

            </div>

            <div className="mt-6 overflow-x-auto">

                <table className="w-full min-w-[720px] border-collapse">

                    <thead>
                        <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wider text-zinc-500">
                            <th className="pb-3 pr-4 font-medium">Competency</th>
                            <th className="pb-3 pr-4 font-medium">Avg Current Level</th>
                            <th className="pb-3 pr-4 font-medium">Avg Required Level</th>
                            <th className="pb-3 pr-4 font-medium">Gap</th>
                            <th className="pb-3 pr-4 font-medium">Gap Impact</th>
                            <th className="pb-3 font-medium">Trend</th>
                        </tr>
                    </thead>

                    <tbody>

                        {

                            competencyOverview.map(row => {

                                const Icon = ICONS[row.icon] || Factory;
                                const impact = gapImpactBand(row.impact);

                                return (

                                    <tr
                                        key={row.competency}
                                        className="border-b border-zinc-900 text-sm"
                                    >

                                        <td className="py-4 pr-4">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-blue-400">
                                                    <Icon size={15}/>
                                                </span>
                                                <span className="font-medium">
                                                    {row.competency}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-4 pr-4">
                                            <LevelBar value={row.current} color="bg-violet-500"/>
                                        </td>

                                        <td className="py-4 pr-4">
                                            <LevelBar value={row.required} color="bg-green-500"/>
                                        </td>

                                        <td className="py-4 pr-4 font-semibold">
                                            {row.gap.toFixed(1)}
                                        </td>

                                        <td className="py-4 pr-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${impact.bg} ${impact.color}`}>
                                                {row.impact}
                                            </span>
                                        </td>

                                        <td className="py-4">
                                            <TrendingUp size={16} className="text-green-400"/>
                                        </td>

                                    </tr>

                                );

                            })

                        }

                    </tbody>

                </table>

            </div>

        </Card>

    );

}

export default TeamCompetencyTable;
