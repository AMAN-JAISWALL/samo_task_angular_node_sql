import express from 'express';
import { getAllStudents } from '../controller/studentsController.js';

const router = express.Router();

router.post('/getAllStudents',getAllStudents);



export default router