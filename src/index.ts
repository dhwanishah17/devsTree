import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import routes from './routes';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('Server connected successfully'))
    .catch(err => console.error(err));

app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
