import { Router } from "express";
import path from 'path';

const router = Router()
const __dirname = import.meta.dirname

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin/adminDash.html'))
})

export default router;