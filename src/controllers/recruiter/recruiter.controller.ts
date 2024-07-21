import { Request, Response } from 'express';
import { Post } from '../../models/post.model';
export class RecruiterController{

// Recruiters can view the post wich are assigned to them
 async getAssignedPosts  (req: any, res: Response)  {
    try {
        const posts = await Post.find({ recruiter: req.user.id }).populate('client');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching posts', err });
    }
};

// Recruiters can add note to the Job post
async addNoteToPost  (req: any, res: Response)  {
    const { postId, note } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        post.notes.push({recruiter: req.user._id, note });
        await post.save();
        res.status(200).json({ message: 'Note added successfully', post });
    } catch (err) {
        res.status(500).json({ message: 'Error adding note', err });
    }
}
}
