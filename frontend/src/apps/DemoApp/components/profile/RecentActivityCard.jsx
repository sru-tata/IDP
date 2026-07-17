import {
    Activity,
    Award,
    BookOpen,
    Briefcase,
    BrainCircuit,
    Sparkles,
    Target,
    CheckCircle2
} from "lucide-react";

import { useMemo } from "react";

import Card from "../ui/Card";

import { useUser } from "../../context/UserContext";
import { useCourses } from "../../context/CourseContext";

import { formatPublishedAgo } from "../../utils/youtube";

const ACTIVITY_ICONS = {

    course_completed: <BookOpen size={16}/>,

    badge_earned: <Award size={16}/>,

    course_started: <BrainCircuit size={16}/>,

    target_role_changed: <Target size={16}/>,

    rotation_completed: <Briefcase size={16}/>,

    exposure_completed: <Sparkles size={16}/>

};

function RecentActivityCard() {

    const { user } = useUser();

    const { catalog } = useCourses();

    const activities = useMemo(() => {

        if (!user) {

            return [];

        }

        const liveActivities = (user.activities || []).map(activity => ({

            id: `live-${activity.date}-${activity.title}`,
            icon: ACTIVITY_ICONS[activity.type] || <Activity size={16}/>,
            title: activity.title,
            date: activity.date

        }));

        const liveTitles = new Set(liveActivities.map(item => item.title));

        const completedCourses = (catalog || [])

            .filter(course => course.progress === 100 && course.completedAt)

            .map(course => ({

                id: `course-${course.id}`,
                icon: <CheckCircle2 size={16}/>,
                title: `Completed "${course.title}"`,
                date: course.completedAt

            }))

            .filter(item => !liveTitles.has(item.title));

        const badgeActivities = (user.badges || []).map((badge, index) => ({

            id: `badge-${badge.id}`,
            icon: <Award size={16}/>,
            title: `Earned "${badge.title}" badge`,
            date: null,
            sortIndex: index

        }));

        const dated = [...liveActivities, ...completedCourses]
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        return [...dated, ...badgeActivities].slice(0, 8);

    }, [user, catalog]);

    if (!user) {

        return null;

    }

    return (

        <Card className="p-6">

            <div className="flex items-center gap-2">

                <Activity

                    size={18}

                    className="text-blue-400"

                />

                <p className="font-semibold text-blue-400">

                    Recent Activity

                </p>

            </div>

            <div className="mt-5 divide-y divide-zinc-800">

                {

                    activities.length === 0 && (

                        <p className="py-6 text-sm text-zinc-500">

                            No activity yet - start a course to see it here.

                        </p>

                    )

                }

                {

                    activities.map(activity => (

                        <div

                            key={activity.id}

                            className="
                                flex
                                items-center
                                justify-between
                                py-4
                            "

                        >

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                                        rounded-lg
                                        bg-blue-500/10
                                        p-2
                                        text-blue-400
                                    "
                                >

                                    {activity.icon}

                                </div>

                                <p className="text-sm">

                                    {activity.title}

                                </p>

                            </div>

                            <span
                                className="
                                    text-xs
                                    text-zinc-500
                                "
                            >

                                {

                                    activity.date
                                        ? formatPublishedAgo(activity.date)
                                        : "Earned"

                                }

                            </span>

                        </div>

                    ))

                }

            </div>

        </Card>

    );

}

export default RecentActivityCard;
