import { useHR } from "../../context/HRContext";

import ReadinessTrendChart from "../../components/hr/ReadinessTrendChart";
import AIInsightsPanel from "../../components/hr/AIInsightsPanel";
import DepartmentEEEEngagement from "../../components/hr/DepartmentEEEEngagement";

function HRInsights() {

    const { loading } = useHR();

    if (loading) {

        return (

            <div className="flex h-full items-center justify-center py-24 text-zinc-500">
                Loading trends and insights...
            </div>

        );

    }

    return (

        <div className="mx-auto max-w-[1850px] space-y-6 px-8 py-8">

            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
                    Learning Trends & AI Insights
                </p>
                <h1 className="mt-2 text-3xl font-bold">
                    Workforce Intelligence
                </h1>
                <p className="mt-2 max-w-2xl text-zinc-500">
                    We don't just show current skill readiness — we track how
                    workforce capability changes, and surface the AI-powered
                    insights that explain why.
                </p>
            </div>

            <section className="grid grid-cols-12 gap-6 items-stretch">

                <div className="col-span-7">
                    <ReadinessTrendChart />
                </div>

                <div className="col-span-5">
                    <AIInsightsPanel />
                </div>

            </section>

            <DepartmentEEEEngagement />

        </div>

    );

}

export default HRInsights;
