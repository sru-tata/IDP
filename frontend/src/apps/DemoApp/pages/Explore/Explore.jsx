import {

    Sparkles,

    SearchX

} from "lucide-react";

import {

    useEffect,

    useMemo,

    useRef

} from "react";

import CourseRow from "../../components/course/CourseRow";

import { useCourses } from "../../context/CourseContext";

function Explore() {

    const {

        feed = [],

        query,

        results,

        highlightedRowId

    } = useCourses();

    const rowRefs = useRef({});

    /*
    -----------------------------------------

    Build Feed

    -----------------------------------------

    */

    const visibleRows = useMemo(() => {

        const baseFeed = feed.filter(

            row => row.id !== "top-matches"

        );

        if (!query.trim()) {

            return baseFeed;

        }

        if (results.length === 0) {

            return baseFeed;

        }

        return [

            {

                id: "top-matches",

                title: "Top Matches",

                subtitle: `${results.length} result${results.length > 1 ? "s" : ""} for "${query}"`,

                courses: results

            },

            ...baseFeed

        ];

    }, [

        feed,

        query,

        results

    ]);

    /*
    -----------------------------------------

    Scroll

    -----------------------------------------

    */

    useEffect(() => {

        if (

            query.trim() &&

            results.length &&

            rowRefs.current["top-matches"]

        ) {

            rowRefs.current["top-matches"]

                .scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            return;

        }

        if (

            highlightedRowId &&

            rowRefs.current[highlightedRowId]

        ) {

            rowRefs.current[highlightedRowId]

                .scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

        }

    }, [

        query,

        results,

        highlightedRowId

    ]);

    return (

        <>

            <div

                className="
                    mx-auto
                    max-w-screen-2xl
                    px-6
                    py-8
                "

            >

                {/* Header */}

                <section className="mb-12">

                    <div className="flex items-center gap-3">

                        <Sparkles

                            className="text-blue-400"

                        />

                        <p className="font-semibold text-blue-400">

                            Explore Learning

                        </p>

                    </div>

                    <h1

                        className="
                            mt-3
                            text-5xl
                            font-black
                        "

                    >

                        Discover Your Next Skill

                    </h1>

                    <p

                        className="
                            mt-3
                            max-w-3xl
                            text-lg
                            text-zinc-500
                        "

                    >

                        Personalized recommendations powered by your
                        learning activity, career aspirations and competency
                        profile.

                    </p>

                </section>

                {

                    query.trim() &&

                    results.length === 0 && (

                        <div

                            className="
                                mb-16
                                flex
                                flex-col
                                items-center
                                justify-center
                                rounded-3xl
                                border
                                border-zinc-800
                                bg-zinc-900
                                py-24
                            "

                        >

                            <SearchX

                                size={54}

                                className="text-zinc-600"

                            />

                            <h2

                                className="
                                    mt-6
                                    text-3xl
                                    font-bold
                                "

                            >

                                No results found

                            </h2>

                            <p

                                className="
                                    mt-3
                                    text-zinc-500
                                "

                            >

                                Try another course, competency or skill.

                            </p>

                        </div>

                    )

                }

                {

                    visibleRows

                        .filter(

                            row =>

                                row.courses.length > 0

                        )

                        .map(row => (

                            <section

                                key={row.id}

                                ref={element =>

                                    rowRefs.current[row.id] =

                                        element

                                }

                            >

                                <CourseRow

                                    rowId={row.id}

                                    title={row.title}

                                    subtitle={row.subtitle}

                                    courses={row.courses}

                                />

                            </section>

                        ))

                }

            </div>

        </>

    );

}

export default Explore;