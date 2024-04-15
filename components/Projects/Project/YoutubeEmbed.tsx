import styled from 'styled-components'

export default function YouTubeEmbed({videoId, start}: { videoId: string, start: number }) {
    return <VideoContainer
        src={`https://www.youtube.com/embed/${videoId}?start=${start}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
    />
}

const VideoContainer = styled.iframe`
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 16/9;
    width: 100%;
    margin-top: 2rem;
`;