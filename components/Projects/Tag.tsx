import styled from 'styled-components';

export const TagColors: { [key: string]: string } = {
    react: "#61dafb",
    python: "#3776ab",
    javascript: "#f7df1e",
    typescript: "#3178c6",
    html5: "#e34f26",
    css3: "#1572b6",
    nextjs: "#7a6767",
    vercel: "#0070F3",
    unity: "#000000",
    unreal: "#0e1128",
};


function lookupTagColor(tag: string) {
    let color = 'white';
    const lowerCaseTag = tag.toLowerCase();
    if (TagColors[lowerCaseTag]) {
        color = TagColors[lowerCaseTag];
    }
    return color;
}

interface ITag {
    name: string;
    removeTag?: () => void;
}

export default function Tag(props: ITag) {
    const {name, removeTag} = props;

    return <TagBox tagColor={lookupTagColor(name)} onClick={removeTag}>
        {name}
        {removeTag && <RemoveIndicator tagColor={lookupTagColor(name)}/>}
    </TagBox>
};

const TagBox = styled.span<{ tagColor: string }>`
  background-color: transparent;
  color: ${({tagColor}) => tagColor};
  padding: 2px 8px;
  border: 1px solid ${({tagColor}) => tagColor};
  border-radius: 5px;
  font-size: 0.75em;
  margin-right: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;


const RemoveIndicator = styled.span<{ tagColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  color: ${({tagColor}) => tagColor};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  margin-left: 8px;

  &:after {
    content: '×';
  }
`;

