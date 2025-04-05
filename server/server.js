import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from '../server/db/connectMongoDB.js';
import authRoutes from '../server/routes/auth.routes.js'; // .js cuz use teype of module

const app = express();
const PORT = process.env.PORT || 5000;


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
dotenv.config();

console.log(process.env.MONGO_URI);
// MongoDB connection

// localhost:5000/api/auth/signup
app.use('/api/auth', authRoutes);



app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
    connectMongoDB();
});