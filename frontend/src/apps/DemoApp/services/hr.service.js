import hrDepartments from "../mock/hrDepartments";
import hrCompetencyOverview from "../mock/hrCompetencyOverview";
import hrEmployees from "../mock/hrEmployees";
import hrInsights from "../mock/hrInsights";
import hrEEEEngagement from "../mock/hrEEEEngagement";
import { orgReadinessTrend, departmentChallenges } from "../mock/hrTrends";

const delay = (ms = 150) =>
    new Promise((resolve) => setTimeout(resolve, ms));

/*
--------------------------------------------------------------------------
HR Service

Data layer for the HR / Manager analytics dashboard. Backed by mock data
today (see mock/hr*.js); swap the bodies below for real API calls once
a workforce-analytics backend exists - the shapes are designed to map
directly onto a REST API returning aggregated Mongo data.
--------------------------------------------------------------------------
*/
const hrService = {

    async getDepartments() {

        await delay();

        return hrDepartments;

    },

    async getCompetencyOverview() {

        await delay();

        return hrCompetencyOverview;

    },

    async getEmployees() {

        await delay();

        return hrEmployees;

    },

    async getInsights() {

        await delay();

        return hrInsights;

    },

    async getTrends() {

        await delay();

        return {
            readinessTrend: orgReadinessTrend,
            departmentChallenges
        };

    },

    async getEEEEngagement() {

        await delay();

        return hrEEEEngagement;

    }

};

export default hrService;
