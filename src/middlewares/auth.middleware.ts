import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export const authenticate = (roles: string[]) => {
    return async (req: any, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
 
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
            const user = await User.findById(decoded.id);
            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }

            if (!user) return res.status(401).json({ message: 'Invalid token' });
    
            req.user = user;
            if (!req.user) {
                return res.status(401).json({ message: 'User not authenticated' });
            }
    
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};


