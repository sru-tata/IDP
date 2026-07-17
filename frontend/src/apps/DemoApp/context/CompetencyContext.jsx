import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import competencyService from "../services/competency.service";

const CompetencyContext = createContext();

function CompetencyProvider({ children }) {

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        competencies,

        setCompetencies

    ] = useState([]);

    const [

        contributionLog,

        setContributionLog

    ] = useState([]);

    /*
    --------------------------------------------------

    Load

    --------------------------------------------------
    */

    useEffect(() => {

        loadCompetencies();

    }, []);

    async function loadCompetencies() {

        setLoading(true);

        try {

            const data = await competencyService.getCompetencies();

            setCompetencies(

                data || []

            );

        }

        catch (error) {

            console.error(

                "Failed to load competencies",

                error

            );

            setCompetencies([]);

        }

        finally {

            setLoading(false);

        }

    }

    /*
    --------------------------------------------------

    Derived

    --------------------------------------------------
    */

    const competencySummary = useMemo(() => {

        if (!competencies.length) {

            return {

                total: 0,

                completed: 0,

                inProgress: 0,

                average: 0

            };

        }

        const completed = competencies.filter(

            competency =>

                competency.progress >= 100

        ).length;

        const inProgress = competencies.filter(

            competency =>

                competency.progress > 0 &&

                competency.progress < 100

        ).length;

        const average = Math.round(

            competencies.reduce(

                (sum, competency) =>

                    sum + competency.progress,

                0

            ) / competencies.length

        );

        return {

            total: competencies.length,

            completed,

            inProgress,

            average

        };

    }, [

        competencies

    ]);

    /*
    --------------------------------------------------

    Strengths

    --------------------------------------------------
    */

    const strengths = useMemo(() => {

        return [...competencies]

            .sort(

                (a, b) =>

                    b.progress - a.progress

            )

            .slice(0, 5);

    }, [

        competencies

    ]);

    /*
    --------------------------------------------------

    Skill Gaps

    --------------------------------------------------
    */

    const skillGaps = useMemo(() => {

        return [...competencies]

            .sort(

                (a, b) =>

                    a.progress - b.progress

            )

            .slice(0, 5);

    }, [

        competencies

    ]);

    /*
    --------------------------------------------------

    EEE Contributions

    Education (courses), Experience (job rotations) and Exposure
    (GEMS projects / external events) all feed competency growth here -
    this is the single place "skill readiness" actually gets computed
    from, instead of a static number.

    --------------------------------------------------
    */

    function addContribution(competencyId, amount, pillar = "education", label = "") {

        if (!competencyId || !amount) {

            return;

        }

        setCompetencies(previous =>

            previous.map(competency =>

                competency.id === competencyId
                    ? {
                        ...competency,
                        progress: Math.min(100, Math.round(competency.progress + amount))
                    }
                    : competency

            )

        );

        setContributionLog(previous => [

            {
                competencyId,
                amount,
                pillar,
                label,
                date: new Date().toISOString()
            },

            ...previous

        ]);

    }

    /*
    The "70-20-10" learning and development baseline: most real career
    growth should come from Experience, then Exposure, with formal
    Education as the smallest (but still necessary) slice.
    */
    const REQUIRED_EEE_MIX = {

        experience: 70,
        exposure: 20,
        education: 10

    };

    const eeeMix = useMemo(() => {

        const totals = { education: 0, experience: 0, exposure: 0 };

        contributionLog.forEach(entry => {

            totals[entry.pillar] = (totals[entry.pillar] || 0) + entry.amount;

        });

        const sum = totals.education + totals.experience + totals.exposure;

        const current = !sum

            ? { education: 78, experience: 14, exposure: 8, hasData: false }

            : {

                education: Math.round((totals.education / sum) * 100),
                experience: Math.round((totals.experience / sum) * 100),
                exposure: Math.round((totals.exposure / sum) * 100),
                hasData: true

            };

        const gap = {

            education: current.education - REQUIRED_EEE_MIX.education,
            experience: current.experience - REQUIRED_EEE_MIX.experience,
            exposure: current.exposure - REQUIRED_EEE_MIX.exposure

        };

        /*
        A simple single "how far off" number - half the total absolute
        deviation across all three pillars (so a person exactly on
        target scores 0, and someone 100% in one pillar scores 100).
        */
        const distanceFromIdeal = Math.round(

            (Math.abs(gap.education) + Math.abs(gap.experience) + Math.abs(gap.exposure)) / 2

        );

        return {

            ...current,

            required: REQUIRED_EEE_MIX,
            gap,
            distanceFromIdeal

        };

    }, [contributionLog]);

    /*
    --------------------------------------------------

    Context

    --------------------------------------------------
    */

    const value = useMemo(() => ({

        loading,

        competencies,

        competencySummary,

        strengths,

        skillGaps,

        addContribution,

        contributionLog,

        eeeMix,

        refreshCompetencies:

            loadCompetencies

    }), [

        loading,

        competencies,

        competencySummary,

        strengths,

        skillGaps,

        contributionLog,

        eeeMix

    ]);

    return (

        <CompetencyContext.Provider

            value={value}

        >

            {children}

        </CompetencyContext.Provider>

    );

}

export function useCompetencies() {

    return useContext(

        CompetencyContext

    );

}

export default CompetencyProvider;