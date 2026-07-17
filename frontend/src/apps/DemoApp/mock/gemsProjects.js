/*
--------------------------------------------------------------------------
GEMS Projects - stretch / cross-functional projects employees take on
alongside their day job. Part of the "Exposure" pillar: broader, lighter
touch than a job rotation, but exposes you to problems, teams and
stakeholders outside your normal role.
--------------------------------------------------------------------------
*/
const gemsProjects = [

    {
        id: "gems-scrap-reduction",
        title: "Line 4 Scrap Reduction Sprint",
        sponsorDepartment: "Manufacturing",
        type: "Process Improvement",
        effort: "4-6 hrs/week · 6 weeks",
        teamSize: "4-6 people, cross-department",
        description:
            "Join a cross-team group chartered to cut scrap rate on Line 4 by 15%.",
        deliverable: "A implemented fix + a one-page savings report presented to the plant Kaizen board.",
        competenciesGained: [
            { competencyId: "manufacturing", boost: 4 },
            { competencyId: "quality", boost: 4 }
        ],
        xp: 500
    },

    {
        id: "gems-predictive-maintenance",
        title: "Predictive Maintenance Pilot",
        sponsorDepartment: "Automation",
        type: "Digital Transformation",
        effort: "5 hrs/week · 8 weeks",
        teamSize: "3-5 people, cross-department",
        description:
            "Help build and test a simple predictive-maintenance model for one machine cell.",
        deliverable: "A working pilot dashboard + a go/no-go recommendation for plant-wide rollout.",
        competenciesGained: [
            { competencyId: "artificial-intelligence", boost: 6 },
            { competencyId: "automation", boost: 3 }
        ],
        xp: 650
    },

    {
        id: "gems-onboarding-buddy",
        title: "New Hire Onboarding Redesign",
        sponsorDepartment: "Manufacturing Excellence",
        type: "People & Process",
        effort: "3 hrs/week · 4 weeks",
        teamSize: "3-4 people",
        description:
            "Redesign the first 30 days for new hires and pitch it to HR.",
        deliverable: "A revised onboarding journey map + a pitch deck presented to HR leadership.",
        competenciesGained: [
            { competencyId: "manufacturing", boost: 3 },
            { competencyId: "quality", boost: 2 }
        ],
        xp: 350
    },

    {
        id: "gems-cost-savings-challenge",
        title: "Annual Cost Savings Challenge",
        sponsorDepartment: "Supply Chain",
        type: "Cost Savings",
        effort: "Self-paced · 10 weeks",
        teamSize: "Individual or pairs",
        description:
            "The plant's yearly open call for cost-saving ideas, mentor included.",
        deliverable: "A costed savings proposal presented to the review panel.",
        competenciesGained: [
            { competencyId: "programming", boost: 3 },
            { competencyId: "manufacturing", boost: 3 }
        ],
        xp: 450
    },

    {
        id: "gems-digital-twin-poc",
        title: "Digital Twin Proof of Concept",
        sponsorDepartment: "Manufacturing Excellence",
        type: "Innovation",
        effort: "6 hrs/week · 8 weeks",
        teamSize: "5-6 people, cross-department",
        description:
            "Build a proof-of-concept digital twin for one production cell.",
        deliverable: "A working PoC demo + submission-ready write-up.",
        competenciesGained: [
            { competencyId: "artificial-intelligence", boost: 5 },
            { competencyId: "automation", boost: 5 }
        ],
        xp: 700
    }

];

export default gemsProjects;
