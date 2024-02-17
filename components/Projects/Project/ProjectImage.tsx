import Image from "next/legacy/image";
import styled from 'styled-components';

const StyledImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    width: calc(100% - 4rem); // You can adjust this for a wider image
    height: 450px; // Increased height for a larger display area
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 1rem;
    background-color: #000; // Optional, for letterboxing appearance
`;

const StyledImage = styled(Image)`
    object-fit: contain;
    width: 100%; // This ensures the image is responsive within the container
    height: 100%; // The image will scale to fit the height, maintaining its aspect ratio
    position: absolute;
`;

interface IBlogImage {
    src: string,
    alt: string
}

export default function BlogImage({src, alt}: IBlogImage) {
    return <StyledImageContainer>
        <StyledImage
            src={src}
            alt={alt}
            layout='fill'
            priority
        />
    </StyledImageContainer>
};
