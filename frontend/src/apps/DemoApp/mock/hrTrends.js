/*
Tracking Impact Over Time - org-wide skill readiness, active learners and
courses completed by month, for the HR "Learning Trends" line chart.
*/
export const orgReadinessTrend = [

    { month: "Oct", readiness: 57, activeLearners: 612, coursesCompleted: 340 },
    { month: "Nov", readiness: 59, activeLearners: 648, coursesCompleted: 388 },
    { month: "Dec", readiness: 60, activeLearners: 601, coursesCompleted: 356 },
    { month: "Jan", readiness: 62, activeLearners: 705, coursesCompleted: 421 },
    { month: "Feb", readiness: 64, activeLearners: 742, coursesCompleted: 468 },
    { month: "Mar", readiness: 65, activeLearners: 779, coursesCompleted: 512 },
    { month: "Apr", readiness: 67, activeLearners: 811, coursesCompleted: 549 },
    { month: "May", readiness: 68, activeLearners: 856, coursesCompleted: 601 },
    { month: "Jun", readiness: 70, activeLearners: 902, coursesCompleted: 647 }

];

/*
Department Challenges - team-based gamification rewards (POC deck,
"Gamification & Achievement System" slide).
*/
export const departmentChallenges = [

    {
        id: "dc1",
        title: "Six Sigma Sprint",
        description: "Most Six Sigma modules completed as a team this month.",
        leadingDepartment: "Quality",
        progress: 82,
        reward: "500 team XP + department badge",
        endsIn: "5 days"
    },

    {
        id: "dc2",
        title: "Lean Line Challenge",
        description: "First department to complete Lean Manufacturing Fundamentals org-wide.",
        leadingDepartment: "Assembly",
        progress: 91,
        reward: "Lunch with plant leadership",
        endsIn: "2 days"
    },

    {
        id: "dc3",
        title: "Automation Ready",
        description: "Close the Automation skill gap fastest across all departments.",
        leadingDepartment: "Manufacturing",
        progress: 54,
        reward: "700 team XP",
        endsIn: "11 days"
    }

];
