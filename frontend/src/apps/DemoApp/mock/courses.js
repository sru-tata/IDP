import {
    Cpu,
    Factory,
    BrainCircuit,
    ShieldCheck,
    Workflow,
    Bot
} from "lucide-react";

import { getVideoById } from "./youtubeVideos";
import { formatDurationLabel } from "../utils/youtube";

/*
--------------------------------------------------------------------------
Course Catalog

Every course wraps a REAL YouTube video (see mock/youtubeVideos.js).
`videoId` is the single source of truth for duration, channel, thumbnail
and the watch/embed links - everything else here is the platform's own
framing (title, XP, difficulty, progress, competency tagging).
--------------------------------------------------------------------------
*/

const CATEGORY_META = {

    Manufacturing: {
        color: "from-orange-500 to-red-500",
        icon: <Factory size={48} />,
        competencyId: "manufacturing"
    },

    Quality: {
        color: "from-green-500 to-emerald-600",
        icon: <ShieldCheck size={48} />,
        competencyId: "quality"
    },

    Programming: {
        color: "from-blue-600 to-cyan-500",
        icon: <Cpu size={48} />,
        competencyId: "programming"
    },

    Automation: {
        color: "from-fuchsia-600 to-purple-700",
        icon: <Bot size={48} />,
        competencyId: "automation"
    },

    "Artificial Intelligence": {
        color: "from-violet-600 to-indigo-600",
        icon: <BrainCircuit size={48} />,
        competencyId: "artificial-intelligence"
    },

    "Industry 4.0": {
        color: "from-sky-600 to-blue-700",
        icon: <Workflow size={48} />,
        competencyId: null
    }

};

function course({
    id,
    videoId,
    title,
    category,
    difficulty,
    xp,
    progress = 0,
    started = false,
    recommended = false,
    completedAt = null,
    learners,
    rating,
    skills = [],
    createdAt
}) {

    const video = getVideoById(videoId);
    const meta = CATEGORY_META[category];

    return {
        id,
        videoId,
        title,
        category,
        competencyId: meta.competencyId,
        difficulty,
        duration: video ? formatDurationLabel(video.durationSeconds) : "",
        xp,
        progress,
        started,
        recommended,
        completedAt,
        learners,
        rating,
        color: meta.color,
        icon: meta.icon,
        shortDescription: video?.description ?? "",
        description: video?.description ?? "",
        skills,
        channelTitle: video?.channel ?? "",
        createdAt
    };
}

const courses = [

    /* ================================================================ */
    /* Manufacturing                                                      */
    /* ================================================================ */

    course({
        id: 1,
        videoId: "TkMbhhfpras",
        title: "Lean Manufacturing Fundamentals",
        category: "Manufacturing",
        difficulty: "Beginner",
        xp: 265,
        progress: 100,
        started: true,
        completedAt: "2026-06-20",
        learners: 842,
        rating: 4.8,
        skills: ["Lean Thinking", "Waste Elimination", "Standard Work"],
        createdAt: 20260201
    }),
    course({
        id: 2,
        videoId: "oarLDeAFSj4",
        title: "The 2-Second Lean Improvement Habit",
        category: "Manufacturing",
        difficulty: "Beginner",
        xp: 220,
        progress: 100,
        started: true,
        completedAt: "2026-06-05",
        learners: 611,
        rating: 4.7,
        skills: ["Lean Culture", "Daily Kaizen"],
        createdAt: 20260204
    }),
    course({
        id: 3,
        videoId: "UMFNys3Yavo",
        title: "Sustaining Lean Improvements on the Floor",
        category: "Manufacturing",
        difficulty: "Intermediate",
        xp: 240,
        progress: 100,
        started: true,
        completedAt: "2026-06-12",
        learners: 405,
        rating: 4.7,
        skills: ["Continuous Improvement", "Productivity"],
        createdAt: 20260208
    }),
    course({
        id: 4,
        videoId: "DJfEWK7GjCo",
        title: "Lean Manufacturing Management Explained",
        category: "Manufacturing",
        difficulty: "Beginner",
        xp: 120,
        progress: 65,
        started: true,
        learners: 298,
        rating: 4.5,
        skills: ["Lean Management"],
        createdAt: 20260305
    }),
    course({
        id: 5,
        videoId: "wfsRAZUnonI",
        title: "The Four Principles of Lean Management",
        category: "Manufacturing",
        difficulty: "Beginner",
        xp: 90,
        recommended: true,
        learners: 733,
        rating: 4.6,
        skills: ["Lean Principles", "Customer Value"],
        createdAt: 20260410
    }),
    course({
        id: 6,
        videoId: "ERYzufU1bQQ",
        title: "Kaizen Culture on the Shop Floor",
        category: "Manufacturing",
        difficulty: "Beginner",
        xp: 180,
        learners: 189,
        rating: 4.6,
        skills: ["Kaizen", "Culture Change"],
        createdAt: 20260502
    }),
    course({
        id: 7,
        videoId: "VnK2XHvMF1Q",
        title: "What Is Kaizen? Continuous Improvement 101",
        category: "Manufacturing",
        difficulty: "Beginner",
        xp: 150,
        learners: 322,
        rating: 4.5,
        skills: ["Kaizen", "Process Thinking"],
        createdAt: 20260514
    }),
    course({
        id: 8,
        videoId: "McqDT1DMlh8",
        title: "Smart Manufacturing & Robotics Overview",
        category: "Manufacturing",
        difficulty: "Intermediate",
        xp: 260,
        learners: 214,
        rating: 4.4,
        skills: ["Robotics", "Smart Factories"],
        createdAt: 20260601
    }),

    /* ================================================================ */
    /* Quality                                                            */
    /* ================================================================ */

    course({
        id: 9,
        videoId: "KfFez57ay6E",
        title: "Six Sigma Green Belt",
        category: "Quality",
        difficulty: "Advanced",
        xp: 900,
        progress: 100,
        started: true,
        completedAt: "2026-05-18",
        learners: 1180,
        rating: 4.9,
        skills: ["DMAIC", "Statistical Tools", "Process Capability"],
        createdAt: 20260112
    }),
    course({
        id: 10,
        videoId: "4oJhV0al6HQ",
        title: "Quality Management Fundamentals",
        category: "Quality",
        difficulty: "Beginner",
        xp: 350,
        progress: 100,
        started: true,
        completedAt: "2026-04-28",
        learners: 654,
        rating: 4.7,
        skills: ["Quality Basics", "Belts Overview"],
        createdAt: 20260115
    }),
    course({
        id: 11,
        videoId: "imHharbZsQ4",
        title: "Six Sigma: Tools & Techniques",
        category: "Quality",
        difficulty: "Intermediate",
        xp: 620,
        progress: 100,
        started: true,
        completedAt: "2026-06-02",
        learners: 512,
        rating: 4.6,
        skills: ["Process Improvement", "Root Cause"],
        createdAt: 20260118
    }),
    course({
        id: 12,
        videoId: "gYp04B3r0Pg",
        title: "Continuous Improvement & Kaizen for Quality Teams",
        category: "Quality",
        difficulty: "Beginner",
        xp: 140,
        recommended: true,
        learners: 176,
        rating: 4.5,
        skills: ["Kaizen", "Quality Culture"],
        createdAt: 20260320
    }),
    course({
        id: 13,
        videoId: "MmsIcO_0_dA",
        title: "Kaizen Methodology for Process Improvement",
        category: "Quality",
        difficulty: "Beginner",
        xp: 160,
        recommended: true,
        learners: 233,
        rating: 4.6,
        skills: ["Kaizen", "Process Mapping"],
        createdAt: 20260322
    }),
    course({
        id: 14,
        videoId: "SxeSdzJOmsk",
        title: "Kaizen the Toyota Way",
        category: "Quality",
        difficulty: "Intermediate",
        xp: 210,
        learners: 145,
        rating: 4.4,
        skills: ["Kaizen", "Toyota Production System"],
        createdAt: 20260406
    }),
    course({
        id: 15,
        videoId: "o91quzxqOxg",
        title: "Kaizen Techniques That Actually Stick",
        category: "Quality",
        difficulty: "Beginner",
        xp: 130,
        learners: 98,
        rating: 4.3,
        skills: ["Kaizen", "Implementation"],
        createdAt: 20260419
    }),
    course({
        id: 16,
        videoId: "OowQcPa9S1w",
        title: "Running a Successful Kaizen Event",
        category: "Quality",
        difficulty: "Intermediate",
        xp: 175,
        learners: 121,
        rating: 4.5,
        skills: ["Kaizen Events", "Facilitation"],
        createdAt: 20260427
    }),

    /* ================================================================ */
    /* Programming                                                        */
    /* ================================================================ */

    course({
        id: 17,
        videoId: "rfscVS0vtbw",
        title: "Python for Engineers",
        category: "Programming",
        difficulty: "Beginner",
        xp: 505,
        progress: 100,
        started: true,
        completedAt: "2026-04-10",
        learners: 1420,
        rating: 4.9,
        skills: ["Python", "Automation Scripting"],
        createdAt: 20260103
    }),
    course({
        id: 18,
        videoId: "HXV3zeQKqGY",
        title: "SQL & Databases for Engineers",
        category: "Programming",
        difficulty: "Beginner",
        xp: 470,
        progress: 100,
        started: true,
        completedAt: "2026-05-02",
        learners: 890,
        rating: 4.8,
        skills: ["SQL", "Databases"],
        createdAt: 20260109
    }),
    course({
        id: 19,
        videoId: "qrbf9DtR3_c",
        title: "Excel for Manufacturing Data Analysis",
        category: "Programming",
        difficulty: "Intermediate",
        xp: 430,
        progress: 100,
        started: true,
        completedAt: "2026-05-25",
        learners: 703,
        rating: 4.6,
        skills: ["Excel", "Pivot Tables", "Data Analysis"],
        createdAt: 20260214
    }),
    course({
        id: 20,
        videoId: "SA_SDo-cqpg",
        title: "Excel Projects for Plant Analysts",
        category: "Programming",
        difficulty: "Beginner",
        xp: 280,
        progress: 75,
        started: true,
        learners: 344,
        rating: 4.5,
        skills: ["Excel", "Reporting"],
        createdAt: 20260318
    }),
    course({
        id: 21,
        videoId: "7QNgqq154gE",
        title: "Power Query to Dashboard in 4 Hours",
        category: "Programming",
        difficulty: "Intermediate",
        xp: 400,
        recommended: true,
        learners: 256,
        rating: 4.6,
        skills: ["Power Query", "Dashboards"],
        createdAt: 20260409
    }),
    course({
        id: 22,
        videoId: "pCJ15nGFgVg",
        title: "Excel Analytics for Operations",
        category: "Programming",
        difficulty: "Beginner",
        xp: 260,
        learners: 187,
        rating: 4.4,
        skills: ["Excel", "Operations Analytics"],
        createdAt: 20260423
    }),
    course({
        id: 23,
        videoId: "XbyiTh-6k9Q",
        title: "Advanced Excel for Data Analysts",
        category: "Programming",
        difficulty: "Advanced",
        xp: 560,
        learners: 162,
        rating: 4.5,
        skills: ["Advanced Formulas", "Automation"],
        createdAt: 20260502
    }),

    /* ================================================================ */
    /* Automation                                                         */
    /* ================================================================ */

    course({
        id: 24,
        videoId: "_oL30hxtwPY",
        title: "Industrial Robotics: Arm Design & Programming",
        category: "Automation",
        difficulty: "Beginner",
        xp: 330,
        progress: 100,
        started: true,
        completedAt: "2026-03-15",
        learners: 402,
        rating: 4.5,
        skills: ["Robot Arms", "Robot Programming"],
        createdAt: 20260130
    }),
    course({
        id: 25,
        videoId: "iqBUpA7fg5E",
        title: "FANUC Robot Programming",
        category: "Automation",
        difficulty: "Intermediate",
        xp: 520,
        progress: 20,
        started: true,
        learners: 361,
        rating: 4.7,
        skills: ["FANUC", "Industrial Robots"],
        createdAt: 20260311
    }),
    course({
        id: 26,
        videoId: "ZBD4jOAuax8",
        title: "Getting Started with Industrial Robotics",
        category: "Automation",
        difficulty: "Beginner",
        xp: 300,
        recommended: true,
        learners: 214,
        rating: 4.4,
        skills: ["Robotics Deployment"],
        createdAt: 20260405
    }),
    course({
        id: 27,
        videoId: "3hreEJzdkYA",
        title: "Programming Multi-Axis Robotic Systems",
        category: "Automation",
        difficulty: "Intermediate",
        xp: 460,
        recommended: true,
        learners: 178,
        rating: 4.5,
        skills: ["Robotic Systems", "Coordination"],
        createdAt: 20260417
    }),
    course({
        id: 28,
        videoId: "ksQrkag-nHI",
        title: "Siemens PLC Programming for Beginners",
        category: "Automation",
        difficulty: "Beginner",
        xp: 640,
        recommended: true,
        learners: 890,
        rating: 4.8,
        skills: ["PLC", "Siemens", "Ladder Logic"],
        createdAt: 20260422
    }),
    course({
        id: 29,
        videoId: "y2eWdLk0-Ho",
        title: "PLC Programming: Getting Started",
        category: "Automation",
        difficulty: "Beginner",
        xp: 210,
        learners: 655,
        rating: 4.7,
        skills: ["PLC Basics"],
        createdAt: 20260501
    }),
    course({
        id: 30,
        videoId: "xBNrifixgjc",
        title: "PLC Programming Demystified",
        category: "Automation",
        difficulty: "Beginner",
        xp: 250,
        learners: 143,
        rating: 4.5,
        skills: ["PLC", "Ladder Logic"],
        createdAt: 20260511
    }),
    course({
        id: 31,
        videoId: "c4VrA0kx5zc",
        title: "PLC Basics: Inputs, Outputs & Logic",
        category: "Automation",
        difficulty: "Beginner",
        xp: 190,
        learners: 165,
        rating: 4.4,
        skills: ["PLC Fundamentals"],
        createdAt: 20260519
    }),

    /* ================================================================ */
    /* Artificial Intelligence                                            */
    /* ================================================================ */

    course({
        id: 32,
        videoId: "oXlwWbU8l2o",
        title: "Computer Vision with OpenCV & Python",
        category: "Artificial Intelligence",
        difficulty: "Intermediate",
        xp: 700,
        progress: 10,
        started: true,
        learners: 512,
        rating: 4.8,
        skills: ["Computer Vision", "OpenCV", "Python"],
        createdAt: 20260401
    }),
    course({
        id: 33,
        videoId: "hhGPiDrUe1c",
        title: "AI & Machine Learning Foundations",
        category: "Artificial Intelligence",
        difficulty: "Beginner",
        xp: 780,
        progress: 25,
        started: true,
        learners: 388,
        rating: 4.6,
        skills: ["AI Fundamentals", "Machine Learning"],
        createdAt: 20260408
    }),
    course({
        id: 34,
        videoId: "MsVujBISof8",
        title: "AI & Machine Learning for Engineers",
        category: "Artificial Intelligence",
        difficulty: "Beginner",
        xp: 745,
        recommended: true,
        learners: 265,
        rating: 4.6,
        skills: ["Neural Networks", "Applied AI"],
        createdAt: 20260416
    }),
    course({
        id: 35,
        videoId: "N8svLoC2eNA",
        title: "Applied Machine Learning Workflows",
        category: "Artificial Intelligence",
        difficulty: "Intermediate",
        xp: 810,
        recommended: true,
        learners: 201,
        rating: 4.5,
        skills: ["ML Workflows", "Model Evaluation"],
        createdAt: 20260420
    }),
    course({
        id: 36,
        videoId: "jOIKxfHJuNs",
        title: "AI & Machine Learning Certification Prep",
        category: "Artificial Intelligence",
        difficulty: "Advanced",
        xp: 980,
        recommended: true,
        learners: 97,
        rating: 4.4,
        skills: ["Statistics", "Deployment"],
        createdAt: 20260428
    }),
    course({
        id: 37,
        videoId: "6WmtIaIX-bQ",
        title: "Advanced Artificial Intelligence",
        category: "Artificial Intelligence",
        difficulty: "Advanced",
        xp: 940,
        recommended: true,
        learners: 342,
        rating: 4.6,
        skills: ["Search Algorithms", "Expert Systems"],
        createdAt: 20260505
    }),
    course({
        id: 38,
        videoId: "FkqINm-l3q0",
        title: "Generative AI for Manufacturing",
        category: "Artificial Intelligence",
        difficulty: "Advanced",
        xp: 860,
        learners: 156,
        rating: 4.5,
        skills: ["Generative AI", "Applied Tooling"],
        createdAt: 20260513
    }),
    course({
        id: 39,
        videoId: "rUOlX3uuUr4",
        title: "Generative Digital Twins & the Future of Industry 4.0",
        category: "Artificial Intelligence",
        difficulty: "Advanced",
        xp: 410,
        learners: 88,
        rating: 4.5,
        skills: ["Digital Twin", "Generative AI"],
        createdAt: 20260528
    }),

    /* ================================================================ */
    /* Industry 4.0                                                       */
    /* ================================================================ */

    course({
        id: 40,
        videoId: "opcrVfHb3A0",
        title: "Getting Started with Industry 4.0",
        category: "Industry 4.0",
        difficulty: "Beginner",
        xp: 330,
        progress: 100,
        started: true,
        completedAt: "2026-02-20",
        learners: 245,
        rating: 4.5,
        skills: ["Industry 4.0", "Digital Twin"],
        createdAt: 20260220
    }),
    course({
        id: 41,
        videoId: "eZDkSNHaWh8",
        title: "Digital Transformation Project Management",
        category: "Industry 4.0",
        difficulty: "Beginner",
        xp: 620,
        progress: 100,
        started: true,
        completedAt: "2026-03-30",
        learners: 578,
        rating: 4.7,
        skills: ["Project Management", "Digital Transformation"],
        createdAt: 20260225
    }),
    course({
        id: 42,
        videoId: "-84E_-aTpck",
        title: "Leading Digital Transformation Initiatives",
        category: "Industry 4.0",
        difficulty: "Intermediate",
        xp: 640,
        progress: 55,
        started: true,
        learners: 401,
        rating: 4.6,
        skills: ["Agile Delivery", "Stakeholder Management"],
        createdAt: 20260318
    }),
    course({
        id: 43,
        videoId: "N8Bvmx3Sr28",
        title: "Preparing for a Connected Production Line",
        category: "Industry 4.0",
        difficulty: "Beginner",
        xp: 150,
        recommended: true,
        learners: 132,
        rating: 4.3,
        skills: ["IIoT Readiness", "PLC Planning"],
        createdAt: 20260406
    }),
    course({
        id: 44,
        videoId: "KRJ6Qz3hwZw",
        title: "Programming a Connected Automation Cell",
        category: "Industry 4.0",
        difficulty: "Intermediate",
        xp: 540,
        learners: 289,
        rating: 4.6,
        skills: ["Allen Bradley", "Cell Integration"],
        createdAt: 20260421
    }),
    course({
        id: 45,
        videoId: "1WQ70KJu6EY",
        title: "Ladder Logic for Connected Factories",
        category: "Industry 4.0",
        difficulty: "Beginner",
        xp: 190,
        learners: 176,
        rating: 4.4,
        skills: ["Ladder Logic", "Controls"],
        createdAt: 20260430
    })

];

export default courses;
