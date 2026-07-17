import {
    BookOpen,
    Briefcase,
    Sparkles
} from "lucide-react";

import Card from "../ui/Card";

import { useHR } from "../../context/HRContext";

function DepartmentEEEEngagement() {

    const { departments, eeeEngagement } = useHR();

    const rows = eeeEngagement.map(row => ({

        ...row,
        department: departments.find(d => d.id === row.departmentId)?.name ?? row.departmentId

    }));

    return (

        <Card className="p-8">

            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
                    Education · Experience · Exposure
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                    Department EEE Engagement
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                    How each department is actually growing - not just how ready they are.
                </p>
            </div>

            <div className="mt-6 space-y-4">

                {

                    rows.map(row => (

                        <div key={row.departmentId}>

                            <div className="mb-2 flex items-center justify-between text-sm">
                                <span className="font-medium">{row.department}</span>
                            </div>

                            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-800">
                                <div className="bg-blue-500" style={{ width: `${row.education}%` }}/>
                                <div className="bg-amber-500" style={{ width: `${row.experience}%` }}/>
                                <div className="bg-pink-500" style={{ width: `${row.exposure}%` }}/>
                            </div>

                        </div>

                    ))

                }

            </div>

            <div className="mt-6 flex flex-wrap gap-5 border-t border-zinc-800 pt-5 text-xs text-zinc-500">

                <span className="flex items-center gap-2">
                    <BookOpen size={12} className="text-blue-400"/>
                    Education
                </span>

                <span className="flex items-center gap-2">
                    <Briefcase size={12} className="text-amber-400"/>
                    Experience
                </span>

                <span className="flex items-center gap-2">
                    <Sparkles size={12} className="text-pink-400"/>
                    Exposure
                </span>

            </div>

        </Card>

    );

}

export default DepartmentEEEEngagement;
