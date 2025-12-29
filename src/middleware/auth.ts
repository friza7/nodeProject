import path from 'path';
import jwt from 'jsonwebtoken';
import pool from '../config/db.ts';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const __dirname = import.meta.dirname

export const auth = (role : string) => {
    return (req : any, res : any, next : any) => {
        const token : string = req.cookies.token
        
        if (!token) {
            return res.redirect('/auth/login')
        }

        try {
            const decoded : any = jwt.verify(token, process.env.JWT_SECRET as string)

            if (!decoded) {
                return res.redirect('/auth/login')
            }

            if (decoded.role !== role) {
                return res.redirect('/auth/login')
            }

            console.log(`token and role checked for ${decoded.username} and granted access to ${req.originalUrl}`)

        } catch (err) {
            console.error(`${err}`)
            return res.status(500).json({msg: 'Server side error'})
        }
        next()
    }
}

export const checkAdmin = async (req: any, res : any, next : any) => {
    try {
        const [rows] : any = await pool.execute('SELECT * FROM users WHERE role = "admin"');

        if (rows.length < 1) {
            return res.redirect('/auth/createAdmin')
        }

        res.cookie('adminExists', true, {
            httpOnly: true,
            maxAge: 7200000
        })

        next()
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
    
}