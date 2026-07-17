import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import hrService from "../services/hr.service";
import { useAuth } from "./AuthContext";

const HRContext = createContext();

function HRProvider({ children }) {

    const { role } = useAuth();

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        departments,

        setDepartments

    ] = useState([]);

    const [

        competencyOverview,

        setCompetencyOverview

    ] = useState([]);

    const [

        employees,

        setEmployees

    ] = useState([]);

    const [

        insights,

        setInsights

    ] = useState([]);

    const [

        readinessTrend,

        setReadinessTrend

    ] = useState([]);

    const [

        departmentChallenges,

        setDepartmentChallenges

    ] = useState([]);

    const [

        eeeEngagement,

        setEEEEngagement

    ] = useState([]);

    useEffect(() => {

        /*
        Only load the (heavier) HR dataset once someone is actually in
        the HR role - the candidate experience never needs it.
        */
        if (role !== "hr") {

            return;

        }

        let cancelled = false;

        async function load() {

            setLoading(true);

            const [

                departmentsData,

                competencyData,

                employeesData,

                insightsData,

                trendsData,

                eeeEngagementData

            ] = await Promise.all([

                hrService.getDepartments(),
                hrService.getCompetencyOverview(),
                hrService.getEmployees(),
                hrService.getInsights(),
                hrService.getTrends(),
                hrService.getEEEEngagement()

            ]);

            if (cancelled) {

                return;

            }

            setDepartments(departmentsData);
            setCompetencyOverview(competencyData);
            setEmployees(employeesData);
            setInsights(insightsData);
            setReadinessTrend(trendsData.readinessTrend);
            setDepartmentChallenges(trendsData.departmentChallenges);
            setEEEEngagement(eeeEngagementData);

            setLoading(false);

        }

        load();

        return () => {

            cancelled = true;

        };

    }, [role]);

    /*
    --------------------------------------------------

    Derived Org-Wide Stats

    --------------------------------------------------
    */

    const orgStats = useMemo(() => {

        if (!departments.length) {

            return null;

        }

        const totalHeadcount = departments.reduce(
            (sum, department) => sum + department.headcount,
            0
        );

        const avgReadiness = Math.round(

            departments.reduce(
                (sum, department) => sum + department.readiness * department.headcount,
                0
            ) / totalHeadcount

        );

        const latestTrend = readinessTrend[readinessTrend.length - 1];
        const previousTrend = readinessTrend[readinessTrend.length - 2];

        const readinessMomentum = latestTrend && previousTrend
            ? latestTrend.readiness - previousTrend.readiness
            : 0;

        const atRiskEmployees = employees.filter(
            employee => employee.status === "At Risk"
        ).length;

        const aheadEmployees = employees.filter(
            employee => employee.status === "Ahead"
        ).length;

        const highGapCompetencies = competencyOverview.filter(
            item => item.impact === "High"
        );

        return {

            totalHeadcount,
            avgReadiness,
            readinessMomentum,
            activeLearners: latestTrend?.activeLearners ?? 0,
            coursesCompletedThisMonth: latestTrend?.coursesCompleted ?? 0,
            atRiskEmployees,
            aheadEmployees,
            highGapCompetencies

        };

    }, [

        departments,

        readinessTrend,

        employees,

        competencyOverview

    ]);

    const value = useMemo(() => ({

        loading,

        departments,

        competencyOverview,

        employees,

        insights,

        readinessTrend,

        departmentChallenges,

        eeeEngagement,

        orgStats

    }), [

        loading,

        departments,

        competencyOverview,

        employees,

        insights,

        readinessTrend,

        departmentChallenges,

        eeeEngagement,

        orgStats

    ]);

    return (

        <HRContext.Provider value={value}>

            {children}

        </HRContext.Provider>

    );

}

export function useHR() {

    return useContext(HRContext);

}

export default HRProvider;
