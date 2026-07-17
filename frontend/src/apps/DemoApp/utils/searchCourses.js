function normalize(text = "") {

    return text
        .toLowerCase()
        .trim();

}

function searchableText(course) {

    return [

        course.title,

        course.shortDescription,

        course.description,

        course.category,

        course.channelTitle,

        course.difficulty,

        ...(course.skills || [])

    ]

        .join(" ")

        .toLowerCase();

}

export default function searchCourses(

    courses,

    query

) {

    const text = normalize(query);

    if (!text) {

        return [];

    }

    return courses

        .map(course => ({

            ...course,

            score:

                searchableText(course).includes(text)

                    ? 1

                    : 0

        }))

        .filter(course => course.score > 0)

        .sort((a, b) => b.score - a.score);

}