/*
Team Competency Overview - mirrors the "Manager Dashboard & Department
Insights" slide from the POC deck exactly (avg current vs avg required
level, gap, and gap impact banding).
*/

function impactFor(gap) {

    if (gap >= 1.3) return "High";
    if (gap >= 0.9) return "Medium";
    return "Low";

}

const raw = [

    { competency: "Lean Manufacturing", icon: "factory", current: 4.1, required: 5.0, trend: "up" },
    { competency: "Six Sigma", icon: "shield-check", current: 3.2, required: 4.5, trend: "up" },
    { competency: "Data Analytics", icon: "cpu", current: 2.3, required: 4.0, trend: "up" },
    { competency: "Project Management", icon: "bot", current: 2.8, required: 4.0, trend: "up" },
    { competency: "Root Cause Analysis", icon: "shield-check", current: 4.2, required: 5.0, trend: "up" },
    { competency: "Problem Solving", icon: "brain-circuit", current: 4.0, required: 5.0, trend: "up" },
    { competency: "Leadership", icon: "workflow", current: 2.6, required: 4.0, trend: "up" },
    { competency: "Safety Management", icon: "shield-check", current: 4.3, required: 5.0, trend: "up" }

];

const hrCompetencyOverview = raw.map(row => {

    const gap = Number((row.required - row.current).toFixed(1));

    return {

        ...row,
        gap,
        impact: impactFor(gap)

    };

});

export default hrCompetencyOverview;
