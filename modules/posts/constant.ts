export type PostItem = {
    title: string;
    id: number;
    author: string;
    created_at: string;
    rating: number;
    description: string;
};

export interface IPostItemProps {
    item: PostItem;
}

export interface IPostProps {
    onSelect?: (item: number) => void;
    posts: PostItem[];
}

export type PostFilter = {
    name?: string;
    page: string;
    limit: string;
    type?: string;
};

export interface HotPostProps {
    post: PostItem;
}

export type PostBody = {
    title: string;
    description: string;
    type: string;
    status: string;
    // image: string;
    fee: number,
    count: number,
    level: string
    time: string
}

export interface ICreatePostProps {
    open: boolean
    setOpen: (open: boolean) => void
    onSubmit: (data: any) => void
}