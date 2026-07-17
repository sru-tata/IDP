import {
    getMostRecentCompletion,
    getBecauseYouCompleted,
    getSkillGapCourses,
    getTargetRoleCourses
} from "../utils/recommendationEngine";

const delay = (ms = 120) =>
    new Promise((resolve) => setTimeout(resolve, ms));

/*
--------------------------------------------------------------------------
Recommendation Service

Thin async wrapper around the pure recommendationEngine functions -
kept as a service (rather than calling the engine directly from
components) so a real backend recommendation API can be swapped in
without touching any component code.
--------------------------------------------------------------------------
*/
const recommendationService = {

    async getBecauseYouCompletedRow(catalog) {

        await delay();

        const anchor = getMostRecentCompletion(catalog);

        return getBecauseYouCompleted(catalog, anchor);

    },

    async getSkillGapRow(catalog, skillGaps) {

        await delay();

        return getSkillGapCourses(catalog, skillGaps);

    },

    async getTargetRoleRow(catalog, roleCompetencies) {

        await delay();

        return getTargetRoleCourses(catalog, roleCompetencies);

    }

};

export default recommendationService;
