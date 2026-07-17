import {
    ArrowDown,
    ArrowUp,
    Bot,
    Cpu,
    Factory,
    ShieldCheck,
    Workflow
} from "lucide-react";

import Card from "../ui/Card";

import { useHR } from "../../context/HRContext";
import { readinessBand } from "../../utils/hrBands";

const ICONS = {
    factory: Factory,
    "shield-check": ShieldCheck,
    cpu: Cpu,
    bot: Bot,
    workflow: Workflow
};

function DepartmentReadinessTable({ onSelectDepartment }) {

    const { departments } = useHR();

    return (

        <Card className="p-8">

            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
                    HR can quickly identify departments requiring focused development
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                    Department Skill Readiness
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Overall skill readiness by department.
                </p>
            </div>

            <div className="mt-6 space-y-2">

                {

                    departments.map(department => {

                        const Icon = ICONS[department.icon] || Factory;
                        const band = readinessBand(department.readiness);
                        const up = department.trend === "up";

                        return (

                            <button

                                key={department.id}

                                onClick={() => onSelectDepartment?.(department)}

                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-4
                                    rounded-2xl
                                    px-4
                                    py-3
                                    text-left
                                    transition
                                    hover:bg-zinc-900
                                "

                            >

                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-blue-400">
                                    <Icon size={16}/>
                                </span>

                                <span className="w-32 shrink-0 font-medium">
                                    {department.name}
                                </span>

                                <span className="w-12 shrink-0 text-sm font-semibold">
                                    {department.readiness}%
                                </span>

                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
                                    <div
                                        className={`h-full rounded-full ${band.bar}`}
                                        style={{ width: `${department.readiness}%` }}
                                    />
                                </div>

                                <span
                                    className={`
                                        flex
                                        w-20
                                        shrink-0
                                        items-center
                                        justify-end
                                        gap-1
                                        text-sm
                                        font-medium
                                        ${up ? "text-green-400" : "text-red-400"}
                                    `}
                                >
                                    {
                                        up
                                            ? <ArrowUp size={14}/>
                                            : <ArrowDown size={14}/>
                                    }
                                    {Math.abs(department.qoqChange)}%
                                </span>

                            </button>

                        );

                    })

                }

            </div>

            <div className="mt-6 flex flex-wrap gap-5 border-t border-zinc-800 pt-5 text-xs text-zinc-500">

                <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"/>
                    80%+ (Excellent)
                </span>

                <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-lime-500"/>
                    60–79% (Good)
                </span>

                <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500"/>
                    40–59% (Needs Focus)
                </span>

                <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"/>
                    &lt;40% (At Risk)
                </span>

            </div>

        </Card>

    );

}

export default DepartmentReadinessTable;
