import { useSearchParams } from "react-router-dom";

import { useHR } from "../../context/HRContext";

import EmployeeTable from "../../components/hr/EmployeeTable";

function HREmployees() {

    const { loading } = useHR();

    const [searchParams] = useSearchParams();

    const initialDepartment = searchParams.get("department") || "All";

    if (loading) {

        return (

            <div className="flex h-full items-center justify-center py-24 text-zinc-500">
                Loading employee directory...
            </div>

        );

    }

    return (

        <div className="mx-auto max-w-[1850px] space-y-6 px-8 py-8">

            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
                    Workforce
                </p>
                <h1 className="mt-2 text-3xl font-bold">
                    Employee Directory
                </h1>
                <p className="mt-2 text-zinc-500">
                    Search and drill into any employee's readiness, target
                    role and learning activity.
                </p>
            </div>

            <EmployeeTable initialDepartment={initialDepartment}/>

        </div>

    );

}

export default HREmployees;
