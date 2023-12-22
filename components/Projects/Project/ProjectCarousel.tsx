import React, {useState} from 'react';
import styled from 'styled-components';
import BlogImage from "./ProjectImage";

const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    height: 300px; // Same height as your BlogImage
    overflow: hidden;
`;

const Button = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #fff; // Or any color you prefer
    border: none;
    cursor: pointer;
    z-index: 2;

    &:focus {
        outline: none;
    }
`;

const LeftButton = styled(Button)`
    left: 10px;
`;

const RightButton = styled(Button)`
    right: 10px;
`;

interface IBlogCarousel {
    images: { src: string, alt: string }[];
}

export default function ProjectCarousel({images}: IBlogCarousel) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
    };

    return (
        <CarouselContainer>
            <LeftButton onClick={goToPrev}>{"<"}</LeftButton>
            <RightButton onClick={goToNext}>{">"}</RightButton>
            {images.map((image, index) => (
                <div key={image.src} style={{display: index === currentIndex ? 'block' : 'none'}}>
                    <BlogImage src={image.src} alt={image.alt}/>
                </div>
            ))}
        </CarouselContainer>
    );
}
