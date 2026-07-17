import {
    Search
} from "lucide-react";

import {
    useEffect,
    useMemo,
    useState
} from "react";

import Card from "../ui/Card";
import EmployeeDetailModal from "./EmployeeDetailModal";

import { useHR } from "../../context/HRContext";
import { readinessBand, employeeStatusBand } from "../../utils/hrBands";

function EmployeeTable({ initialDepartment = "All" }) {

    const { employees, departments } = useHR();

    const [

        query,

        setQuery

    ] = useState("");

    const [

        departmentFilter,

        setDepartmentFilter

    ] = useState(initialDepartment);

    useEffect(() => {

        setDepartmentFilter(initialDepartment);

    }, [initialDepartment]);

    const [

        selectedEmployee,

        setSelectedEmployee

    ] = useState(null);

    const filtered = useMemo(() => {

        const text = query.trim().toLowerCase();

        return employees.filter(employee => {

            const matchesDepartment =
                departmentFilter === "All" ||
                employee.department === departmentFilter;

            const matchesQuery =
                !text ||
                employee.name.toLowerCase().includes(text) ||
                employee.role.toLowerCase().includes(text) ||
                employee.manager.toLowerCase().includes(text);

            return matchesDepartment && matchesQuery;

        });

    }, [

        employees,

        query,

        departmentFilter

    ]);

    return (

        <Card className="p-8">

            <div className="flex flex-wrap items-center justify-between gap-4">

                <div>
                    <h2 className="text-2xl font-bold">
                        Employee Directory
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        {filtered.length} of {employees.length} employees
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">

                    <div className="relative">

                        <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"/>

                        <input

                            value={query}
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Search name, role, manager..."
                            className="w-64 rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500"

                        />

                    </div>

                    <select

                        value={departmentFilter}
                        onChange={event => setDepartmentFilter(event.target.value)}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500"

                    >

                        <option value="All">All Departments</option>

                        {

                            departments.map(department => (

                                <option key={department.id} value={department.name}>
                                    {department.name}
                                </option>

                            ))

                        }

                    </select>

                </div>

            </div>

            <div className="mt-6 overflow-x-auto">

                <table className="w-full min-w-[760px] border-collapse">

                    <thead>
                        <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wider text-zinc-500">
                            <th className="pb-3 pr-4 font-medium">Employee</th>
                            <th className="pb-3 pr-4 font-medium">Department</th>
                            <th className="pb-3 pr-4 font-medium">Target Role</th>
                            <th className="pb-3 pr-4 font-medium">Readiness</th>
                            <th className="pb-3 font-medium">Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {

                            filtered.map(employee => {

                                const band = readinessBand(employee.readiness);
                                const status = employeeStatusBand(employee.status);

                                return (

                                    <tr

                                        key={employee.id}

                                        onClick={() => setSelectedEmployee(employee)}

                                        className="
                                            cursor-pointer
                                            border-b
                                            border-zinc-900
                                            text-sm
                                            transition
                                            hover:bg-zinc-900
                                        "

                                    >

                                        <td className="py-4 pr-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold">
                                                    {employee.name.split(" ").map(part => part[0]).join("").slice(0, 2)}
                                                </div>

                                                <div>
                                                    <p className="font-medium">{employee.name}</p>
                                                    <p className="text-xs text-zinc-500">{employee.role}</p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="py-4 pr-4 text-zinc-400">
                                            {employee.department}
                                        </td>

                                        <td className="py-4 pr-4 text-zinc-400">
                                            {employee.targetRole}
                                        </td>

                                        <td className="py-4 pr-4">
                                            <span className={`font-semibold ${band.color}`}>
                                                {employee.readiness}%
                                            </span>
                                        </td>

                                        <td className="py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.bg} ${status.color}`}>
                                                {employee.status}
                                            </span>
                                        </td>

                                    </tr>

                                );

                            })

                        }

                        {

                            filtered.length === 0 && (

                                <tr>
                                    <td colSpan={5} className="py-10 text-center text-zinc-500">
                                        No employees match your search.
                                    </td>
                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>

            <EmployeeDetailModal

                employee={selectedEmployee}

                onClose={() => setSelectedEmployee(null)}

            />

        </Card>

    );

}

export default EmployeeTable;
