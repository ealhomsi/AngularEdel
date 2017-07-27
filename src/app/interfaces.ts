export interface Post {
    id: number;
    author: string;
    parentTopic: number;
    bodyText: string;
}

export interface Topic {
    id: number;
    parent: number;
    subject: string;
    author: string;
}

export interface Board {
    id: number;
    name: string;
    description: string;
}
