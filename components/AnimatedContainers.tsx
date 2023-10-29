import Image from "next/image";
import {motion} from "framer-motion";
import styled from "styled-components";


export const AnimatedContainer = styled(motion.div)`
  padding: 1rem;
  position: relative;
  background: ${({theme}) => theme.colors.primary};
  backdrop-filter: blur(10px);
  border: 1px solid;
  border-image-slice: 1;
  animation: chaseEffect 5s infinite linear;

  @keyframes chaseEffect {
    0%, 100% {
      border-image-source: linear-gradient(0deg, white 0%, white 5%, ${({theme}) => theme.colors.primary} 5.1%, ${({theme}) => theme.colors.primary} 90%, white 90.1%, white 95%);
    }
  }
}
`;


export const AnimatedIMG = styled(AnimatedContainer).attrs({as: Image})`
  margin: 0;
  padding: 0;
`;
