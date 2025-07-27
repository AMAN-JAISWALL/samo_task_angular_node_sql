import express from 'express';
import { getAllTeachers,handleRegister, teacherLogin } from '../controller/teachersController.js';

const router = express.Router();

router.get('/get',getAllTeachers);
router.post('/register',handleRegister);
router.post('/login',teacherLogin);



export default router