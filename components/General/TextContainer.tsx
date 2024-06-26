import Image from "next/legacy/image";
import {motion} from "framer-motion";
import styled from "styled-components";

export const TextContainer = styled(motion.div)`
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
