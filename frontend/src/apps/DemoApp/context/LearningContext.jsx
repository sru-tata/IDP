import {
    createContext,
    useContext,
    useMemo,
    useState
} from "react";

import learningActivityData from "../mock/learningActivity";
import { buildLearningCalendar } from "../utils/learningCalendar";

const LearningContext = createContext();

function LearningProvider({ children }) {

    /*
    --------------------------------------------------

    Raw Activity

    --------------------------------------------------
    */

    const [

        learningActivity,

        setLearningActivity

    ] = useState(

        learningActivityData

    );

    /*
    --------------------------------------------------

    Log a new session (called when a course is completed
    or otherwise progressed) - merges into today's entry.

    --------------------------------------------------
    */

    function logActivity({ minutes = 0, xp = 0, courses = 0 } = {}) {

        const todayKey = new Date().toISOString().split("T")[0];

        setLearningActivity(previous => {

            const existingIndex = previous.findIndex(
                day => day.date === todayKey
            );

            if (existingIndex === -1) {

                return [
                    {
                        date: todayKey,
                        level: 5,
                        minutes,
                        xp,
                        courses
                    },
                    ...previous
                ];

            }

            const updated = [...previous];

            const existing = updated[existingIndex];

            updated[existingIndex] = {
                ...existing,
                minutes: existing.minutes + minutes,
                xp: existing.xp + xp,
                courses: existing.courses + courses,
                level: Math.min(5, existing.level + 1)
            };

            return updated;

        });

    }

    /*
    --------------------------------------------------

    Calendar

    --------------------------------------------------
    */

    const learningCalendar = useMemo(

        () =>

            buildLearningCalendar(

                learningActivity

            ),

        [

            learningActivity

        ]

    );

    /*
    --------------------------------------------------

    Summary

    --------------------------------------------------
    */

    const learningSummary = useMemo(() => {

        const totalMinutes = learningActivity.reduce(

            (sum, day) =>

                sum + day.minutes,

            0

        );

        const totalXP = learningActivity.reduce(

            (sum, day) =>

                sum + day.xp,

            0

        );

        const totalCourses = learningActivity.reduce(

            (sum, day) =>

                sum + day.courses,

            0

        );

        return {

            totalMinutes,

            totalHours:

                Number(

                    (

                        totalMinutes / 60

                    ).toFixed(1)

                ),

            totalXP,

            totalCourses,

            activeDays:

                learningActivity.length

        };

    }, [

        learningActivity

    ]);

    /*
    --------------------------------------------------

    Weekly

    --------------------------------------------------
    */

    const weeklyProgress = useMemo(() => {

        const week = learningActivity.slice(

            0,

            7

        );

        return {

            hoursLearned:

                Number(

                    (

                        week.reduce(

                            (sum, day) =>

                                sum + day.minutes,

                            0

                        ) / 60

                    ).toFixed(1)

                ),

            xpEarned:

                week.reduce(

                    (sum, day) =>

                        sum + day.xp,

                    0

                ),

            coursesCompleted:

                week.reduce(

                    (sum, day) =>

                        sum + day.courses,

                    0

                ),

            currentStreak:

                learningActivity.length

        };

    }, [

        learningActivity

    ]);

    /*
    --------------------------------------------------

    Recent Activity

    --------------------------------------------------
    */

    const recentActivity = useMemo(

        () =>

            learningActivity.slice(

                0,

                10

            ),

        [

            learningActivity

        ]

    );

    /*
    --------------------------------------------------

    Context

    --------------------------------------------------
    */

    const value = useMemo(() => ({

        learningActivity,

        learningCalendar,

        learningSummary,

        weeklyProgress,

        recentActivity,

        logActivity

    }), [

        learningActivity,

        learningCalendar,

        learningSummary,

        weeklyProgress,

        recentActivity

    ]);

    return (

        <LearningContext.Provider

            value={value}

        >

            {children}

        </LearningContext.Provider>

    );

}

export function useLearning() {

    return useContext(

        LearningContext

    );

}

export default LearningProvider;