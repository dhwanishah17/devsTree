import { Post } from '../models/post.model';

export const createPost = async (title: string, description: string, client: string, recruiter: string) => {
    const post = new Post({ title, description, client, recruiter });
    await post.save();
    return post;
};

export const findPostById = async (id: string) => {
    return Post.findById(id).populate('client recruiter');
};

export const findAllPosts = async () => {
    return Post.find().populate('client recruiter');
};
