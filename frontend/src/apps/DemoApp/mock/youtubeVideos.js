/*
--------------------------------------------------------------------------
YouTube Video Library

This is the curated pool of REAL, publicly available YouTube videos that
back every course in the platform. Every `id` below is a real YouTube
video ID - press "Watch on YouTube" on any course and it opens the actual
video. The platform embeds them directly (youtube-nocookie.com/embed)
without needing a YouTube Data API key, exactly like a production app
would once its backend proxies the real YouTube Data API v3.

Fields intentionally mirror the shape YouTube's Data API returns
(snippet + contentDetails + statistics), flattened for convenience.
--------------------------------------------------------------------------
*/

const youtubeVideos = [

    /* ---------------------------------------------------------------- */
    /* Manufacturing                                                      */
    /* ---------------------------------------------------------------- */

    {
        id: "TkMbhhfpras",
        title: "Lean Manufacturing Principles and Lean Manufacturing Tools",
        channel: "Lean Manufacturing Tools",
        category: "Manufacturing",
        level: "Beginner",
        durationSeconds: 660,
        publishedAt: "2019-03-11",
        views: 812000,
        description: "A practical walkthrough of core lean manufacturing principles - eliminating waste, standard work and continuous flow - with real shop-floor examples.",
        tags: ["lean", "manufacturing", "waste elimination", "continuous flow"]
    },
    {
        id: "oarLDeAFSj4",
        title: "Lean Manufacturing: The Path to Success with Paul Akers (Pt. 1)",
        channel: "Paul Akers / FastCap",
        category: "Manufacturing",
        level: "Beginner",
        durationSeconds: 840,
        publishedAt: "2020-02-12",
        views: 245000,
        description: "FastCap founder Paul Akers shows how the 2-second lean improvement habit transforms a factory floor and a company culture.",
        tags: ["lean", "2 second lean", "culture", "kaizen"]
    },
    {
        id: "UMFNys3Yavo",
        title: "Lean Manufacturing: The Path to Success with Paul Akers (Pt. 2)",
        channel: "Paul Akers / FastCap",
        category: "Manufacturing",
        level: "Intermediate",
        durationSeconds: 780,
        publishedAt: "2020-02-19",
        views: 168000,
        description: "The follow-up walkthrough of how small daily improvements compound into major manufacturing productivity gains.",
        tags: ["lean", "continuous improvement", "productivity"]
    },
    {
        id: "DJfEWK7GjCo",
        title: "Learn about Lean Manufacturing Management (3 Minutes)",
        channel: "Lean Manufacturing Explained",
        category: "Manufacturing",
        level: "Beginner",
        durationSeconds: 180,
        publishedAt: "2024-11-30",
        views: 94000,
        description: "A fast, three-minute primer on what lean manufacturing management means and why manufacturers adopt it.",
        tags: ["lean", "management", "primer"]
    },
    {
        id: "wfsRAZUnonI",
        title: "Four Principles Lean Management - Get Lean in 90 Seconds",
        channel: "Four Principles",
        category: "Manufacturing",
        level: "Beginner",
        durationSeconds: 90,
        publishedAt: "2012-05-24",
        views: 512000,
        description: "A 90 second explainer covering the four principles that eliminate waste and build customer value into every process.",
        tags: ["lean management", "waste", "value"]
    },
    {
        id: "ERYzufU1bQQ",
        title: "Kaizen Culture Explained: What \"Continuous Improvement\" Really Means",
        channel: "Kaizen Culture",
        category: "Manufacturing",
        level: "Beginner",
        durationSeconds: 540,
        publishedAt: "2025-12-05",
        views: 61000,
        description: "Breaks down why Kaizen is about small, everyday changes rather than one-off transformation projects.",
        tags: ["kaizen", "culture", "continuous improvement"]
    },
    {
        id: "VnK2XHvMF1Q",
        title: "What is Kaizen? and Continuous Improvement?",
        channel: "Kaizen Mastery",
        category: "Manufacturing",
        level: "Beginner",
        durationSeconds: 360,
        publishedAt: "2022-02-17",
        views: 143000,
        description: "An accessible introduction to the Kaizen philosophy of change (kai) for the good (zen) on the production floor.",
        tags: ["kaizen", "philosophy", "improvement"]
    },
    {
        id: "McqDT1DMlh8",
        title: "Industrial Robotics and Automation - Course Introduction",
        channel: "Robotics & Automation Academy",
        category: "Manufacturing",
        level: "Intermediate",
        durationSeconds: 300,
        publishedAt: "2021-06-02",
        views: 78000,
        description: "Sets the stage for how robotics and automation reshape modern manufacturing lines and plant operations.",
        tags: ["automation", "robotics", "smart factory"]
    },

    /* ---------------------------------------------------------------- */
    /* Quality                                                            */
    /* ---------------------------------------------------------------- */

    {
        id: "KfFez57ay6E",
        title: "Six Sigma Full Course in 7 Hours | Six Sigma Green Belt Training",
        channel: "Simplilearn",
        category: "Quality",
        level: "Advanced",
        durationSeconds: 25200,
        publishedAt: "2021-02-07",
        views: 1900000,
        description: "A complete Six Sigma Green Belt training covering DMAIC, statistical tools and how to run a real improvement project end to end.",
        tags: ["six sigma", "green belt", "DMAIC", "quality"]
    },
    {
        id: "4oJhV0al6HQ",
        title: "Six Sigma Green Belt Training Video | Six Sigma Tutorial Part 1",
        channel: "Simplilearn",
        category: "Quality",
        level: "Beginner",
        durationSeconds: 9000,
        publishedAt: "2015-07-23",
        views: 980000,
        description: "Introduces the Six Sigma Green Belt body of knowledge, quality fundamentals and where Green Belt fits alongside Lean.",
        tags: ["six sigma", "quality", "fundamentals"]
    },
    {
        id: "imHharbZsQ4",
        title: "Six Sigma Course 2023 | Six Sigma Complete Course",
        channel: "Simplilearn",
        category: "Quality",
        level: "Intermediate",
        durationSeconds: 21600,
        publishedAt: "2023-10-15",
        views: 540000,
        description: "An updated, complete run through Six Sigma tools, roles and belts for quality professionals.",
        tags: ["six sigma", "quality management", "process improvement"]
    },
    {
        id: "gYp04B3r0Pg",
        title: "Continuous Improvement & Kaizen",
        channel: "Lean Six Sigma Training",
        category: "Quality",
        level: "Beginner",
        durationSeconds: 720,
        publishedAt: "2023-07-12",
        views: 52000,
        description: "Explains the philosophy behind Kaizen and continuous improvement inside a Lean Six Sigma quality program.",
        tags: ["kaizen", "continuous improvement", "lean six sigma"]
    },
    {
        id: "MmsIcO_0_dA",
        title: "Kaizen Methodology Tutorial for Continuous Process Improvement",
        channel: "Invensis Learning",
        category: "Quality",
        level: "Beginner",
        durationSeconds: 900,
        publishedAt: "2021-03-03",
        views: 187000,
        description: "A structured tutorial on applying the Kaizen methodology to drive incremental process improvement.",
        tags: ["kaizen", "process improvement", "quality tools"]
    },
    {
        id: "SxeSdzJOmsk",
        title: "Kaizen | Kaizen Continuous Improvement | Kaizen Toyota | Kaizen Training",
        channel: "ISO Certification Training",
        category: "Quality",
        level: "Intermediate",
        durationSeconds: 1200,
        publishedAt: "2016-09-23",
        views: 231000,
        description: "Covers how Toyota institutionalized Kaizen as a quality discipline and how auditors evaluate it.",
        tags: ["kaizen", "toyota", "quality audits"]
    },
    {
        id: "o91quzxqOxg",
        title: "Kaizen Methodology Tutorial for Continuous Process Improvement (Japanese Technique)",
        channel: "Kaizen Training",
        category: "Quality",
        level: "Beginner",
        durationSeconds: 600,
        publishedAt: "2023-09-03",
        views: 44000,
        description: "Walks through the origins of the Kaizen technique and how to implement it for measurable results.",
        tags: ["kaizen", "quality culture", "technique"]
    },
    {
        id: "OowQcPa9S1w",
        title: "Kaizen Continuous Improvement (Key Steps for Success)",
        channel: "Lean Kaizen Coach",
        category: "Quality",
        level: "Intermediate",
        durationSeconds: 480,
        publishedAt: "2020-09-15",
        views: 39000,
        description: "Five essential elements every Kaizen event needs to sustain long-term continuous improvement.",
        tags: ["kaizen", "quality events", "sustainability"]
    },

    /* ---------------------------------------------------------------- */
    /* Programming                                                        */
    /* ---------------------------------------------------------------- */

    {
        id: "rfscVS0vtbw",
        title: "Learn Python - Full Course for Beginners",
        channel: "freeCodeCamp.org",
        category: "Programming",
        level: "Beginner",
        durationSeconds: 16012,
        publishedAt: "2018-07-11",
        views: 46000000,
        description: "The famous freeCodeCamp Python course - variables, loops, functions, OOP and several hands-on beginner projects.",
        tags: ["python", "programming basics", "projects"]
    },
    {
        id: "HXV3zeQKqGY",
        title: "SQL Tutorial - Full Database Course for Beginners",
        channel: "freeCodeCamp.org",
        category: "Programming",
        level: "Beginner",
        durationSeconds: 15120,
        publishedAt: "2018-07-02",
        views: 13500000,
        description: "Learn relational database design and SQL fundamentals using MySQL, from tables and keys to joins and ER diagrams.",
        tags: ["sql", "databases", "mysql"]
    },
    {
        id: "qrbf9DtR3_c",
        title: "Excel Data Analysis Full Course Tutorial (7+ Hours)",
        channel: "Learnit Training",
        category: "Programming",
        level: "Intermediate",
        durationSeconds: 26100,
        publishedAt: "2024-05-31",
        views: 612000,
        description: "A deep, hands-on tour of Excel for data analysis - pivot tables, XLOOKUP, conditional formatting and macros.",
        tags: ["excel", "data analysis", "pivot tables"]
    },
    {
        id: "SA_SDo-cqpg",
        title: "Excel Full Course for Data Analysis with Projects",
        channel: "Excel Tutorials",
        category: "Programming",
        level: "Beginner",
        durationSeconds: 7500,
        publishedAt: "2023-05-21",
        views: 289000,
        description: "Builds practical data-analysis skill in Excel through guided projects rather than isolated feature demos.",
        tags: ["excel", "data analysis", "projects"]
    },
    {
        id: "7QNgqq154gE",
        title: "Complete Excel Tutorial for Data Analysis in 4 Hours",
        channel: "Excel Tutorials",
        category: "Programming",
        level: "Intermediate",
        durationSeconds: 14400,
        publishedAt: "2024-12-26",
        views: 401000,
        description: "Power Query, tables, formulas, pivots, charts and a dashboard build - all in a single sitting.",
        tags: ["excel", "power query", "dashboards"]
    },
    {
        id: "pCJ15nGFgVg",
        title: "Excel for Data Analytics - Full Course for Beginners",
        channel: "Excel Tutorials",
        category: "Programming",
        level: "Beginner",
        durationSeconds: 13500,
        publishedAt: "2022-08-09",
        views: 356000,
        description: "Covers the Excel skills analysts use daily: cleaning data, lookups, conditional logic and visualization.",
        tags: ["excel", "analytics", "beginner"]
    },
    {
        id: "XbyiTh-6k9Q",
        title: "Excel Tutorial from Basic to Advanced for Data Analyst",
        channel: "Excel with Satish",
        category: "Programming",
        level: "Advanced",
        durationSeconds: 19800,
        publishedAt: "2024-12-27",
        views: 198000,
        description: "Takes analysts from Excel fundamentals through advanced formulas, automation and reporting techniques.",
        tags: ["excel", "advanced formulas", "reporting"]
    },

    /* ---------------------------------------------------------------- */
    /* Automation                                                         */
    /* ---------------------------------------------------------------- */

    {
        id: "_oL30hxtwPY",
        title: "Industrial Robotics Tutorial (Arm & Programming)",
        channel: "Automation Training",
        category: "Automation",
        level: "Beginner",
        durationSeconds: 1200,
        publishedAt: "2016-09-20",
        views: 267000,
        description: "Introduces industrial robot arm design and the basics of programming a robot for repetitive tasks.",
        tags: ["robotics", "robot arm", "programming"]
    },
    {
        id: "iqBUpA7fg5E",
        title: "Introduction to FANUC Industrial Robotics Programming",
        channel: "SolisPLC",
        category: "Automation",
        level: "Intermediate",
        durationSeconds: 2700,
        publishedAt: "2022-10-11",
        views: 189000,
        description: "A hands-on course on operating and programming a FANUC industrial robot, hardware and software included.",
        tags: ["FANUC", "robotics", "industrial automation"]
    },
    {
        id: "ZBD4jOAuax8",
        title: "How to Get Started with Industrial Robotics",
        channel: "Industrial Robotics Hub",
        category: "Automation",
        level: "Beginner",
        durationSeconds: 1800,
        publishedAt: "2024-03-22",
        views: 84000,
        description: "An on-demand primer for engineers who are new to deploying industrial robots on the production floor.",
        tags: ["robotics", "getting started", "automation"]
    },
    {
        id: "3hreEJzdkYA",
        title: "Industrial Robot Programming | Robotic Systems",
        channel: "Robotic Systems",
        category: "Automation",
        level: "Intermediate",
        durationSeconds: 900,
        publishedAt: "2020-12-28",
        views: 112000,
        description: "Covers the programming concepts behind coordinating multi-axis robotic systems on the line.",
        tags: ["robotics", "programming", "systems"]
    },
    {
        id: "ksQrkag-nHI",
        title: "PLC Programming Tutorial for Beginners - Siemens PLC Training Course",
        channel: "PLC Training Hub",
        category: "Automation",
        level: "Beginner",
        durationSeconds: 9000,
        publishedAt: "2023-08-06",
        views: 823000,
        description: "A free, complete Siemens PLC training course - ladder logic, wiring and program structure from scratch.",
        tags: ["PLC", "siemens", "ladder logic"]
    },
    {
        id: "y2eWdLk0-Ho",
        title: "PLC Programming Tutorial for Beginners: Part 1",
        channel: "RealPars",
        category: "Automation",
        level: "Beginner",
        durationSeconds: 600,
        publishedAt: "2014-09-15",
        views: 1400000,
        description: "RealPars' widely-watched introduction to PLC programming concepts and terminology for new automation engineers.",
        tags: ["PLC", "automation basics", "realpars"]
    },
    {
        id: "xBNrifixgjc",
        title: "PLC Programming Demystified: A Visual Guide for Beginners",
        channel: "Electrical Lad",
        category: "Automation",
        level: "Beginner",
        durationSeconds: 1200,
        publishedAt: "2025-03-18",
        views: 61000,
        description: "Uses a small, affordable PLC to visually explain inputs, outputs and basic ladder logic programs.",
        tags: ["PLC", "visual guide", "ladder logic"]
    },
    {
        id: "c4VrA0kx5zc",
        title: "PLC Basics for Beginners - Part 1",
        channel: "PLC Basics",
        category: "Automation",
        level: "Beginner",
        durationSeconds: 720,
        publishedAt: "2021-03-12",
        views: 96000,
        description: "Covers simple input/output logic systems as the foundation before moving into full PLC programs.",
        tags: ["PLC", "inputs and outputs", "fundamentals"]
    },

    /* ---------------------------------------------------------------- */
    /* Artificial Intelligence                                            */
    /* ---------------------------------------------------------------- */

    {
        id: "oXlwWbU8l2o",
        title: "OpenCV Course - Full Tutorial with Python",
        channel: "freeCodeCamp.org",
        category: "Artificial Intelligence",
        level: "Intermediate",
        durationSeconds: 13380,
        publishedAt: "2020-11-03",
        views: 3200000,
        description: "Everything needed to start with OpenCV in Python - image transforms, contours, face detection and a capstone deep learning project.",
        tags: ["computer vision", "opencv", "python"]
    },
    {
        id: "hhGPiDrUe1c",
        title: "AI & ML Full Course 2026 | Complete Artificial Intelligence and Machine Learning Tutorial",
        channel: "edureka!",
        category: "Artificial Intelligence",
        level: "Beginner",
        durationSeconds: 32400,
        publishedAt: "2025-09-19",
        views: 512000,
        description: "A broad tour of AI and ML concepts, algorithms and use cases aimed at engineers moving into the field.",
        tags: ["artificial intelligence", "machine learning", "fundamentals"]
    },
    {
        id: "MsVujBISof8",
        title: "AI and Machine Learning Full Course 2026",
        channel: "Simplilearn",
        category: "Artificial Intelligence",
        level: "Beginner",
        durationSeconds: 28800,
        publishedAt: "2026-02-21",
        views: 298000,
        description: "Covers core machine learning models, neural networks and how AI is applied across industries.",
        tags: ["AI", "machine learning", "neural networks"]
    },
    {
        id: "N8svLoC2eNA",
        title: "AI & ML Full Course 2025",
        channel: "edureka!",
        category: "Artificial Intelligence",
        level: "Intermediate",
        durationSeconds: 32400,
        publishedAt: "2025-08-13",
        views: 276000,
        description: "A follow-on deep dive into applied machine learning workflows, from data prep to model evaluation.",
        tags: ["machine learning", "data science", "applied AI"]
    },
    {
        id: "jOIKxfHJuNs",
        title: "AI And Machine Learning Full Course",
        channel: "Simplilearn",
        category: "Artificial Intelligence",
        level: "Advanced",
        durationSeconds: 41400,
        publishedAt: "2026-06-09",
        views: 87000,
        description: "An extended, certification-style course spanning statistics, ML algorithms and deployment basics.",
        tags: ["AI", "certification prep", "deployment"]
    },
    {
        id: "6WmtIaIX-bQ",
        title: "Artificial Intelligence Full Course",
        channel: "Simplilearn",
        category: "Artificial Intelligence",
        level: "Advanced",
        durationSeconds: 30600,
        publishedAt: "2024-12-04",
        views: 412000,
        description: "Goes beyond the basics into search algorithms, expert systems and the math underpinning modern AI.",
        tags: ["AI theory", "algorithms", "advanced"]
    },
    {
        id: "FkqINm-l3q0",
        title: "Artificial Intelligence Full Course 2026",
        channel: "Simplilearn",
        category: "Artificial Intelligence",
        level: "Advanced",
        durationSeconds: 27900,
        publishedAt: "2025-01-23",
        views: 165000,
        description: "An updated advanced AI course covering current tooling, generative models and career guidance.",
        tags: ["AI", "generative AI", "career"]
    },
    {
        id: "rUOlX3uuUr4",
        title: "Why Generative Digital Twin is the Future of Industry 4.0",
        channel: "Industry 4.0 Insights",
        category: "Artificial Intelligence",
        level: "Advanced",
        durationSeconds: 600,
        publishedAt: "2025-05-14",
        views: 38000,
        description: "Explores how generative AI supercharges digital twins for predictive, self-optimizing factories.",
        tags: ["digital twin", "generative AI", "industry 4.0"]
    },

    /* ---------------------------------------------------------------- */
    /* Industry 4.0                                                       */
    /* ---------------------------------------------------------------- */

    {
        id: "opcrVfHb3A0",
        title: "Getting Started with Industry 4.0: Digital Twin",
        channel: "GlobalLogic",
        category: "Industry 4.0",
        level: "Beginner",
        durationSeconds: 480,
        publishedAt: "2020-07-13",
        views: 71000,
        description: "GlobalLogic's industrial business unit lead introduces digital twins as an entry point into Industry 4.0.",
        tags: ["industry 4.0", "digital twin", "smart factory"]
    },
    {
        id: "eZDkSNHaWh8",
        title: "Project Management Full Course By Google [Part 1]",
        channel: "Google Career Certificates",
        category: "Industry 4.0",
        level: "Beginner",
        durationSeconds: 10800,
        publishedAt: "2023-01-28",
        views: 1100000,
        description: "The first half of Google's project management certificate course, covering the fundamentals of running a project.",
        tags: ["project management", "digital transformation", "planning"]
    },
    {
        id: "-84E_-aTpck",
        title: "Project Management Full Course By Google [Part 2]",
        channel: "Google Career Certificates",
        category: "Industry 4.0",
        level: "Intermediate",
        durationSeconds: 10800,
        publishedAt: "2023-01-29",
        views: 812000,
        description: "The second half of Google's certificate course, covering agile delivery and stakeholder communication.",
        tags: ["project management", "agile", "stakeholders"]
    },
    {
        id: "N8Bvmx3Sr28",
        title: "PLC Programming Tutorial for Beginners: 3 Steps Before You Start",
        channel: "PLC Training Hub",
        category: "Industry 4.0",
        level: "Beginner",
        durationSeconds: 480,
        publishedAt: "2021-05-07",
        views: 58000,
        description: "The groundwork to get right before writing a single line of PLC logic on a connected, Industry 4.0 line.",
        tags: ["PLC", "industry 4.0", "planning"]
    },
    {
        id: "KRJ6Qz3hwZw",
        title: "How to Program Allen Bradley PLC Training for Beginners",
        channel: "Allen Bradley Training",
        category: "Industry 4.0",
        level: "Intermediate",
        durationSeconds: 3600,
        publishedAt: "2019-01-15",
        views: 421000,
        description: "A full walkthrough of programming an Allen Bradley PLC as part of a connected automation cell.",
        tags: ["PLC", "allen bradley", "automation"]
    },
    {
        id: "1WQ70KJu6EY",
        title: "PLC Basics: Ladder Logic",
        channel: "PLC Basics",
        category: "Industry 4.0",
        level: "Beginner",
        durationSeconds: 600,
        publishedAt: "2020-07-10",
        views: 203000,
        description: "Ladder logic explained from first principles, the common language behind most connected factory controls.",
        tags: ["PLC", "ladder logic", "controls"]
    }

];

export default youtubeVideos;

export function getVideoById(videoId) {

    return youtubeVideos.find(
        video => video.id === videoId
    ) || null;
}

export function getVideosByCategory(category) {

    return youtubeVideos.filter(
        video => video.category === category
    );
}
