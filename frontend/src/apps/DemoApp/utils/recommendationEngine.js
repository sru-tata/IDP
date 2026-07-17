/*
--------------------------------------------------------------------------
Recommendation Engine

Pure functions - no I/O - so they're trivial to unit test. The
recommendation.service.js wraps these for the async service pattern
used throughout the app.
--------------------------------------------------------------------------
*/

export function getMostRecentCompletion(catalog = []) {

    const completed = catalog
        .filter(course => course.progress === 100 && course.completedAt)
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

    return completed[0] || null;
}

/*
Finds catalog courses that share skills or a category with `anchor`,
ranks by overlap, and excludes anything already completed.
*/
export function getBecauseYouCompleted(catalog = [], anchor) {

    if (!anchor) {

        return { anchor: null, courses: [] };

    }

    const anchorSkills = new Set(anchor.skills || []);

    const scored = catalog
        .filter(course =>
            course.id !== anchor.id &&
            course.progress !== 100
        )
        .map(course => {

            const sharedSkills = (course.skills || []).filter(
                skill => anchorSkills.has(skill)
            ).length;

            const sameCategory = course.category === anchor.category ? 1 : 0;
            const sameCompetency = course.competencyId === anchor.competencyId ? 1 : 0;

            const score = sharedSkills * 3 + sameCategory * 2 + sameCompetency;

            return { course, score };

        })
        .filter(entry => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12)
        .map(entry => entry.course);

    return {
        anchor,
        courses: scored
    };
}

/*
Ranks catalog courses against the person's lowest-progress competencies
(their real skill gaps), used for the "Close Your Skill Gaps" row.
*/
export function getSkillGapCourses(catalog = [], skillGaps = []) {

    const gapIds = skillGaps
        .filter(gap => gap.progress < 70)
        .map(gap => gap.id);

    if (!gapIds.length) {

        return [];

    }

    return catalog
        .filter(course =>
            course.progress !== 100 &&
            gapIds.includes(course.competencyId)
        )
        .sort((a, b) => {

            const aRank = gapIds.indexOf(a.competencyId);
            const bRank = gapIds.indexOf(b.competencyId);

            return aRank - bRank;

        })
        .slice(0, 12);
}

/*
Courses aligned with the competency categories covered by the target
role's skill tree, used for the "Towards <role>" row.
*/
export function getTargetRoleCourses(catalog = [], roleCompetencies = []) {

    if (!roleCompetencies.length) {

        return [];

    }

    const roleCategories = new Set(roleCompetencies);

    return catalog
        .filter(course =>
            course.progress !== 100 &&
            roleCategories.has(course.category)
        )
        .slice(0, 12);
}
