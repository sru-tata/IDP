import {
    getSkillGapCourses,
    getTargetRoleCourses,
    getBecauseYouCompleted,
    getMostRecentCompletion
} from "./recommendationEngine";

function shuffle(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );

}

export default function buildFeed({

    catalog,

    user,

    targetRole,

    recentlyViewed = [],

    skillGaps = [],

    roleCompetencies = []

}) {

    if (!catalog.length) {

        return [];

    }

    /*
    --------------------------------------------------
    Continue Learning
    --------------------------------------------------
    */

    const continueWatching = catalog.filter(
        course => course.started && course.progress < 100
    );

    /*
    --------------------------------------------------
    Recommended
    --------------------------------------------------
    */

    const recommended = catalog
        .filter(course => !course.started && course.recommended)
        .slice(0, 12);

    /*
    --------------------------------------------------
    Target Role - driven by the target role's real
    skill tree competencies, not keyword guessing.
    --------------------------------------------------
    */

    const targetRoleCourses = getTargetRoleCourses(
        catalog,
        roleCompetencies
    );

    /*
    --------------------------------------------------
    Skill Gap - driven by real competency progress.
    --------------------------------------------------
    */

    const skillGapCourses = getSkillGapCourses(
        catalog,
        skillGaps
    );

    /*
    --------------------------------------------------
    Because You Completed <X>
    --------------------------------------------------
    */

    const mostRecentCompletion = getMostRecentCompletion(catalog);

    const { courses: becauseYouCompletedCourses } = getBecauseYouCompleted(
        catalog,
        mostRecentCompletion
    );

    /*
    --------------------------------------------------
    Popular
    --------------------------------------------------
    */

    const popularCourses = shuffle(catalog)
        .sort((a, b) => (b.learners || 0) - (a.learners || 0))
        .slice(0, 12);

    /*
    --------------------------------------------------
    Recently Viewed
    --------------------------------------------------
    */

    const recentCourses = recentlyViewed.slice(0, 12);

    /*
    --------------------------------------------------
    Assemble + Remove Empty Rows
    --------------------------------------------------
    */

    return [

        {
            id: "continue",
            title: "Continue Learning",
            subtitle: "Resume your active learning.",
            courses: continueWatching
        },

        {
            id: "recommended",
            title: "Recommended For You",
            subtitle: "Personalized using your profile.",
            courses: recommended
        },

        {
            id: "because-you-completed",
            title: mostRecentCompletion
                ? `Because You Completed "${mostRecentCompletion.title}"`
                : "Because You Completed",
            subtitle: "More like the course you just finished.",
            courses: becauseYouCompletedCourses
        },

        {
            id: "target-role",
            title: `Towards ${targetRole?.title ?? "Your Goal"}`,
            subtitle: "Courses aligned with your career path.",
            courses: targetRoleCourses
        },

        {
            id: "skill-gap",
            title: "Close Your Skill Gaps",
            subtitle: "Recommended competencies to strengthen.",
            courses: skillGapCourses
        },

        {
            id: "popular",
            title: `Popular In ${user?.department ?? "Your Team"}`,
            subtitle: "Trending among your peers.",
            courses: popularCourses
        },

        {
            id: "recent",
            title: "Recently Viewed",
            subtitle: "Continue exploring these courses.",
            courses: recentCourses
        }

    ].filter(row => row.courses.length);

}
