import HeroBanner from "../../components/home/HeroBanner";
import CourseRow from "../../components/course/CourseRow";
import LearningConsistency from "../../components/gamification/LearningConsistency";
import WeeklyProgressCard from "../../components/gamification/WeeklyProgressCard";

import { useCourses } from "../../context/CourseContext";
import { useLearning } from "../../context/LearningContext";
import { useUser } from "../../context/UserContext";

function Home() {

    const {

        continueCourses,

        recommendedCourses,

        targetRoleCourses,

        popularCourses,

        becauseYouCompletedRow

    } = useCourses();

    const {

        weeklyProgress

    } = useLearning();

    const {

        user,

        targetRole

    } = useUser();

    if (!user || !targetRole) {

        return null;

    }

    return (

        <div className="mx-auto max-w-screen-2xl px-2">

            <HeroBanner />

            <CourseRow

                rowId="continue"

                title="Continue Learning"

                subtitle="Pick up where you left off."

                courses={continueCourses}

            />

            <CourseRow

                rowId="recommended"

                title="Recommended For You"

                subtitle="Generated from your competency gaps."

                courses={recommendedCourses}

            />

            {

                becauseYouCompletedRow?.courses?.length > 0 && (

                    <CourseRow

                        rowId="because-you-completed"

                        title={becauseYouCompletedRow.title}

                        subtitle={becauseYouCompletedRow.subtitle}

                        courses={becauseYouCompletedRow.courses}

                    />

                )

            }

            <div className="my-16 grid grid-cols-12 gap-6">

                <div className="col-span-8">

                    <LearningConsistency compact />

                </div>

                <div className="col-span-4">

                    <WeeklyProgressCard

                        progress={weeklyProgress}

                    />

                </div>

            </div>

            <CourseRow

                rowId="target-role"

                title={`Towards ${targetRole.title}`}

                subtitle="Courses aligned with your next career milestone."

                courses={targetRoleCourses}

            />

            <CourseRow

                rowId="popular"

                title={`Popular In ${user.department}`}

                subtitle="Trending learning in your department."

                courses={popularCourses}

            />

        </div>

    );

}

export default Home;