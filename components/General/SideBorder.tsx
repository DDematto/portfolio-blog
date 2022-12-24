import {motion} from "framer-motion";
import styled from "styled-components";


export const SideBorder = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  border-width: 3px;
  border-style: solid;
  border-image: linear-gradient(to bottom,
  white,
  rgba(0, 0, 0, 0)) 1 100%;
`
