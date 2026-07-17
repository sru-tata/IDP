import {
    Award,
    Flame,
    Target,
    User,
    X
} from "lucide-react";

import ProgressBar from "../ui/ProgressBar";

import { readinessBand, employeeStatusBand } from "../../utils/hrBands";

function EmployeeDetailModal({ employee, onClose }) {

    if (!employee) {

        return null;

    }

    const band = readinessBand(employee.readiness);
    const status = employeeStatusBand(employee.status);

    return (

        <div

            onClick={onClose}

            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/60
                p-6
                backdrop-blur-md
            "

        >

            <div

                onClick={event => event.stopPropagation()}

                className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    border
                    border-zinc-800
                    bg-zinc-950
                    p-8
                    shadow-2xl
                "

            >

                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold">
                            {employee.name.split(" ").map(part => part[0]).join("").slice(0, 2)}
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">
                                {employee.name}
                            </h2>
                            <p className="text-sm text-zinc-500">
                                {employee.role} · {employee.department}
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full bg-zinc-900 p-2 transition hover:bg-zinc-800"
                    >
                        <X size={16}/>
                    </button>

                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                        <Target size={16} className={`mx-auto ${band.color}`}/>
                        <p className="mt-2 text-lg font-bold">{employee.readiness}%</p>
                        <p className="text-xs text-zinc-500">Readiness</p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                        <Flame size={16} className="mx-auto text-orange-400"/>
                        <p className="mt-2 text-lg font-bold">{employee.streak}</p>
                        <p className="text-xs text-zinc-500">Day Streak</p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                        <Award size={16} className="mx-auto text-yellow-400"/>
                        <p className="mt-2 text-lg font-bold">{employee.coursesCompleted}</p>
                        <p className="text-xs text-zinc-500">Completed</p>
                    </div>

                </div>

                <div className="mt-6">
                    <ProgressBar value={employee.readiness} label="Career Readiness" color={band.bar}/>
                </div>

                <div className="mt-6 space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-sm">

                    <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Target Role</span>
                        <span className="font-medium">{employee.targetRole}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Manager</span>
                        <span className="flex items-center gap-2 font-medium">
                            <User size={14}/>
                            {employee.manager}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Total XP</span>
                        <span className="font-medium">{employee.xp.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Status</span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.bg} ${status.color}`}>
                            {employee.status}
                        </span>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default EmployeeDetailModal;
