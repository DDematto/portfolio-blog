export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    tags: string[];
    link?: string;
    linkText?: string;
    github?: string;
    date: string;
}
