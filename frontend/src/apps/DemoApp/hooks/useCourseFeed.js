import { useMemo } from "react";

import buildFeed from "../utils/buildFeed";

export default function useCourseFeed({

    catalog,

    user,

    targetRole,

    recentlyViewed = [],

    skillGaps = [],

    roleCompetencies = []

}) {

    /*
    --------------------------------------------------

    Build Feed

    --------------------------------------------------
    */

    const feed = useMemo(

        () =>

            buildFeed({

                catalog,

                user,

                targetRole,

                recentlyViewed,

                skillGaps,

                roleCompetencies

            }),

        [

            catalog,

            user,

            targetRole,

            recentlyViewed,

            skillGaps,

            roleCompetencies

        ]

    );

    /*
    --------------------------------------------------

    Row Lookup

    --------------------------------------------------
    */

    const rows = useMemo(() => {

        return feed.reduce(

            (map, row) => {

                map[row.id] = row;

                return map;

            },

            {}

        );

    }, [

        feed

    ]);

    /*
    --------------------------------------------------

    Individual Rows

    --------------------------------------------------
    */

    const continueCourses =

        rows["continue"]?.courses ?? [];

    const recommendedCourses =

        rows["recommended"]?.courses ?? [];

    const targetRoleCourses =

        rows["target-role"]?.courses ?? [];

    const skillGapCourses =

        rows["skill-gap"]?.courses ?? [];

    const popularCourses =

        rows["popular"]?.courses ?? [];

    const recentlyViewedCourses =

        rows["recent"]?.courses ?? [];

    const becauseYouCompletedRow =

        rows["because-you-completed"] ?? null;

    /*
    --------------------------------------------------

    Featured Course

    --------------------------------------------------
    */

    const featuredCourse = useMemo(() => {

        const priority = [

            continueCourses,

            recommendedCourses,

            targetRoleCourses,

            skillGapCourses,

            popularCourses

        ];

        for (const row of priority) {

            if (row.length) {

                return row[0];

            }

        }

        return null;

    }, [

        continueCourses,

        recommendedCourses,

        targetRoleCourses,

        skillGapCourses,

        popularCourses

    ]);

    /*
    --------------------------------------------------

    Featured Reason

    --------------------------------------------------
    */

    const featuredReason = useMemo(() => {

        if (!featuredCourse) {

            return [];

        }

        const reasons = [];

        if (featuredCourse.started) {

            reasons.push("Continue Learning");

        }

        if (targetRoleCourses.some(course => course.id === featuredCourse.id)) {

            reasons.push("Target Role");

        }

        if (skillGapCourses.some(course => course.id === featuredCourse.id)) {

            reasons.push("Skill Gap");

        }

        if (featuredCourse.recommended) {

            reasons.push("Recommended");

        }

        if (!reasons.length) {

            reasons.push(featuredCourse.category);

        }

        return reasons;

    }, [

        featuredCourse,

        targetRoleCourses,

        skillGapCourses

    ]);

    return {

        feed,

        featuredCourse,

        featuredReason,

        continueCourses,

        recommendedCourses,

        targetRoleCourses,

        skillGapCourses,

        popularCourses,

        recentlyViewedCourses,

        becauseYouCompletedRow

    };

}