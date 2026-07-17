import { getVideoById } from "../youtubeVideos";
import { formatDurationLabel } from "../../utils/youtube";

import jobRotations from "../jobRotations";
import gemsProjects from "../gemsProjects";
import externalEvents from "../externalEvents";

/*
--------------------------------------------------------------------------
Skill tree nodes come in three flavours, mirroring the Education /
Experience / Exposure (EEE) framework:

  - buildNode()            Education  - a real YouTube course
  - buildExperienceNode()  Experience - a Job Rotation placement
  - buildExposureNode()    Exposure   - a GEMS project or external event
                                        (Tata Innovista, Tata InFuse,
                                        seminars, webinars, conferences,
                                        Technology Day)

Every node still carries the same core shape (id, title, level,
competency, xp, completed, unlocked, prerequisites) so the skill tree
graph/layout code doesn't need to know which kind of node it's drawing -
only `type` and the type-specific reference id change.
--------------------------------------------------------------------------
*/

export function buildNode({
    id,
    title,
    level,
    competency,
    videoId,
    xp,
    completed = false,
    unlocked = false,
    prerequisites = []
}) {

    const video = getVideoById(videoId);

    return {
        id,
        type: "education",
        title,
        level,
        competency,
        videoId,
        duration: video ? formatDurationLabel(video.durationSeconds) : "",
        durationSeconds: video ? video.durationSeconds : 2700,
        xp,
        completed,
        unlocked,
        prerequisites,
        skills: video?.tags ?? [],
        description: video?.description ?? "",
        channelTitle: video?.channel ?? ""
    };
}

export function buildExperienceNode({
    id,
    level,
    competency,
    rotationId,
    completed = false,
    unlocked = false,
    prerequisites = []
}) {

    const rotation = jobRotations.find(item => item.id === rotationId);

    return {
        id,
        type: "experience",
        title: rotation?.title ?? "Job Rotation",
        level,
        competency,
        rotationId,
        duration: rotation?.duration ?? "",
        xp: rotation?.xp ?? 0,
        completed,
        unlocked,
        prerequisites,
        description: rotation?.description ?? "",
        hostDepartment: rotation?.hostDepartment ?? ""
    };
}

export function buildExposureNode({
    id,
    level,
    competency,
    activityType,
    activityId,
    completed = false,
    unlocked = false,
    prerequisites = []
}) {

    const activity = activityType === "gems"
        ? gemsProjects.find(item => item.id === activityId)
        : externalEvents.find(item => item.id === activityId);

    return {
        id,
        type: "exposure",
        activityType,
        title: activity?.title ?? "Exposure Activity",
        level,
        competency,
        activityId,
        xp: activity?.xp ?? 0,
        completed,
        unlocked,
        prerequisites,
        description: activity?.description ?? ""
    };
}
