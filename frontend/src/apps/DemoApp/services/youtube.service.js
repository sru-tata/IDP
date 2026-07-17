import youtubeVideos, { getVideoById } from "../mock/youtubeVideos";

import {
    getEmbedUrl,
    getWatchUrl,
    getThumbnailUrl
} from "../utils/youtube";

const delay = (ms = 150) =>
    new Promise((resolve) => setTimeout(resolve, ms));

/*
--------------------------------------------------------------------------
YouTube Service

Frontend integration layer for YouTube. In production this calls a thin
backend proxy (protecting the real YouTube Data API v3 key) at endpoints
like `/integrations/youtube/search` and `/integrations/youtube/videos`.

Until that proxy exists, this service resolves against the curated,
real-video library in `mock/youtubeVideos.js` - the response shapes below
match what `search.list` / `videos.list` would return, so swapping the
body of these methods for real `client.get(...)` calls is a drop-in
change.
--------------------------------------------------------------------------
*/

function toSearchResult(video) {

    return {
        id: {
            kind: "youtube#video",
            videoId: video.id
        },
        snippet: {
            title: video.title,
            channelTitle: video.channel,
            publishedAt: video.publishedAt,
            description: video.description,
            thumbnails: {
                default: { url: getThumbnailUrl(video.id, "default") },
                medium: { url: getThumbnailUrl(video.id, "mqdefault") },
                high: { url: getThumbnailUrl(video.id, "hqdefault") }
            }
        },
        contentDetails: {
            durationSeconds: video.durationSeconds
        },
        statistics: {
            viewCount: video.views
        }
    };
}

const youtubeService = {

    /*
    Mirrors: GET https://www.googleapis.com/youtube/v3/search
    */
    async search(query, { maxResults = 10 } = {}) {

        await delay();

        const text = (query || "").trim().toLowerCase();

        if (!text) {
            return [];
        }

        const matches = youtubeVideos.filter(video => {

            const haystack = [
                video.title,
                video.channel,
                video.category,
                ...(video.tags || [])
            ]
                .join(" ")
                .toLowerCase();

            return haystack.includes(text);
        });

        return matches.slice(0, maxResults).map(toSearchResult);
    },

    /*
    Mirrors: GET https://www.googleapis.com/youtube/v3/videos?id=
    */
    async getVideoDetails(videoId) {

        await delay();

        const video = getVideoById(videoId);

        return video ? toSearchResult(video) : null;
    },

    async getByCategory(category, { maxResults = 12 } = {}) {

        await delay();

        return youtubeVideos
            .filter(video => video.category === category)
            .slice(0, maxResults)
            .map(toSearchResult);
    },

    /*
    Convenience helpers - no network/API cost, pure URL builders.
    */
    getEmbedUrl,
    getWatchUrl,
    getThumbnailUrl
};

export default youtubeService;
