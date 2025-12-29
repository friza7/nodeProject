import express from 'express';
import 'dotenv/config';
// import path from 'path';
// import pool from './config/db.ts';
// import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import {auth} from './middleware/auth.ts';
import adminRoutes from './routes/adminRoutes.ts';
import authRoutes from './routes/authRoutes.ts';

const app = express();
const PORT : number = Number(process.env.PORT) || 3000

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.redirect('/auth/login')
})

app.use('/auth', authRoutes)

app.use('/admin', auth('admin'), adminRoutes)

app.use((req, res) => {
    res.status(404).send('Resource not found')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})