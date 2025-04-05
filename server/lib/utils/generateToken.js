import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        // 
        secure: process.env.NODE_ENV !== 'development', // Set to true in Production
        sameSite: 'strict', // ตั้งค่าเป็น 'strict' เพื่อป้องกัน CSRF
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
}