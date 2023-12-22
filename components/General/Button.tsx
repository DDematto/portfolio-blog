import styled from "styled-components";

export const SubmitButton = styled.button<{ disabled: boolean }>`
  width: 25%;
  height: 2rem;
  outline: none;
  background: #111;
  color: ${({theme}) => theme.text.primary};

  padding: 0.5rem;

  border: 1px solid ${({disabled}) => disabled ? "red" : "green"};

  -moz-box-shadow: 0 0 3px ${({disabled}) => disabled ? "red" : "green"};
  -webkit-box-shadow: 0 0 3px ${({disabled}) => disabled ? "red" : "green"};
  box-shadow: 0 0 3px ${({disabled}) => disabled ? "red" : "green"};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  transition: border 500ms ease-in-out;
`
