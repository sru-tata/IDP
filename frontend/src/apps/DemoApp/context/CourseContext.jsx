import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import learningService from "../services/learning.service";

import { useUser } from "./UserContext";
import { useLearning } from "./LearningContext";
import { useCompetencies } from "./CompetencyContext";
import { useSkillTree } from "./SkillTreeContext";

import useCourseSearch from "../hooks/useCourseSearch";
import useCourseFeed from "../hooks/useCourseFeed";

const CourseContext = createContext();

function CourseProvider({

    children

}) {

    const {

        user,

        targetRole,

        addXP,

        addActivity

    } = useUser();

    const {

        logActivity

    } = useLearning();

    const {

        skillGaps

    } = useCompetencies();

    const {

        skillTree

    } = useSkillTree();

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        catalog,

        setCatalog

    ] = useState([]);

    /*
    --------------------------------------------------

    Learning Plan (bookmarks)

    --------------------------------------------------
    */

    const [

        learningPlan,

        setLearningPlan

    ] = useState([]);

    /*
    --------------------------------------------------

    Video Player

    --------------------------------------------------
    */

    const [

        playingCourse,

        setPlayingCourse

    ] = useState(null);

    /*
    --------------------------------------------------

    Preview

    --------------------------------------------------
    */

    const [

        selectedCourse,

        setSelectedCourse

    ] = useState(null);

    const [

        recentlyViewed,

        setRecentlyViewed

    ] = useState([]);

    /*
    --------------------------------------------------

    Load Catalog

    --------------------------------------------------
    */

    useEffect(() => {

        loadCourses();

    }, []);

    async function loadCourses() {

        setLoading(true);

        const data = await learningService.getCourses();

        setCatalog(data);

        setLoading(false);

    }

    /*
    --------------------------------------------------

    Search

    --------------------------------------------------
    */

    const {

        query,

        search,

        clear,

        results,

        suggestions,

        highlightedCourseId,

        highlightedRowId

    } = useCourseSearch(

        catalog

    );

    /*
    --------------------------------------------------

    Recommendation Feed

    --------------------------------------------------
    */

    const courseFeed = useCourseFeed({

        catalog,

        user,

        targetRole,

        recentlyViewed,

        skillGaps,

        roleCompetencies: skillTree?.competencies ?? []

    });

    /*
    --------------------------------------------------

    Preview Modal

    --------------------------------------------------
    */

    function openCourse(course) {

        if (!course) {

            return;

        }

        setSelectedCourse(course);

        setRecentlyViewed(previous => {

            const filtered = previous.filter(

                item => item.id !== course.id

            );

            return [

                course,

                ...filtered

            ].slice(0, 12);

        });

    }

    function closeCourse() {

        setSelectedCourse(null);

    }

    /*
    --------------------------------------------------

    Learning Plan (bookmarks)

    --------------------------------------------------
    */

    function isBookmarked(courseId) {

        return learningPlan.includes(courseId);

    }

    function toggleBookmark(course) {

        if (!course) {

            return;

        }

        setLearningPlan(previous =>

            previous.includes(course.id)

                ? previous.filter(id => id !== course.id)

                : [...previous, course.id]

        );

    }

    /*
    --------------------------------------------------

    Playback / Progress

    --------------------------------------------------
    */

    function startCourse(course) {

        if (!course) {

            return;

        }

        setCatalog(previous =>

            previous.map(item =>

                item.id === course.id && !item.started

                    ? { ...item, started: true, progress: item.progress || 1 }

                    : item

            )

        );

        setPlayingCourse(course);

    }

    function closePlayer() {

        setPlayingCourse(null);

    }

    function updateCourseProgress(courseId, progress) {

        setCatalog(previous =>

            previous.map(item =>

                item.id === courseId

                    ? { ...item, progress, started: true }

                    : item

            )

        );

    }

    function markCourseComplete(course) {

        if (!course || course.progress === 100) {

            return;

        }

        const completedAt = new Date().toISOString().split("T")[0];

        setCatalog(previous =>

            previous.map(item =>

                item.id === course.id

                    ? {

                        ...item,

                        progress: 100,

                        started: true,

                        completedAt

                    }

                    : item

            )

        );

        addXP?.(course.xp || 0);

        addActivity?.({

            type: "course_completed",

            title: `Completed "${course.title}"`,

            xp: course.xp || 0,

            date: completedAt

        });

        logActivity?.({

            minutes: 45,
            xp: course.xp || 0,
            courses: 1

        });

    }

    /*
    --------------------------------------------------

    Context

    --------------------------------------------------
    */

    const value = useMemo(() => ({

        loading,

        catalog,

        refreshCourses: loadCourses,

        /*
        Feed

        */

        ...courseFeed,

        /*
        Search

        */

        query,

        search,

        clear,

        results,

        suggestions,

        highlightedCourseId,

        highlightedRowId,

        /*
        Preview

        */

        selectedCourse,

        openCourse,

        closeCourse,

        recentlyViewed,

        /*
        Learning Plan

        */

        learningPlan,

        isBookmarked,

        toggleBookmark,

        /*
        Playback

        */

        playingCourse,

        startCourse,

        closePlayer,

        updateCourseProgress,

        markCourseComplete

    }), [

        loading,

        catalog,

        courseFeed,

        query,

        results,

        suggestions,

        highlightedCourseId,

        highlightedRowId,

        selectedCourse,

        recentlyViewed,

        learningPlan,

        playingCourse

    ]);

    return (

        <CourseContext.Provider

            value={value}

        >

            {children}

        </CourseContext.Provider>

    );

}

export function useCourses() {

    return useContext(

        CourseContext

    );

}

export default CourseProvider;
