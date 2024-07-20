import { Request, Response } from 'express';
import { User } from '../../models/user.model';

export class AdminController {

 async createRecruiter (req: Request, res: Response) {
    const { email, password,name } = req.body;
    try {
        const user = new User({ email, password, role: 'Recruiter',name });
        await user.save();
        const userWithoutPassword = {
            id: user._id,
            name: user.name,
            email: user.email,
          };
        res.status(201).json({ message: 'Recruiter created successfully', user:userWithoutPassword });
    } catch (err) {
        res.status(500).json({ message: 'Error creating recruiter', err });
    }
};

 async getAllRecruiters (req: Request, res: Response) {
    try {
        const recruiters = await User.find({ role: 'Recruiter' });
        res.status(200).json(recruiters);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching recruiters', err });
    }
};

 async getAllClients (req: Request, res: Response) {
    try {
        const clients = await User.find({ role: 'Client' });
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching clients', err });
    }
}
}