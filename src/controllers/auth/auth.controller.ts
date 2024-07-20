import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../../services/user.service';
import { generateToken } from '../../utils/jwt.util';

export class AuthController{
async register (req: Request, res: Response) {
    const { email, password, role ,name} = req.body;
    try {
        const user = await createUser(email, password, role,name);
        const token = generateToken({ id: user._id.toString(), role: user.role });

        const userWithoutPassword = {
            id: user._id,
            name: user.name,
            email: user.email,
            token
          };
        res.status(201).json({ message: 'User created successfully', user : userWithoutPassword });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', err });
    }
};

async login (req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken({ id: user._id.toString(), role: user.role });
        res.status(201).json({ message: 'Logged in successfully', token });
    
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', err });
    }
}
}