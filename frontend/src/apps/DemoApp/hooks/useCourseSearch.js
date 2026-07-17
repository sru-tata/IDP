import { useMemo, useState } from "react";

import searchCourses from "../utils/searchCourses";

function getRowId(course) {

    if (!course) {

        return null;

    }

    if (course.started) {

        return "continue";

    }

    if (course.recommended) {

        return "recommended";

    }

    return "popular";

}

export default function useCourseSearch(catalog = []) {

    const [query, setQuery] = useState("");

    const [highlightedCourseId, setHighlightedCourseId] = useState(null);

    const [highlightedRowId, setHighlightedRowId] = useState(null);

    const results = useMemo(() => {

        if (!query.trim()) {

            return [];

        }

        return searchCourses(catalog, query);

    }, [

        catalog,

        query

    ]);

    const suggestions = useMemo(() => {

        if (!query.trim()) {

            return [];

        }

        return results.slice(0, 6);

    }, [

        query,

        results

    ]);

    function search(text) {

        const value = text.trim();

        setQuery(text);

        if (!value) {

            clear();

            return;

        }

        const matches = searchCourses(

            catalog,

            value

        );

        if (!matches.length) {

            setHighlightedCourseId(null);

            setHighlightedRowId(null);

            return;

        }

        const bestMatch = matches[0];

        setHighlightedCourseId(

            bestMatch.id

        );

        setHighlightedRowId(

            getRowId(bestMatch)

        );

    }

    function clear() {

        setQuery("");

        setHighlightedCourseId(null);

        setHighlightedRowId(null);

    }

    return {

        query,

        search,

        clear,

        results,

        suggestions,

        highlightedCourseId,

        highlightedRowId

    };

}