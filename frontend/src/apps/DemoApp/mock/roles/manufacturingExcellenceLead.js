import { buildNode, buildExperienceNode, buildExposureNode } from "./nodeBuilder";

const manufacturingExcellenceLead = {

    id: "manufacturing-excellence-lead",

    title: "Manufacturing Excellence Lead",

    estimatedMonths: 15,

    totalCourses: 13,

    competencies: [

        "Manufacturing",
        "Quality",
        "Programming",
        "Automation",
        "Artificial Intelligence"

    ],

    nodes: [

        // Beginner

        buildNode({
            id: "operational-excellence-basics",
            title: "Operational Excellence Basics",
            level: "Beginner",
            competency: "Manufacturing",
            videoId: "oarLDeAFSj4",
            xp: 300,
            completed: true,
            unlocked: true,
            prerequisites: []
        }),

        buildNode({
            id: "quality-culture-foundations",
            title: "Quality Culture Foundations",
            level: "Beginner",
            competency: "Quality",
            videoId: "gYp04B3r0Pg",
            xp: 300,
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        buildNode({
            id: "data-literacy",
            title: "Data Literacy for Excellence Teams",
            level: "Beginner",
            competency: "Programming",
            videoId: "qrbf9DtR3_c",
            xp: 380,
            completed: false,
            unlocked: true,
            prerequisites: []
        }),

        buildExposureNode({
            id: "onboarding-redesign-gems",
            level: "Beginner",
            competency: "Quality",
            activityType: "gems",
            activityId: "gems-onboarding-buddy",
            completed: false,
            unlocked: false,
            prerequisites: ["quality-culture-foundations"]
        }),

        // Intermediate

        buildNode({
            id: "lean-six-sigma-integration",
            title: "Lean Six Sigma Integration",
            level: "Intermediate",
            competency: "Quality",
            videoId: "KfFez57ay6E",
            xp: 700,
            completed: false,
            unlocked: false,
            prerequisites: ["quality-culture-foundations"]
        }),

        buildNode({
            id: "kaizen-leadership",
            title: "Kaizen Leadership",
            level: "Intermediate",
            competency: "Manufacturing",
            videoId: "SxeSdzJOmsk",
            xp: 500,
            completed: false,
            unlocked: false,
            prerequisites: ["operational-excellence-basics"]
        }),

        buildNode({
            id: "automation-for-excellence-teams",
            title: "Automation for Excellence Teams",
            level: "Intermediate",
            competency: "Automation",
            videoId: "ksQrkag-nHI",
            xp: 600,
            completed: false,
            unlocked: false,
            prerequisites: ["data-literacy"]
        }),

        buildExperienceNode({
            id: "industry4-lab-rotation",
            level: "Intermediate",
            competency: "Automation",
            rotationId: "rotation-industry4-lab",
            completed: false,
            unlocked: false,
            prerequisites: ["automation-for-excellence-teams"]
        }),

        // Advanced

        buildNode({
            id: "digital-twin-for-excellence",
            title: "Digital Twin for Excellence",
            level: "Advanced",
            competency: "Artificial Intelligence",
            videoId: "opcrVfHb3A0",
            xp: 700,
            completed: false,
            unlocked: false,
            prerequisites: ["industry4-lab-rotation"]
        }),

        buildExposureNode({
            id: "digital-twin-poc-gems",
            level: "Advanced",
            competency: "Artificial Intelligence",
            activityType: "gems",
            activityId: "gems-digital-twin-poc",
            completed: false,
            unlocked: false,
            prerequisites: ["digital-twin-for-excellence"]
        }),

        buildNode({
            id: "enterprise-continuous-improvement",
            title: "Enterprise Continuous Improvement",
            level: "Advanced",
            competency: "Manufacturing",
            videoId: "UMFNys3Yavo",
            xp: 800,
            completed: false,
            unlocked: false,
            prerequisites: ["kaizen-leadership", "lean-six-sigma-integration"]
        }),

        buildNode({
            id: "leading-excellence-transformation",
            title: "Leading Excellence Transformation",
            level: "Advanced",
            competency: "Manufacturing",
            videoId: "rUOlX3uuUr4",
            xp: 950,
            completed: false,
            unlocked: false,
            prerequisites: ["enterprise-continuous-improvement", "digital-twin-poc-gems"]
        }),

        buildExposureNode({
            id: "innovista-showcase",
            level: "Advanced",
            competency: "Manufacturing",
            activityType: "event",
            activityId: "event-innovista-2026",
            completed: false,
            unlocked: false,
            prerequisites: ["leading-excellence-transformation"]
        })

    ]

};

export default manufacturingExcellenceLead;
