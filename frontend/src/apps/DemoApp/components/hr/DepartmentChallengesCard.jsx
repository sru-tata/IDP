import { Trophy } from "lucide-react";

import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";

import { useHR } from "../../context/HRContext";

function DepartmentChallengesCard() {

    const { departmentChallenges } = useHR();

    return (

        <Card className="p-8">

            <div className="flex items-center gap-2">
                <Trophy size={18} className="text-yellow-400"/>
                <p className="font-semibold text-yellow-400">
                    Department Challenges
                </p>
            </div>

            <p className="mt-2 text-sm text-zinc-500">
                Team-based rewards that drive collective growth.
            </p>

            <div className="mt-6 space-y-5">

                {

                    departmentChallenges.map(challenge => (

                        <div

                            key={challenge.id}

                            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"

                        >

                            <div className="flex items-start justify-between gap-3">

                                <div>
                                    <h3 className="font-semibold">
                                        {challenge.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-zinc-500">
                                        {challenge.description}
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-full bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-400">
                                    {challenge.endsIn} left
                                </span>

                            </div>

                            <div className="mt-4">

                                <ProgressBar

                                    value={challenge.progress}

                                    label={`Leading: ${challenge.leadingDepartment}`}

                                    color="bg-yellow-500"

                                />

                            </div>

                            <p className="mt-3 text-xs text-zinc-500">
                                Reward: {challenge.reward}
                            </p>

                        </div>

                    ))

                }

            </div>

        </Card>

    );

}

export default DepartmentChallengesCard;
