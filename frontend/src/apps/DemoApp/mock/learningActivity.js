const today = new Date();

function buildDate(daysAgo) {

    const date = new Date(today);

    date.setDate(today.getDate() - daysAgo);

    return date.toISOString().split("T")[0];

}

const learningActivity = [];

for (let i = 0; i < 365; i++) {

    const chance = Math.random();

    if (chance < 0.35) continue;

    learningActivity.push({

        date: buildDate(i),

        level: Math.floor(Math.random() * 6),

        minutes: 20 + Math.floor(Math.random() * 90),

        xp: 20 + Math.floor(Math.random() * 180),

        courses: 1 + Math.floor(Math.random() * 3)

    });

}

export default learningActivity;