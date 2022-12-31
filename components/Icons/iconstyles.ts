import {motion} from "framer-motion";
import styled from "styled-components";

export const SocialLink = styled(motion.div)<{ color: string }>`
  color: ${props => props.color};
`

export const CircleOutline = styled.circle`
  stroke: ${({theme}) => theme.colors.secondary};
  transform-origin: 50% 50%;
  transition: all .2s;
`;

export const CircleInner = styled.circle`
  fill: transparent;
  transition: all .2s;
`;

export const Icon = styled.path`
  fill: ${({theme}) => theme.colors.secondary};
  transition: all .2s;
`;

export const SVG = styled.svg<{ width: number, height: number }>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  &:hover, &:active, &:focus {
    ${CircleOutline} {
      stroke: currentColor;
      transform: scale(1.1);
      transition: all .45s;
    }

    ${CircleInner} {
      fill: currentColor;
      transition: all .45s;
    }

    ${Icon} {
      fill: ${({theme}) => theme.colors.secondary};
      transition: all .45s;
    }
  }
`;

