import {
    ArrowRight,
    Clock3,
    LockOpen,
    Star,
    Target
} from "lucide-react";

import Button from "../ui/Button";

import { useCourses } from "../../context/CourseContext";
import { useSkillTree } from "../../context/SkillTreeContext";

function nodeToPlayable(node) {

    return {

        id: node.id,
        title: node.title,
        videoId: node.videoId,
        xp: node.xp,
        duration: node.duration,
        progress: node.completed ? 100 : 0,
        description: node.description,
        shortDescription: node.description,
        channelTitle: node.channelTitle,
        color: "from-blue-600 to-cyan-600",
        source: "skill-node",
        nodeId: node.id

    };

}

const QUEST_COPY = {

    education: "Complete this course to unlock the next branch of your career journey.",
    experience: "Take on this job rotation to unlock the next branch of your career journey.",
    exposure: "Join this GEMS project or event to unlock the next branch of your career journey."

};

const QUEST_CTA = {

    education: "Continue Learning",
    experience: "View Rotation",
    exposure: "View Details"

};

function CurrentQuest({ node }) {

    const { startCourse } = useCourses();

    const { openNodeAction } = useSkillTree();

    if (!node) {

        return (

            <div className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-8">

                <h2 className="text-xl font-bold">

                    Current Quest

                </h2>

                <p className="mt-4 text-zinc-400">

                    You've completed every available course for this role.

                </p>

            </div>

        );

    }

    return (

        <div className="overflow-hidden rounded-[28px] border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-zinc-900 to-zinc-900">

            {/* Header */}

            <div className="border-b border-zinc-800 px-7 py-6">

                <div className="flex items-center gap-3">

                    <Target className="text-blue-400"/>

                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">

                        Current Quest

                    </p>

                </div>

                <h2 className="mt-5 text-3xl font-black leading-tight">

                    {node.title}

                </h2>

                <p className="mt-3 text-zinc-400">

                    {QUEST_COPY[node.type] || QUEST_COPY.education}

                </p>

            </div>

            {/* Reward */}

            <div className="space-y-5 px-7 py-6">

                <QuestStat

                    icon={<Star size={18}/>}

                    label="Reward"

                    value={`+${node.xp} XP`}

                />

                <QuestStat

                    icon={<Clock3 size={18}/>}

                    label="Duration"

                    value={node.duration}

                />

                <QuestStat

                    icon={<LockOpen size={18}/>}

                    label="Unlocks"

                    value={`${node.unlocks?.length || 0} New Skills`}

                />

            </div>

            {/* CTA */}

            <div className="border-t border-zinc-800 p-6">

                <Button

                    onClick={() =>

                        node.type === "education" || !node.type
                            ? startCourse(nodeToPlayable(node))
                            : openNodeAction(node)

                    }

                    className="flex w-full items-center justify-center gap-3"

                >

                    {QUEST_CTA[node.type] || QUEST_CTA.education}

                    <ArrowRight size={18}/>

                </Button>

            </div>

        </div>

    );

}

function QuestStat({

    icon,

    label,

    value

}) {

    return (

        <div className="flex items-center justify-between rounded-2xl bg-zinc-900/80 p-4">

            <div className="flex items-center gap-3">

                <div className="text-blue-400">

                    {icon}

                </div>

                <span className="text-zinc-400">

                    {label}

                </span>

            </div>

            <span className="font-semibold">

                {value}

            </span>

        </div>

    );

}

export default CurrentQuest;