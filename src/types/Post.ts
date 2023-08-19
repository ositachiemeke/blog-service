export interface PostModelInterface {
    id: number;
    title: string;
    content: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface createPostInterface {
    title: string;
    content: string;
    user_id: string;
}

export interface UpdatePostPayloadInterface {
    updated_at?: string;
    title?: string;
    content?: string;
    post_id: number;
}

