import { buildNode, buildExperienceNode, buildExposureNode } from "./nodeBuilder";

const seniorManufacturingEngineer = {

    id: "senior-manufacturing-engineer",

    title: "Senior Manufacturing Engineer",

    estimatedMonths: 5,

    totalCourses: 15,

    competencies: [

        "Manufacturing",
        "Quality",
        "Programming",
        "Automation",
        "Artificial Intelligence"

    ],

    nodes: [

        // -------------------------------
        // Beginner
        // -------------------------------

        buildNode({
            id: "manufacturing-basics",
            title: "Manufacturing Basics",
            level: "Beginner",
            competency: "Manufacturing",
            videoId: "DJfEWK7GjCo",
            xp: 300,
            completed: true,
            unlocked: true,
            prerequisites: []
        }),

        buildNode({
            id: "quality-basics",
            title: "Quality Fundamentals",
            level: "Beginner",
            competency: "Quality",
            videoId: "4oJhV0al6HQ",
            xp: 350,
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        buildNode({
            id: "python-engineers",
            title: "Python For Engineers",
            level: "Beginner",
            competency: "Programming",
            videoId: "rfscVS0vtbw",
            xp: 400,
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        buildExposureNode({
            id: "plant-tech-day",
            level: "Beginner",
            competency: "Manufacturing",
            activityType: "event",
            activityId: "event-plant-tech-day",
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        // -------------------------------
        // Intermediate
        // -------------------------------

        buildNode({
            id: "lean",
            title: "Lean Manufacturing",
            level: "Intermediate",
            competency: "Manufacturing",
            videoId: "TkMbhhfpras",
            xp: 550,
            completed: false,
            unlocked: false,
            prerequisites: ["manufacturing-basics"]
        }),

        buildNode({
            id: "six-sigma",
            title: "Six Sigma Green Belt",
            level: "Intermediate",
            competency: "Quality",
            videoId: "KfFez57ay6E",
            xp: 700,
            completed: false,
            unlocked: false,
            prerequisites: ["quality-basics"]
        }),

        buildNode({
            id: "plc",
            title: "PLC Programming",
            level: "Intermediate",
            competency: "Automation",
            videoId: "ksQrkag-nHI",
            xp: 650,
            completed: false,
            unlocked: false,
            prerequisites: ["python-engineers"]
        }),

        buildNode({
            id: "computer-vision",
            title: "Computer Vision",
            level: "Intermediate",
            competency: "Artificial Intelligence",
            videoId: "oXlwWbU8l2o",
            xp: 800,
            completed: false,
            unlocked: false,
            prerequisites: ["python-engineers"]
        }),

        buildExperienceNode({
            id: "quality-floor-rotation",
            level: "Intermediate",
            competency: "Quality",
            rotationId: "rotation-quality-floor",
            completed: false,
            unlocked: false,
            prerequisites: ["six-sigma"]
        }),

        buildExperienceNode({
            id: "automation-cell-rotation",
            level: "Intermediate",
            competency: "Automation",
            rotationId: "rotation-automation-cell",
            completed: false,
            unlocked: false,
            prerequisites: ["plc"]
        }),

        // -------------------------------
        // Advanced
        // -------------------------------

        buildNode({
            id: "smart-factory",
            title: "Smart Factory Systems",
            level: "Advanced",
            competency: "Manufacturing",
            videoId: "McqDT1DMlh8",
            xp: 900,
            completed: false,
            unlocked: false,
            prerequisites: ["lean", "automation-cell-rotation"]
        }),

        buildNode({
            id: "advanced-quality",
            title: "Advanced Quality Systems",
            level: "Advanced",
            competency: "Quality",
            videoId: "imHharbZsQ4",
            xp: 850,
            completed: false,
            unlocked: false,
            prerequisites: ["quality-floor-rotation"]
        }),

        buildExposureNode({
            id: "predictive-maintenance-gems",
            level: "Advanced",
            competency: "Automation",
            activityType: "gems",
            activityId: "gems-predictive-maintenance",
            completed: false,
            unlocked: false,
            prerequisites: ["computer-vision"]
        }),

        buildNode({
            id: "ai-manufacturing",
            title: "AI For Manufacturing",
            level: "Advanced",
            competency: "Artificial Intelligence",
            videoId: "FkqINm-l3q0",
            xp: 1100,
            completed: false,
            unlocked: false,
            prerequisites: ["smart-factory", "predictive-maintenance-gems"]
        }),

        buildExposureNode({
            id: "innovista-showcase",
            level: "Advanced",
            competency: "Artificial Intelligence",
            activityType: "event",
            activityId: "event-innovista-2026",
            completed: false,
            unlocked: false,
            prerequisites: ["ai-manufacturing"]
        })

    ]

};

export default seniorManufacturingEngineer;
