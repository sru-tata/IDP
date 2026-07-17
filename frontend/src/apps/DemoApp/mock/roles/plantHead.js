import { buildNode, buildExperienceNode, buildExposureNode } from "./nodeBuilder";

const plantHead = {

    id: "plant-head",

    title: "Plant Head",

    estimatedMonths: 24,

    totalCourses: 15,

    competencies: [

        "Manufacturing",
        "Quality",
        "Automation",
        "Artificial Intelligence",
        "Programming"

    ],

    nodes: [

        // Beginner

        buildNode({
            id: "manufacturing-leadership-basics",
            title: "Manufacturing Leadership Basics",
            level: "Beginner",
            competency: "Manufacturing",
            videoId: "DJfEWK7GjCo",
            xp: 300,
            completed: true,
            unlocked: true,
            prerequisites: []
        }),

        buildNode({
            id: "quality-systems-overview",
            title: "Quality Systems Overview",
            level: "Beginner",
            competency: "Quality",
            videoId: "4oJhV0al6HQ",
            xp: 320,
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        buildNode({
            id: "financial-and-project-literacy",
            title: "Financial & Project Literacy",
            level: "Beginner",
            competency: "Programming",
            videoId: "eZDkSNHaWh8",
            xp: 400,
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        buildExposureNode({
            id: "infuse-digital",
            level: "Beginner",
            competency: "Artificial Intelligence",
            activityType: "event",
            activityId: "event-infuse-digital",
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        // Intermediate

        buildNode({
            id: "lean-transformation",
            title: "Lean Transformation",
            level: "Intermediate",
            competency: "Manufacturing",
            videoId: "oarLDeAFSj4",
            xp: 550,
            completed: false,
            unlocked: false,
            prerequisites: ["manufacturing-leadership-basics"]
        }),

        buildNode({
            id: "six-sigma-black-belt-concepts",
            title: "Six Sigma Black Belt Concepts",
            level: "Intermediate",
            competency: "Quality",
            videoId: "KfFez57ay6E",
            xp: 750,
            completed: false,
            unlocked: false,
            prerequisites: ["quality-systems-overview"]
        }),

        buildNode({
            id: "industry-4-foundations",
            title: "Industry 4.0 Foundations",
            level: "Intermediate",
            competency: "Manufacturing",
            videoId: "opcrVfHb3A0",
            xp: 500,
            completed: false,
            unlocked: false,
            prerequisites: ["manufacturing-leadership-basics"]
        }),

        buildExperienceNode({
            id: "plant-ops-shadow-rotation",
            level: "Intermediate",
            competency: "Manufacturing",
            rotationId: "rotation-plant-ops-shadow",
            completed: false,
            unlocked: false,
            prerequisites: ["manufacturing-leadership-basics"]
        }),

        // Advanced

        buildNode({
            id: "leading-digital-transformation",
            title: "Leading Digital Transformation",
            level: "Advanced",
            competency: "Manufacturing",
            videoId: "-84E_-aTpck",
            xp: 800,
            completed: false,
            unlocked: false,
            prerequisites: ["industry-4-foundations", "financial-and-project-literacy"]
        }),

        buildNode({
            id: "plant-wide-automation-strategy",
            title: "Plant-Wide Automation Strategy",
            level: "Advanced",
            competency: "Automation",
            videoId: "iqBUpA7fg5E",
            xp: 750,
            completed: false,
            unlocked: false,
            prerequisites: ["industry-4-foundations"]
        }),

        buildExperienceNode({
            id: "industry4-lab-rotation",
            level: "Advanced",
            competency: "Automation",
            rotationId: "rotation-industry4-lab",
            completed: false,
            unlocked: false,
            prerequisites: ["industry-4-foundations"]
        }),

        buildNode({
            id: "ai-driven-operations",
            title: "AI-Driven Operations",
            level: "Advanced",
            competency: "Artificial Intelligence",
            videoId: "rUOlX3uuUr4",
            xp: 700,
            completed: false,
            unlocked: false,
            prerequisites: ["leading-digital-transformation", "industry4-lab-rotation"]
        }),

        buildNode({
            id: "enterprise-quality-excellence",
            title: "Enterprise Quality Excellence",
            level: "Advanced",
            competency: "Quality",
            videoId: "imHharbZsQ4",
            xp: 800,
            completed: false,
            unlocked: false,
            prerequisites: ["six-sigma-black-belt-concepts"]
        }),

        buildNode({
            id: "strategic-plant-leadership",
            title: "Strategic Plant Leadership",
            level: "Advanced",
            competency: "Manufacturing",
            videoId: "McqDT1DMlh8",
            xp: 1000,
            completed: false,
            unlocked: false,
            prerequisites: [
                "plant-wide-automation-strategy",
                "ai-driven-operations",
                "enterprise-quality-excellence",
                "plant-ops-shadow-rotation"
            ]
        }),

        buildExposureNode({
            id: "innovista-showcase",
            level: "Advanced",
            competency: "Manufacturing",
            activityType: "event",
            activityId: "event-innovista-2026",
            completed: false,
            unlocked: false,
            prerequisites: ["strategic-plant-leadership"]
        })

    ]

};

export default plantHead;
