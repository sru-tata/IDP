const LEVEL_ORDER = [
    "Beginner",
    "Intermediate",
    "Advanced"
];

const LEVEL_Y = {
    Beginner: 520,
    Intermediate: 300,
    Advanced: 80
};

const COMPETENCY_ORDER = [
    "Quality",
    "Manufacturing",
    "Programming",
    "Automation",
    "Artificial Intelligence"
];

const NODE_GAP = 180;

export function buildSkillTreeLayout(nodes) {

    const rows = {};

    LEVEL_ORDER.forEach(level => {

        rows[level] = [];

    });

    // Keep competency ordering inside every level
    LEVEL_ORDER.forEach(level => {

        COMPETENCY_ORDER.forEach(competency => {

            const lane = nodes

                .filter(node =>

                    node.level === level &&
                    node.competency === competency

                )

                .sort((a, b) =>

                    a.prerequisites.length -
                    b.prerequisites.length

                );

            rows[level].push(...lane);

        });

    });

    const positioned = [];

    LEVEL_ORDER.forEach(level => {

        const row = rows[level];

        const width =
            (row.length - 1) * NODE_GAP;

        const startX = -width / 2;

        row.forEach((node, index) => {

            positioned.push({

                ...node,

                position: {

                    x:

                        startX +

                        index * NODE_GAP,

                    y:

                        LEVEL_Y[level]

                }

            });

        });

    });

    return positioned;

}