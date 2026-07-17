import { useNavigate } from "react-router-dom";

import { useHR } from "../../context/HRContext";

import HRHero from "../../components/hr/HRHero";
import TeamCompetencyTable from "../../components/hr/TeamCompetencyTable";
import DepartmentReadinessTable from "../../components/hr/DepartmentReadinessTable";
import DepartmentChallengesCard from "../../components/hr/DepartmentChallengesCard";

function HRDashboard() {

    const navigate = useNavigate();

    const { loading, orgStats } = useHR();

    if (loading || !orgStats) {

        return (

            <div className="flex h-full items-center justify-center py-24 text-zinc-500">
                Loading workforce analytics...
            </div>

        );

    }

    return (

        <div className="mx-auto max-w-[1850px] space-y-6 px-8 py-8">

            <HRHero />

            <section className="grid grid-cols-12 gap-6">

                <div className="col-span-12">
                    <TeamCompetencyTable />
                </div>

            </section>

            <section className="grid grid-cols-12 gap-6 items-stretch">

                <div className="col-span-7">
                    <DepartmentReadinessTable

                        onSelectDepartment={department =>
                            navigate(`/hr/employees?department=${encodeURIComponent(department.name)}`)
                        }

                    />
                </div>

                <div className="col-span-5">
                    <DepartmentChallengesCard />
                </div>

            </section>

        </div>

    );

}

export default HRDashboard;
