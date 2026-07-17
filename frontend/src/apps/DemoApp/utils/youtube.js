/*
--------------------------------------------------------------------------
YouTube Helpers

Small, dependency-free helpers for working with real YouTube video IDs.
These build the exact same URLs the real YouTube Data API v3 / oEmbed
endpoints would resolve to, so no API key is required for embedding,
thumbnails or linking out to the real video.
--------------------------------------------------------------------------
*/

export function getEmbedUrl(videoId, { autoplay = false } = {}) {

    if (!videoId) {
        return null;
    }

    const params = new URLSearchParams({
        rel: "0",
        modestbranding: "1",
        color: "white"
    });

    if (autoplay) {
        params.set("autoplay", "1");
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function getWatchUrl(videoId) {

    if (!videoId) {
        return null;
    }

    return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getThumbnailUrl(videoId, quality = "hqdefault") {

    if (!videoId) {
        return null;
    }

    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export function getChannelUrl(channelHandle) {

    if (!channelHandle) {
        return null;
    }

    return `https://www.youtube.com/${channelHandle}`;
}

/*
--------------------------------------------------------------------------
Formatting
--------------------------------------------------------------------------
*/

export function formatDuration(totalSeconds = 0) {

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {

        return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function formatDurationLabel(totalSeconds = 0) {

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`;
    }

    if (hours > 0) {
        return `${hours}h`;
    }

    return `${minutes}m`;
}

export function formatViewCount(count = 0) {

    if (count >= 1_000_000) {
        return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M views`;
    }

    if (count >= 1_000) {
        return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K views`;
    }

    return `${count} views`;
}

export function formatPublishedAgo(isoDate) {

    if (!isoDate) {
        return "";
    }

    const published = new Date(isoDate);
    const now = new Date();

    const diffMs = now.getTime() - published.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        return "today";
    }

    if (diffDays < 30) {
        return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    }

    const diffMonths = Math.floor(diffDays / 30);

    if (diffMonths < 12) {
        return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
    }

    const diffYears = Math.floor(diffMonths / 12);

    return `${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
}
