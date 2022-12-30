import {motion} from "framer-motion";
import styled from "styled-components";

interface ISelectionProps {
    name: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Selection(props: ISelectionProps) {
    const {onChange, options} = props;

    return <SelectContainer onChange={onChange}>
        {options.map((option, index) => <option key={index}>{option}</option>)}
    </SelectContainer>
}

const SelectContainer = styled(motion.select)`
  width: 100%;
  height: 2rem;
  margin-top: auto;


  color: white;
  background: #111;
  outline: none;
  font-size: 1rem;
`