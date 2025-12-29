import { Router } from "express";
import path from 'path';
import jwt from 'jsonwebtoken';
import pool from '../config/db.ts';
import bcrypt from "bcryptjs";
import {checkAdmin} from '../middleware/auth.ts';

const router = Router()
const __dirname = import.meta.dirname

router.use('/login', checkAdmin)

router.get('/login', (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');

    const token = req.cookies.token;
    if (!token) {
        return res.sendFile(path.join(__dirname, '../../public/auth/login.html'))
    }

    try {
        const decoded : any = jwt.verify(token, process.env.JWT_SECRET as string)

        if (decoded.role === 'admin') {
            return res.redirect('/admin/dashboard')
        } else {
            return res.redirect('/user/dashboard')
        }

    } catch (err) {
        res.clearCookie('token')
        return res.sendFile(path.join(__dirname, '../../public/auth/login.html'))
    }

})

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body

        let [rows] : any= await pool.execute('SELECT * from users WHERE username = ? AND password = ?', [username, password])

        if (rows.length === 0) {
            return res.status(401).json({msg: 'wrong credentials'})
        } 

           rows = rows[0]

        const payload = {
            id: rows.id,
            username: username,
            role: rows.role
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            {expiresIn: '2h'}

        )

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7200000
        })

        return res.status(200).json({role: rows.role})

    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: 'Server side error'})
    }
})

router.get('/createAdmin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/auth/createAdmin.html'))
})

router.post('/createAdmin', async (req, res) => {
    try {
        const {username, email, password} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await pool.execute('INSERT INTO users (username, email, password, role) VALUES (?,?,?,?)', [username, email, hashedPassword, 'admin'])

        return res.status(200).json({ok: true})

    } catch(err) {
        console.log(err)
        return res.status(500).json({ok: false})
    }
    
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.json({ok : true})
})

export default router;