import {
    AlertTriangle,
    Eye,
    Sparkles,
    TrendingUp
} from "lucide-react";

import Card from "../ui/Card";

import { useHR } from "../../context/HRContext";

const TYPE_META = {

    positive: {
        icon: TrendingUp,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20"
    },

    warning: {
        icon: AlertTriangle,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20"
    },

    watch: {
        icon: Eye,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20"
    }

};

function AIInsightsPanel() {

    const { insights } = useHR();

    return (

        <Card className="p-8">

            <div className="flex items-center gap-2">

                <Sparkles size={18} className="text-blue-400"/>

                <p className="font-semibold text-blue-400">
                    AI-Powered Insights
                </p>

            </div>

            <p className="mt-2 text-sm text-zinc-500">

                The platform identifies significant trend changes and
                surfaces key contributing factors automatically.

            </p>

            <div className="mt-6 space-y-4">

                {

                    insights.map(insight => {

                        const meta = TYPE_META[insight.type] || TYPE_META.watch;
                        const Icon = meta.icon;

                        return (

                            <div

                                key={insight.id}

                                className={`
                                    rounded-2xl
                                    border
                                    p-5
                                    ${meta.bg}
                                    ${meta.border}
                                `}

                            >

                                <div className="flex items-start justify-between gap-4">

                                    <div className="flex items-start gap-3">

                                        <span className={`mt-0.5 ${meta.color}`}>
                                            <Icon size={18}/>
                                        </span>

                                        <div>

                                            <h3 className="font-semibold">
                                                {insight.title}
                                            </h3>

                                            <p className="mt-1.5 text-sm leading-6 text-zinc-400">
                                                {insight.detail}
                                            </p>

                                        </div>

                                    </div>

                                    <span className={`shrink-0 rounded-full bg-black/30 px-3 py-1.5 text-xs font-semibold ${meta.color}`}>
                                        {insight.metric}
                                    </span>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </Card>

    );

}

export default AIInsightsPanel;
