import styled from 'styled-components'

export default function YouTubeEmbed({videoId, start}: { videoId: string, start: number }) {
    return <VideoContainer
        width="560"
        height="315"
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
    margin: 0 auto;
`;