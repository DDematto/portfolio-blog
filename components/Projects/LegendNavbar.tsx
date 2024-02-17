import styled from 'styled-components';

const StickyHeader = styled.header`
    position: sticky;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.5rem 1rem;
    z-index: 1000;
    display: flex;
    justify-content: space-evenly; // Adjusted for spacing between elements
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const LegendButton = styled.a`
    padding: 0.5rem 1rem;
    margin: 0 0.5rem; // Space between buttons
    text-decoration: none;
    cursor: pointer;
    color: ${({theme}) => theme.text.secondary};
    transition: color 0.2s, background-color 0.2s;
    border-radius: 6px;

    &:hover {
        color: ${({theme}) => theme.colors.background};
        background-color: ${({theme}) => theme.text.secondary};
    }
`;

export default function LegendNavbar({sections}: { sections: string[] }) {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY - 70;

            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    };

    return sections.length > 0 ? <StickyHeader>
        {sections.map((section) => (
            <LegendButton key={section} onClick={() => scrollToSection(section)}>
                {section}
            </LegendButton>
        ))}
    </StickyHeader> : <></>
}
