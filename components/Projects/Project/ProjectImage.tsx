import Image from 'next/image';
import styled from 'styled-components';

const StyledImageContainer = styled.div`
    width: 100%;
    height: 300px;
    position: relative;
    overflow: hidden; // To maintain border-radius or any other styles
`;

const StyledImage = styled(Image)`
    object-fit: cover; // Ensures the image covers the area
`;

interface IBlogImage {
    src: string,
    alt: string
}

export default function BlogImage({src, alt}: IBlogImage) {
    const [slug, imageFileName] = src.split('/');
    const fullSrc = `/images/projects/${slug}/${imageFileName}`;

    return <StyledImageContainer>
        <StyledImage
            src={fullSrc}
            alt={alt}
            layout='fill'
            priority
        />
    </StyledImageContainer>
};
