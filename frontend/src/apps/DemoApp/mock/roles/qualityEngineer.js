import { buildNode, buildExperienceNode, buildExposureNode } from "./nodeBuilder";

const qualityEngineer = {

    id: "quality-engineer",

    title: "Quality Engineer",

    estimatedMonths: 6,

    totalCourses: 13,

    competencies: [

        "Quality",
        "Manufacturing",
        "Programming",
        "Automation",
        "Artificial Intelligence"

    ],

    nodes: [

        // Beginner

        buildNode({
            id: "quality-basics",
            title: "Quality Fundamentals",
            level: "Beginner",
            competency: "Quality",
            videoId: "4oJhV0al6HQ",
            xp: 300,
            completed: true,
            unlocked: true,
            prerequisites: []
        }),

        buildNode({
            id: "statistics-for-quality",
            title: "Statistics & Data Analysis for Quality",
            level: "Beginner",
            competency: "Programming",
            videoId: "qrbf9DtR3_c",
            xp: 380,
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        buildNode({
            id: "manufacturing-context",
            title: "Manufacturing Context for Quality",
            level: "Beginner",
            competency: "Manufacturing",
            videoId: "TkMbhhfpras",
            xp: 300,
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        buildExposureNode({
            id: "lean-webinar-series",
            level: "Beginner",
            competency: "Manufacturing",
            activityType: "event",
            activityId: "event-lean-webinar-series",
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        buildExposureNode({
            id: "six-sigma-seminar",
            level: "Beginner",
            competency: "Quality",
            activityType: "event",
            activityId: "event-six-sigma-seminar",
            completed: false,
            unlocked: false,
            prerequisites: ["quality-basics"]
        }),

        // Intermediate

        buildNode({
            id: "six-sigma-green-belt",
            title: "Six Sigma Green Belt",
            level: "Intermediate",
            competency: "Quality",
            videoId: "KfFez57ay6E",
            xp: 700,
            completed: false,
            unlocked: false,
            prerequisites: ["quality-basics", "statistics-for-quality"]
        }),

        buildNode({
            id: "root-cause-kaizen",
            title: "Root Cause Analysis & Kaizen",
            level: "Intermediate",
            competency: "Quality",
            videoId: "MmsIcO_0_dA",
            xp: 420,
            completed: false,
            unlocked: false,
            prerequisites: ["quality-basics"]
        }),

        buildNode({
            id: "quality-automation-tools",
            title: "Automation Tools for Quality",
            level: "Intermediate",
            competency: "Automation",
            videoId: "xBNrifixgjc",
            xp: 450,
            completed: false,
            unlocked: false,
            prerequisites: ["manufacturing-context"]
        }),

        buildExposureNode({
            id: "scrap-reduction-gems",
            level: "Intermediate",
            competency: "Quality",
            activityType: "gems",
            activityId: "gems-scrap-reduction",
            completed: false,
            unlocked: false,
            prerequisites: ["root-cause-kaizen"]
        }),

        // Advanced

        buildExperienceNode({
            id: "quality-floor-rotation",
            level: "Advanced",
            competency: "Quality",
            rotationId: "rotation-quality-floor",
            completed: false,
            unlocked: false,
            prerequisites: ["six-sigma-green-belt"]
        }),

        buildNode({
            id: "advanced-six-sigma-tools",
            title: "Advanced Six Sigma Tools",
            level: "Advanced",
            competency: "Quality",
            videoId: "imHharbZsQ4",
            xp: 750,
            completed: false,
            unlocked: false,
            prerequisites: ["quality-floor-rotation"]
        }),

        buildNode({
            id: "computer-vision-for-inspection",
            title: "Computer Vision for Inspection",
            level: "Advanced",
            competency: "Artificial Intelligence",
            videoId: "oXlwWbU8l2o",
            xp: 800,
            completed: false,
            unlocked: false,
            prerequisites: ["quality-automation-tools"]
        }),

        buildNode({
            id: "quality-4-0",
            title: "Quality 4.0",
            level: "Advanced",
            competency: "Quality",
            videoId: "rUOlX3uuUr4",
            xp: 850,
            completed: false,
            unlocked: false,
            prerequisites: ["advanced-six-sigma-tools", "computer-vision-for-inspection"]
        })

    ]

};

export default qualityEngineer;
