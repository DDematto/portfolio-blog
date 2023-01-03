import styled from "styled-components"
import {default as AnimatedText} from "../../AnimatedText";


interface SectionContainerProps {
    id: string;
    titles: string[],
    children: React.ReactNode
    height?: string
}


export default function SectionContainer(props: SectionContainerProps) {
    const {titles, children, height, id} = props;

    return <Container height={height || "90vh"} id={id}>
        <AnimatedText sentences={titles} symbol={"|"}/>
        {children}
    </Container>
}

const Container = styled.div<{ height: string }>`
  padding: 0 2rem;
  width: 100%;
  min-height: ${({height}) => height};
  scroll-margin-top: 6rem;
  margin-bottom: 3rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 400px) {
    scroll-margin-top: 14rem;
  }
`
