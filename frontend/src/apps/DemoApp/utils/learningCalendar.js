const MONTHS = [

    "Jan",

    "Feb",

    "Mar",

    "Apr",

    "May",

    "Jun",

    "Jul",

    "Aug",

    "Sep",

    "Oct",

    "Nov",

    "Dec"

];

export function buildLearningCalendar(activity) {

    const grouped = new Map();

    activity.forEach((day) => {

        grouped.set(day.date, day);

    });

    const today = new Date();

    const months = [];

    for (let m = 0; m < 12; m++) {

        const date = new Date(

            today.getFullYear(),

            today.getMonth() - m,

            1

        );

        months.push(

            buildMonth(

                date.getFullYear(),

                date.getMonth(),

                grouped

            )

        );

    }

    return months;

}

function buildMonth(

    year,

    month,

    grouped

) {

    const first = new Date(

        year,

        month,

        1

    );

    const last = new Date(

        year,

        month + 1,

        0

    );

    const cells = [];

    for (

        let i = 0;

        i < first.getDay();

        i++

    ) {

        cells.push(null);

    }

    for (

        let day = 1;

        day <= last.getDate();

        day++

    ) {

        const current = new Date(

            year,

            month,

            day

        );

        const key = current

            .toISOString()

            .split("T")[0];

        cells.push(

            grouped.get(key) || {

                date: key,

                level: 0,

                xp: 0,

                minutes: 0,

                courses: 0

            }

        );

    }

    while (cells.length % 7 !== 0) {

        cells.push(null);

    }

    const weeks = [];

    for (

        let i = 0;

        i < cells.length;

        i += 7

    ) {

        weeks.push(

            cells.slice(

                i,

                i + 7

            )

        );

    }

    return {

        month: MONTHS[month],

        year,

        weeks

    };

}