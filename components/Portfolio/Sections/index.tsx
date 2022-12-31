import styled from "styled-components"
import {default as AnimatedText, TextContainer} from "../../AnimatedText";


interface SectionContainerProps {
    titles: string[],
    children: React.ReactNode
    height?: string
}


export default function SectionContainer(props: SectionContainerProps) {
    const {titles, children, height} = props;

    return <Container height={height || "90vh"}>
        <AnimatedText sentences={titles} symbol={"|"}/>
        {children}
    </Container>
}

const Container = styled.div<{ height: string }>`
  padding: 0 2rem;
  width: 100%;
  min-height: ${({height}) => height};

  display: flex;
  flex-direction: column;
  gap: 1rem;


  ${TextContainer} {
    border-bottom: 1px solid ${({theme}) => theme.colors.secondary};
    padding-bottom: 0.5rem;
  }
`
