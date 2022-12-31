import {AnimatePresence, motion} from "framer-motion";
import styled from "styled-components";

interface InputProps {
    value: { data: string, err: string, color: string };
    label: string;
    type?: string;
    isTextArea?: boolean;
    optional?: boolean;
    onChange?: (e: any) => void;
}

export default function Input(props: InputProps) {
    const {isTextArea, label, value, onChange, optional, type} = props;
    const typeCheck = type || "text"

    const grow = (e: any) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const errorVariant = {
        initial: {opacity: 0, transition: {duration: 0.5}},
        animate: {opacity: 1, transition: {duration: 0.5}},
        exit: {opacity: 0, transition: {duration: 0.5}}
    }

    return <Container color={value.color}>
        <Horizontal>
            <Label>{label} </Label>
            {optional && <h6>(Optional)</h6>}
            <AnimatePresence>
                {value.err &&
                    <Error initial="initial" animate="animate" exit="exit" variants={errorVariant}>{value.err}</Error>}
            </AnimatePresence>
        </Horizontal>

        {!isTextArea &&
            <Field type={typeCheck} placeholder={"Enter " + label} value={value.data} onChange={onChange}/>}
        {isTextArea &&
            <TextArea placeholder={"Enter " + label} value={value.data} onChange={onChange}
                      onKeyDown={(e) => grow(e)}/>}

    </Container>
}

const Container = styled.div<{ color: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  > input, textarea {
    border: 1px solid ${({color}) => color};
    transition: border 500ms ease-out;
    outline: none;
    padding: 0.5rem;
    font-size: 1rem;
    color: ${({theme}) => theme.text.primary};

    background: #111;
    -moz-box-shadow: 0 0 3px ${({color}) => color};
    -webkit-box-shadow: 0 0 3px ${({color}) => color};
    box-shadow: 0 0 3px ${({color}) => color};
  }

  > input::placeholder, textarea::placeholder {
    color: ${({theme}) => theme.text.primary};
  }
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: baseline;
`

const Label = styled.label`
  color: ${({theme}) => theme.text.primary};
`;

const Error = styled(motion.h6)`
  color: red;
`;

const Field = styled.input`
  height: 2rem;
`

const TextArea = styled.textarea`
  resize: none;
  overflow: hidden;
  min-height: 6rem;
`