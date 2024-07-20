import { User } from '../models/user.model';

export const createUser = async (email: string, password: string, role: string,name:string) => {
    const user = new User({ email, password, role,name });
    await user.save();
    return user;
};

export const findUserByEmail = async (email: string) => {
    return User.findOne({ email });
};

export const findUserById = async (id: string) => {
    return User.findById(id);
};
