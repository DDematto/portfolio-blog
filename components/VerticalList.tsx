import {motion} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";

export default function VerticalList(props: { items: string[], grabCurrentItem: any }) {
    const {items, grabCurrentItem} = props;

    const [y, setY] = useState(0);
    const initialRef = useRef<HTMLButtonElement>(null);
    const [item, setItem] = useState({item: items[0], ref: initialRef});

    // set initial item ref
    useEffect(() => navLeaveLogic(), [initialRef]);

    // Set local state to the outside component selector
    useEffect(() => grabCurrentItem(item.item), [item])

    const navEnterLogic = (e: any) => {
        if (e.target.tagName !== "BUTTON") return;

        const buttonY = (e.target.getBoundingClientRect().y - e.target.parentElement.getBoundingClientRect().y) + 10;

        setY(buttonY);
    }

    const navLeaveLogic = () => {
        if (!item.ref.current) return;

        const buttonY = (item.ref.current.getBoundingClientRect().y - item.ref.current!.parentElement!.getBoundingClientRect().y) + 10;
        setY(buttonY);
    }

    return <ParentContainer onMouseMove={(e) => navEnterLogic(e)} onMouseLeave={() => navLeaveLogic()}>
        <Item initialRef={initialRef} item={items[0]} i={0} setRef={setItem}/>
        {items.slice(1).map((item, i) => <Item key={item} item={item} i={i + 1} setRef={setItem}/>)}

        <Selector style={{left: 0, top: y}}/>
        <Selector style={{right: 0, top: y}}/>
    </ParentContainer>
}


const ParentContainer = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  padding: 1rem;

  background-color: ${({theme}) => theme.colors.primary};
  backdrop-filter: blur(10px);

  border-top: 1px solid ${({theme}) => theme.colors.secondary};;
  border-bottom: 1px solid ${({theme}) => theme.colors.secondary};;
`


const Item = (props: { item: string, i: number, setRef: any, initialRef?: any }) => {
    const {item, i, setRef, initialRef} = props;
    const ref = useRef<HTMLButtonElement>(null);

    const mergeRefs = (...refs: any) => {
        return (node: any) => {
            for (const ref of refs) {
                if (ref === undefined) continue;
                ref.current = node
            }
        }
    }

    const variants = {
        initial: {opacity: 0, x: -20},
        animate: {opacity: 1, x: 0, transition: {duration: 0.3, delay: i * 0.25}}
    }

    return <ButtonContainer ref={mergeRefs(ref, initialRef || undefined)} onClick={() => setRef({item, ref})}
                            variants={variants} initial={"initial"} animate={"animate"}>
        {item}
    </ButtonContainer>
}

const ButtonContainer = styled(motion.button)`
  flex: 1;

  border: none;
  font-size: 1.25rem;
  font-style: italic;

  cursor: pointer;
  background-color: transparent;
  color: ${({theme}) => theme.text.primary};
`

const Selector = styled.div`
  position: absolute;
  width: 3px;
  height: 40px;
  background: ${({theme}) => theme.colors.secondary};

  transition: all 0.5s ease;
`
