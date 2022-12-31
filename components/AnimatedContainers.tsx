import Image from 'next/image'
import {motion} from "framer-motion";
import styled from "styled-components";


export const AnimatedDIV = styled(motion.div)`
  background-color: ${({theme}) => theme.colors.primary};
  backdrop-filter: blur(10px);
  padding: 1rem;

  border: 1px solid;
  --angle: 0deg;
  border-image: linear-gradient(var(--angle), ${({theme}) => theme.colors.secondary}, ${({theme}) => theme.colors.background}, ${({theme}) => theme.colors.secondary}) 1;
  animation: 15s rotate ease-in-out infinite;

  @keyframes rotate {
    from {
      --angle: 0deg;
    }
    to {
      --angle: 360deg;
    }
  }
`;

export const AnimatedIMG = styled(Image)`
  --angle: 0deg;

  background-color: ${({theme}) => theme.colors.primary};
  backdrop-filter: blur(10px);

  border: 1px solid;
  border-image: linear-gradient(var(--angle), ${({theme}) => theme.colors.secondary}, ${({theme}) => theme.colors.background}, ${({theme}) => theme.colors.secondary}) 1;
  animation: 5s rotate linear infinite;

  @keyframes rotate {
    from {
      --angle: 0deg;
    }
    to {
      --angle: 360deg;
    }
  }
`;
