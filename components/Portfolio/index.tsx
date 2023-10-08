import {Cursor} from "components/AnimatedText/Cursor";
import styled from "styled-components"
import useAnimatedText from "../AnimatedText";


interface SectionContainerProps {
    id: string;
    titles: string[],
    defaultText: string,
    children: React.ReactNode
    height?: string,
}

export default function SectionContainer(props: SectionContainerProps) {
    const {titles, defaultText, children, height, id} = props;
    const {state: {text}} = useAnimatedText({titles, defaultTxt: defaultText});

    return <Container height={height || "90vh"} id={id}>
        <TextContainer>
            {text.split(' ').map((char: string, index: number) => {
                return <h1 key={char + index}>
                    {index != 0 && "\u00A0"}
                    {char}
                </h1>
            })}

            <Cursor symbol="|"/>
        </TextContainer>
        {children}
    </Container>
}

const Container = styled.div<{ height: string }>`
  padding: 0 2rem;
  width: 100%;
  min-height: ${({height}) => height};
  margin-bottom: 3rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TextContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: left;

  flex-wrap: wrap;
  text-overflow: ellipsis;
  white-space: nowrap;

  h1 {
    font-size: 1.5rem;
    font-weight: 400;
  }

  border-bottom: 1px solid ${({theme}) => theme.colors.secondary};
  padding-bottom: 0.5rem;
`;
