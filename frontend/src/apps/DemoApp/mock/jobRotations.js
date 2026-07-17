/*
--------------------------------------------------------------------------
Job Rotations - the "Experience" pillar of Education / Experience /
Exposure. Time-boxed, hands-on placements in a different cell, line or
function so competencies are built by doing the work, not just watching
a course about it.
--------------------------------------------------------------------------
*/
const jobRotations = [

    {
        id: "rotation-quality-floor",
        title: "Quality Control Floor Rotation",
        hostDepartment: "Quality",
        duration: "8 weeks",
        format: "On-site · Full-time",
        level: "Intermediate",
        mentor: "Anita Desai, Quality Lead",
        seatsAvailable: 3,
        description:
            "Learn quality checks on the assembly floor and run a real root-cause investigation.",
        outcomes: [
            "Run a live SPC chart for a production line",
            "Lead one root-cause-analysis investigation end to end",
            "Present findings to the Quality review board"
        ],
        competenciesGained: [
            { competencyId: "quality", boost: 10 },
            { competencyId: "manufacturing", boost: 4 }
        ],
        xp: 950
    },

    {
        id: "rotation-automation-cell",
        title: "Automation & Robotics Cell Rotation",
        hostDepartment: "Automation",
        duration: "6 weeks",
        format: "On-site · Full-time",
        level: "Intermediate",
        mentor: "Suresh Pillai, Automation Lead",
        seatsAvailable: 2,
        description:
            "Work inside a live robotic cell and help commission a real PLC change.",
        outcomes: [
            "Commission a supervised PLC logic change",
            "Support a full line changeover",
            "Shadow a robot path calibration"
        ],
        competenciesGained: [
            { competencyId: "automation", boost: 12 },
            { competencyId: "manufacturing", boost: 3 }
        ],
        xp: 1000
    },

    {
        id: "rotation-plant-ops-shadow",
        title: "Plant Operations Shadow Program",
        hostDepartment: "Manufacturing",
        duration: "12 weeks",
        format: "On-site · Part-time (2 days/week)",
        level: "Advanced",
        mentor: "Vikram Rao, Plant Operations",
        seatsAvailable: 2,
        description:
            "Shadow a Production Manager through daily reviews and real escalations.",
        outcomes: [
            "Co-run a daily production review",
            "Own one escalation end to end",
            "Present a weekly output report to plant leadership"
        ],
        competenciesGained: [
            { competencyId: "manufacturing", boost: 10 },
            { competencyId: "quality", boost: 3 }
        ],
        xp: 1200
    },

    {
        id: "rotation-supply-chain-hub",
        title: "Supply Chain & Logistics Hub Rotation",
        hostDepartment: "Supply Chain",
        duration: "6 weeks",
        format: "On-site · Full-time",
        level: "Beginner",
        mentor: "Divya Menon, Supply Chain",
        seatsAvailable: 4,
        description:
            "Get hands-on with inbound planning, supplier calls and inventory analytics.",
        outcomes: [
            "Build one inventory analysis in Excel from real data",
            "Sit in on two supplier coordination calls",
            "Map a schedule change's downstream impact"
        ],
        competenciesGained: [
            { competencyId: "programming", boost: 6 },
            { competencyId: "manufacturing", boost: 4 }
        ],
        xp: 700
    },

    {
        id: "rotation-industry4-lab",
        title: "Digital Manufacturing / Industry 4.0 Lab Rotation",
        hostDepartment: "Manufacturing Excellence",
        duration: "8 weeks",
        format: "On-site · Full-time",
        level: "Advanced",
        mentor: "Meera Krishnan, Manufacturing Excellence",
        seatsAvailable: 2,
        description:
            "Join the digital twin pilot team and help build a live IIoT dashboard.",
        outcomes: [
            "Instrument a pilot line with IIoT sensors",
            "Build a live readiness dashboard",
            "Co-evaluate one AI pilot use case"
        ],
        competenciesGained: [
            { competencyId: "artificial-intelligence", boost: 10 },
            { competencyId: "automation", boost: 6 }
        ],
        xp: 1100
    }

];

export default jobRotations;
