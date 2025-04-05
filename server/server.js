import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from '../server/db/connectMongoDB.js';
import authRoutes from '../server/routes/auth.routes.js';

dotenv.config(); // ย้ายมาที่นี่

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ตรวจสอบว่า MONGO_URI ถูกโหลดหรือไม่
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file");
    process.exit(1);
}

// MongoDB connection
connectMongoDB();

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});