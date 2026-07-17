import leaderboard from "../mock/leaderboard";

const delay = (ms = 150) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const leaderboardService = {

    /*
    Merges the real, live user into the peer list and returns it
    ranked by XP - "You" always reflects the current, live XP total.
    */
    async getWeeklyLeaderboard(user) {

        await delay();

        const withUser = user
            ? [
                ...leaderboard,
                {
                    id: "you",
                    name: "You",
                    department: user.department,
                    xp: user.xp,
                    trend: "same"
                }
            ]
            : leaderboard;

        return [...withUser]
            .sort((a, b) => b.xp - a.xp)
            .map((entry, index) => ({
                ...entry,
                rank: index + 1
            }));

    }

};

export default leaderboardService;
