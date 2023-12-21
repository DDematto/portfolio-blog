import styled from 'styled-components';

export const TagColors: { [key: string]: string } = {
    react: "#61dafb",
    python: "#3776ab",
    javascript: "#f7df1e",
    angular: "#dd1b16",
    vue: "#42b883",
    nodejs: "#539e43",
    sass: "#cc6699",
    webpack: "#8ed6fb",
    docker: "#2496ed",
    kubernetes: "#326ce5",
    typescript: "#3178c6",
    html5: "#e34f26",
    css3: "#1572b6",
    ruby: "#cc342d",
    rails: "#cc0000",
    java: "#f89820",
    spring: "#6db33f",
    swift: "#f05138",
    ios: "#0d96f6",
    android: "#3ddc84",
    go: "#00add8",
    php: "#777bb4",
    laravel: "#ff2d20",
    ".net": "#512bd4",
    csharp: "#239120",
    cplusplus: "#00599c",
    c: "#a8b9cc",
    rust: "#dea584",
    dart: "#00d2b8",
    flutter: "#02569b",
    tensorflow: "#ff6f00",
    keras: "#d00000",
    pandas: "#150458",
    numpy: "#4dabcf",
    postgresql: "#336791",
    mysql: "#4479a1",
    mongodb: "#47a248",
    git: "#f05032",
    github: "#181717",
    gitlab: "#fc6d26",
    aws: "#ff9900",
    azure: "#0089d6",
    gcp: "#1a73e8",
    linux: "#fcc624",
    bash: "#4eaa25",
    zsh: "#c5db00",
    babel: "#f9dc3e",
    jquery: "#0769ad",
    svelte: "#ff3e00",
    nextjs: "#000000",
    nuxtjs: "#00c58e",
    tailwindcss: "#38b2ac",
    bootstrap: "#7952b3",
    materialui: "#0081cb",
    redux: "#764abc",
    apollo: "#311c87",
    electron: "#47848f",
    express: "#000000",
    socketio: "#010101",
    nestjs: "#e0234e",
    vercel: "#000000",
    heroku: "#430098",
    firebase: "#ffca28",
    strapi: "#2f2e8b",
    gatsby: "#663399",
    graphql: "#e10098",
    prisma: "#2d3748",
    solidity: "#363636",
    ethereum: "#3c3c3d",
    blockchain: "#1256c7",
    xamarin: "#3498DB",
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

