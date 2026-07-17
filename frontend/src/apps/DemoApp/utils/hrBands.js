/*
Shared score-banding helpers so every HR view (department table, employee
table, competency table) colors readiness/gap the same way the POC deck
does.
*/

export function readinessBand(score) {

    if (score >= 80) {

        return { label: "Excellent", color: "text-green-400", bar: "bg-green-500", dot: "bg-green-500" };

    }

    if (score >= 60) {

        return { label: "Good", color: "text-lime-400", bar: "bg-lime-500", dot: "bg-lime-500" };

    }

    if (score >= 40) {

        return { label: "Needs Focus", color: "text-orange-400", bar: "bg-orange-500", dot: "bg-orange-500" };

    }

    return { label: "At Risk", color: "text-red-400", bar: "bg-red-500", dot: "bg-red-500" };

}

export function gapImpactBand(impact) {

    switch (impact) {

        case "High":
            return { color: "text-red-400", bg: "bg-red-500/15" };

        case "Medium":
            return { color: "text-orange-400", bg: "bg-orange-500/15" };

        default:
            return { color: "text-green-400", bg: "bg-green-500/15" };

    }

}

export function employeeStatusBand(status) {

    switch (status) {

        case "Ahead":
            return { color: "text-green-400", bg: "bg-green-500/15" };

        case "At Risk":
            return { color: "text-red-400", bg: "bg-red-500/15" };

        default:
            return { color: "text-blue-400", bg: "bg-blue-500/15" };

    }

}
