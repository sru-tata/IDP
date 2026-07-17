import { useUser } from "../../context/UserContext";
import { useSkillTree } from "../../context/SkillTreeContext";

import DashboardHero from "../../components/dashboard/DashboardHero";
import StatsGrid from "../../components/dashboard/StatsGrid";

import ContributionCard from "../../components/dashboard/ContributionCard";
import CareerGapCard from "../../components/dashboard/CareerGapCard";
import AICoachCard from "../../components/dashboard/AICoachCard";
import LeaderboardCard from "../../components/dashboard/LeaderboardCard";
import BadgesCard from "../../components/dashboard/BadgesCard";
import EEEMixWidget from "../../components/grow/EEEMixWidget";

function Dashboard() {

    const { user } = useUser();

    const { careerProgress } = useSkillTree();

    if (!user || !careerProgress) {

        return null;

    }

    return (

        <div
            className="
                mx-auto
                max-w-[1850px]
                px-8
                py-8
                space-y-6
            "
        >

            <DashboardHero />

            <section
                className="
                    grid
                    grid-cols-12
                    gap-6
                    items-stretch
                "
            >

                <div className="col-span-8">

                    <ContributionCard />

                </div>

                <div className="col-span-4 flex">
                    <div className="flex w-full flex-col">
                        <StatsGrid />
                    </div>
                </div>

            </section>

            <section
                className="
                    grid
                    grid-cols-12
                    gap-6
                    items-stretch
                    min-h-[720px]
                "
            >
                <div className="col-span-7 h-full">
                    <CareerGapCard />
                </div>
                <div className="col-span-5 h-full">
                    <AICoachCard />
                </div>
            </section>

            <EEEMixWidget/>

            <section
                className="
                    grid
                    grid-cols-12
                    gap-6
                    items-stretch
                "
            >
                <div className="col-span-6 h-full">
                    <LeaderboardCard />
                </div>
                <div className="col-span-6 h-full">
                    <BadgesCard/>
                </div>
            </section>
        </div>

    );

}

export default Dashboard;
