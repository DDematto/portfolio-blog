import styled from "styled-components"
import {default as AnimatedText, TextContainer} from "../../General/AnimatedText";

export default function SectionContainer({titles, children}: any) {

    return <Container>
        <AnimatedText sentences={titles} symbol={"|"}/>
        {children}
    </Container>
}

const Container = styled.div`
  padding: 0 2rem;
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  gap: 1rem;


  ${TextContainer} {
    border-bottom: 1px solid #fff;
    padding-bottom: 0.5rem;
  }
`
