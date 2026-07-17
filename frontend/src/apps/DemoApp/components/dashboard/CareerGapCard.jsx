import {
    ArrowRight,
    Target
} from "lucide-react";

import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";

import { useUser } from "../../context/UserContext";
import { useCompetencies } from "../../context/CompetencyContext";

function CareerGapCard() {

    const {

        user,

        targetRole

    } = useUser();

    const {

        competencies,

        skillGaps

    } = useCompetencies();

    if (!user) {

        return null;

    }

    const biggestOpportunity = skillGaps?.[0];

    return (

        <Card className="h-full">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">

                        Career Gap Analysis

                    </p>

                    <h2 className="mt-2 text-2xl font-bold">

                        Current Role vs Target Role

                    </h2>

                </div>

                <Target

                    className="text-blue-400"

                    size={26}

                />

            </div>

            <div className="mt-8 flex items-center gap-6">

                <div>

                    <p className="text-xs uppercase text-zinc-500">

                        Current

                    </p>

                    <h3 className="mt-1 font-semibold">

                        {user.currentRole}

                    </h3>

                </div>

                <ArrowRight

                    className="text-blue-400"

                />

                <div>

                    <p className="text-xs uppercase text-zinc-500">

                        Target

                    </p>

                    <h3 className="mt-1 font-semibold text-blue-400">

                        {targetRole?.title ?? "—"}

                    </h3>

                </div>

            </div>

            <div className="mt-8 space-y-5">

                {

                    competencies.map(competency => (

                        <div

                            key={competency.id}

                        >

                            <div className="mb-2 flex justify-between">

                                <span className="font-medium">

                                    {competency.name}

                                </span>

                                {

                                    competency.required && (

                                        <span className="text-xs text-zinc-500">

                                            Required for role

                                        </span>

                                    )

                                }

                            </div>

                            <ProgressBar

                                value={competency.progress}

                                hideLabel

                            />

                        </div>

                    ))

                }

            </div>

            {

                biggestOpportunity && (

                    <div

                        className="
                            mt-6
                            rounded-2xl
                            border
                            border-blue-500/20
                            bg-blue-500/10
                            p-5
                        "

                    >

                        <p className="text-xs uppercase tracking-wider text-blue-300">

                            Biggest Opportunity

                        </p>

                        <h3 className="mt-2 font-semibold">

                            {biggestOpportunity.name}

                        </h3>

                        <p className="mt-2 text-sm leading-6 text-zinc-400">

                            You're at {biggestOpportunity.progress}% here - the
                            fastest way to boost your overall career readiness
                            is closing this gap first.

                        </p>

                    </div>

                )

            }

        </Card>

    );

}

export default CareerGapCard;
