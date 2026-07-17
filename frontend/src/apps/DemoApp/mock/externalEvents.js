/*
--------------------------------------------------------------------------
External Platform Exposure - the other half of the "Exposure" pillar:
Tata group-wide innovation/digital programs plus seminars, webinars,
conferences and Technology Day. Lighter weight than a GEMS project, but
broadens exposure beyond the plant.
--------------------------------------------------------------------------
*/
const externalEvents = [

    {
        id: "event-innovista-2026",
        title: "Tata Innovista 2026 - Manufacturing Excellence Category",
        type: "innovista",
        organizer: "Tata Group",
        format: "Hybrid",
        date: "2026-09-14",
        description:
            "Tata Group's flagship innovation award - submit or join a shop-floor entry.",
        competenciesGained: [
            { competencyId: "manufacturing", boost: 3 },
            { competencyId: "artificial-intelligence", boost: 2 }
        ],
        xp: 600
    },

    {
        id: "event-infuse-digital",
        title: "Tata InFuse - Digital & AI Exposure Track",
        type: "infuse",
        organizer: "Tata Group",
        format: "Virtual",
        date: "2026-08-05",
        description:
            "Tata's group-wide digital fluency program, with a capstone showcase.",
        competenciesGained: [
            { competencyId: "artificial-intelligence", boost: 4 },
            { competencyId: "programming", boost: 3 }
        ],
        xp: 450
    },

    {
        id: "event-plant-tech-day",
        title: "Plant Technology Day 2026",
        type: "techday",
        organizer: "Tata Motors - Pune Plant",
        format: "In-person",
        date: "2026-07-22",
        description:
            "A full day of live demos from every department on the plant floor.",
        competenciesGained: [
            { competencyId: "manufacturing", boost: 2 },
            { competencyId: "automation", boost: 2 }
        ],
        xp: 250
    },

    {
        id: "event-lean-webinar-series",
        title: "Lean Manufacturing Webinar Series",
        type: "webinar",
        organizer: "Tata Motors Learning & Development",
        format: "Virtual",
        date: "2026-07-30",
        description:
            "A 4-part speaker series on Lean practice from other manufacturers.",
        competenciesGained: [
            { competencyId: "manufacturing", boost: 2 },
            { competencyId: "quality", boost: 2 }
        ],
        xp: 200
    },

    {
        id: "event-six-sigma-seminar",
        title: "Six Sigma Community Seminar",
        type: "seminar",
        organizer: "Quality Council of India",
        format: "In-person",
        date: "2026-08-18",
        description:
            "A regional seminar on Six Sigma case studies, with networking after.",
        competenciesGained: [
            { competencyId: "quality", boost: 3 }
        ],
        xp: 300
    },

    {
        id: "event-mfg-leadership-conference",
        title: "Manufacturing Leadership Conference",
        type: "conference",
        organizer: "Manufacturing Leadership Council",
        format: "In-person",
        date: "2026-10-02",
        description:
            "A national conference on the future of manufacturing leadership.",
        competenciesGained: [
            { competencyId: "manufacturing", boost: 3 },
            { competencyId: "artificial-intelligence", boost: 2 }
        ],
        xp: 400
    }

];

export default externalEvents;
