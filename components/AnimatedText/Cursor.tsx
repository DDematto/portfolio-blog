import styled from "styled-components";

export const Cursor = styled.h1<{ symbol: string }>`
  animation: blink 0.7s infinite;

  &:after {
    content: "${({symbol}) => symbol}";
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;