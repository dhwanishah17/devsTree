import { Request, Response } from 'express';
import { createPost, findAllPosts } from '../../services/post.service';
import { User } from '../../models/user.model';

export class ClientsController{
 async createJobPost  (req: any, res: Response)  {
    const { title, description } = req.body;
    try {
        const recruiters = await User.find({ role: 'Recruiter' });
        const randomRecruiter = recruiters[Math.floor(Math.random() * recruiters.length)];

        const post = await createPost(title, description, req.user._id.toString(), randomRecruiter._id.toString());
        res.status(201).json({ message: 'Job post created successfully', post });
    } catch (err) {
        res.status(500).json({ message: 'Error creating job post', err });
    }
};

 async getAllJobPosts  (req: Request, res: Response)  {
    try {
        const posts = await findAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching job posts', err });
    }
}
}