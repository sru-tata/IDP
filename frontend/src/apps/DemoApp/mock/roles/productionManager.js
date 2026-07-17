import { buildNode, buildExperienceNode, buildExposureNode } from "./nodeBuilder";

const productionManager = {

    id: "production-manager",

    title: "Production Manager",

    estimatedMonths: 9,

    totalCourses: 14,

    competencies: [

        "Manufacturing",
        "Quality",
        "Programming",
        "Automation"

    ],

    nodes: [

        // Beginner

        buildNode({
            id: "production-planning",
            title: "Production Planning Essentials",
            level: "Beginner",
            competency: "Manufacturing",
            videoId: "DJfEWK7GjCo",
            xp: 300,
            completed: true,
            unlocked: true,
            prerequisites: []
        }),

        buildNode({
            id: "quality-fundamentals",
            title: "Quality Fundamentals",
            level: "Beginner",
            competency: "Quality",
            videoId: "4oJhV0al6HQ",
            xp: 320,
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        buildNode({
            id: "excel-for-managers",
            title: "Excel for Production Managers",
            level: "Beginner",
            competency: "Programming",
            videoId: "qrbf9DtR3_c",
            xp: 350,
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        buildExperienceNode({
            id: "supply-chain-rotation",
            level: "Beginner",
            competency: "Manufacturing",
            rotationId: "rotation-supply-chain-hub",
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        // Intermediate

        buildNode({
            id: "lean-operations",
            title: "Lean Operations Management",
            level: "Intermediate",
            competency: "Manufacturing",
            videoId: "TkMbhhfpras",
            xp: 550,
            completed: false,
            unlocked: false,
            prerequisites: ["production-planning"]
        }),

        buildNode({
            id: "six-sigma-for-managers",
            title: "Six Sigma for Managers",
            level: "Intermediate",
            competency: "Quality",
            videoId: "imHharbZsQ4",
            xp: 620,
            completed: false,
            unlocked: false,
            prerequisites: ["quality-fundamentals"]
        }),

        buildNode({
            id: "automation-oversight",
            title: "Automation Oversight",
            level: "Intermediate",
            competency: "Automation",
            videoId: "ZBD4jOAuax8",
            xp: 500,
            completed: false,
            unlocked: false,
            prerequisites: ["excel-for-managers"]
        }),

        buildNode({
            id: "kaizen-facilitation",
            title: "Kaizen Event Facilitation",
            level: "Intermediate",
            competency: "Quality",
            videoId: "OowQcPa9S1w",
            xp: 400,
            completed: false,
            unlocked: false,
            prerequisites: ["quality-fundamentals"]
        }),

        buildExposureNode({
            id: "cost-savings-gems",
            level: "Intermediate",
            competency: "Manufacturing",
            activityType: "gems",
            activityId: "gems-cost-savings-challenge",
            completed: false,
            unlocked: false,
            prerequisites: ["excel-for-managers"]
        }),

        // Advanced

        buildNode({
            id: "project-management-for-plants",
            title: "Project Management for Plants",
            level: "Advanced",
            competency: "Manufacturing",
            videoId: "eZDkSNHaWh8",
            xp: 750,
            completed: false,
            unlocked: false,
            prerequisites: ["lean-operations"]
        }),

        buildNode({
            id: "digital-transformation-leadership",
            title: "Leading Digital Transformation",
            level: "Advanced",
            competency: "Manufacturing",
            videoId: "-84E_-aTpck",
            xp: 800,
            completed: false,
            unlocked: false,
            prerequisites: ["automation-oversight", "project-management-for-plants"]
        }),

        buildExperienceNode({
            id: "plant-ops-shadow-rotation",
            level: "Advanced",
            competency: "Manufacturing",
            rotationId: "rotation-plant-ops-shadow",
            completed: false,
            unlocked: false,
            prerequisites: ["lean-operations", "project-management-for-plants"]
        }),

        buildNode({
            id: "advanced-production-systems",
            title: "Advanced Production Systems",
            level: "Advanced",
            competency: "Manufacturing",
            videoId: "McqDT1DMlh8",
            xp: 900,
            completed: false,
            unlocked: false,
            prerequisites: ["six-sigma-for-managers", "kaizen-facilitation", "plant-ops-shadow-rotation"]
        }),

        buildExposureNode({
            id: "mfg-leadership-conference",
            level: "Advanced",
            competency: "Manufacturing",
            activityType: "event",
            activityId: "event-mfg-leadership-conference",
            completed: false,
            unlocked: false,
            prerequisites: ["digital-transformation-leadership"]
        })

    ]

};

export default productionManager;
