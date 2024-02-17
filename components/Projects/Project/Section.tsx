import styled, {css} from 'styled-components';

const SectionHeaderContainer = styled.div<{ isSubSection: boolean }>`
    padding: 0.5rem 0;
    border-bottom: 2px solid ${({theme}) => theme.colors.accentEnd}; // More visible border using accent color
    display: flex;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 1rem;

    ${({isSubSection}) => isSubSection && css`
        padding-left: 1rem;
        background: ${({theme}) => theme.colors.background};
        border-left: 4px solid ${({theme}) => theme.colors.accentStart};
    `}
`;

const SectionTitle = styled.h2<{ isSubSection: boolean }>`
    color: ${({theme}) => theme.colors.accentStart};
    font-size: 1.75em; // Larger font-size for main sections
    font-weight: bold;
    margin-right: 1rem; // Space before subsection links
    color: ${({theme}) => theme.text.primary};

    ${({isSubSection}) => isSubSection && css`
        font-size: 1.2em; // Adjusted for better hierarchy
        font-weight: 600; // Slightly bolder than normal text but less than bold
        color: ${({theme}) => theme.colors.secondary}; // Slightly muted color for subsections
    `}
`;

const SubSectionLinksContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem; // Consistent gap between links
`;

const SubSectionLink = styled.a`
    cursor: pointer;
    user-select: none;
    color: ${({theme}) => theme.colors.accentEnd}; // Use accent color for links

    font-size: 0.9em; // Smaller than main text
    color: ${({theme}) => theme.colors.accentEnd};
    margin-right: 0.5rem; // Space after subsection link

    font-weight: 500;
    padding: 0.2rem 0;
    border-bottom: 2px solid transparent;

    &:hover {
        color: ${({theme}) => theme.text.primary};
        border-bottom: 2px solid ${({theme}) => theme.colors.accentEnd};
    }
`;

interface SectionHeaderProps {
    title: string;
    id?: string;
    subSections?: string[];
    isSubSection?: boolean;
}

export default function SectionHeader({title, id, subSections = [], isSubSection = false}: SectionHeaderProps) {
    const scrollToSubSection = (subSectionId: string) => {
        const subSection = document.getElementById(subSectionId);
        if (subSection) {
            const sectionTop = subSection.getBoundingClientRect().top + window.scrollY - 70;

            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    };

    return <SectionHeaderContainer isSubSection={isSubSection} id={id || title}>
        <SectionTitle isSubSection={isSubSection}>{title}</SectionTitle>
        {subSections.length > 0 && (
            <SubSectionLinksContainer>
                {subSections.map((subSection, index) => (
                    <SubSectionLink key={subSection} onClick={() => scrollToSubSection(subSection)}>
                        {subSection}
                    </SubSectionLink>
                ))}
            </SubSectionLinksContainer>
        )}
    </SectionHeaderContainer>
}
