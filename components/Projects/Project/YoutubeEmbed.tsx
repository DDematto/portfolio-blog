export default function YouTubeEmbed({videoId, start}: { videoId: string, start: number }) {
    return <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?start=${start}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
    />
}

