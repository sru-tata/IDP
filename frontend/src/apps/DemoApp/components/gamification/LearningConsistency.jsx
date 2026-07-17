import Card from "../ui/Card";
import CalendarMonth from "./CalendarMonth";

import { useLearning } from "../../context/LearningContext";

function LearningConsistency({

    compact = false

}) {

    const {

        learningCalendar

    } = useLearning();

    const months = compact

        ? learningCalendar.slice(0, 6)

        : learningCalendar;

    return (

        <Card

            className={`
                relative
                overflow-hidden

                ${compact ? "p-5" : "p-8"}
            `}

        >

            <div

                className={
                    compact

                        ? "mb-5"

                        : "mb-8"
                }

            >

                <h2

                    className={
                        compact

                            ? "text-xl font-bold"

                            : "text-3xl font-bold"
                    }

                >

                    Learning Activity

                </h2>

                {

                    !compact && (

                        <p className="mt-2 max-w-2xl text-zinc-400">

                            Build your learning streak one day at a time.

                            Small learning sessions compound into expertise.

                        </p>

                    )

                }

            </div>

            <div

                className={`
                    flex
                    overflow-x-auto
                    scroll-smooth
                    scrollbar-hide

                    ${compact ? "gap-8 pb-2" : "gap-12 pb-4"}

                `}

            >

                {

                    months.map((month) => (

                        <CalendarMonth

                            key={`${month.month}-${month.year}`}

                            compact={compact}

                            {...month}

                        />

                    ))

                }

            </div>

            <div

                className={`
                    flex
                    items-center
                    justify-end
                    gap-2
                    text-zinc-500

                    ${compact ? "mt-5 text-xs" : "mt-10 text-sm"}

                `}

            >

                <span>

                    Less

                </span>

                <div className="flex gap-1">

                    <div className="h-3 w-3 rounded bg-zinc-800"/>

                    <div className="h-3 w-3 rounded bg-green-950"/>

                    <div className="h-3 w-3 rounded bg-green-900"/>

                    <div className="h-3 w-3 rounded bg-green-700"/>

                    <div className="h-3 w-3 rounded bg-green-600"/>

                    <div className="h-3 w-3 rounded bg-green-500"/>

                </div>

                <span>

                    More

                </span>

            </div>

        </Card>

    );

}

export default LearningConsistency;