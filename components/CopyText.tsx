import styled from "styled-components"

export default function CopyText({message, text}: { message?: string, text: string }) {
    return <CopyTextStyle onClick={() => {
        navigator.clipboard.writeText(text)
    }}>
        {message || text}
    </CopyTextStyle>
}


export const CopyTextStyle = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  font-style: italic;
  color: ${({theme}) => theme.text.secondary};

  &:hover {
    color: ${({theme}) => theme.text.highlight};
  }
`