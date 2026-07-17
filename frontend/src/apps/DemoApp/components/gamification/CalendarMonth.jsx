import ActivityCell from "./ActivityCell";

function CalendarMonth({

    month,

    year,

    weeks,

    compact = false

}) {

    return (

        <section className="flex-shrink-0">

            <div

                className={
                    compact

                        ? "mb-3"

                        : "mb-5"
                }

            >

                <h3

                    className={
                        compact

                            ? "text-sm font-semibold"

                            : "text-lg font-bold"
                    }

                >

                    {month}

                </h3>

                <p

                    className={
                        compact

                            ? "text-[11px] text-zinc-500"

                            : "text-sm text-zinc-500"
                    }

                >

                    {year}

                </p>

            </div>

            <div

                className={

                    compact

                        ? "flex gap-[3px]"

                        : "flex gap-[5px]"

                }

            >

                {

                    weeks.map((week, index) => (

                        <div

                            key={index}

                            className={

                                compact

                                    ? "flex flex-col gap-[3px]"

                                    : "flex flex-col gap-[5px]"

                            }

                        >

                            {

                                week.map((day, i) => (

                                    day

                                        ?

                                        <ActivityCell

                                            key={i}

                                            day={day}

                                            compact={compact}

                                        />

                                        :

                                        <div

                                            key={i}

                                            className={

                                                compact

                                                    ? "h-[11px] w-[11px]"

                                                    : "h-[15px] w-[15px]"

                                            }

                                        />

                                ))

                            }

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default CalendarMonth;