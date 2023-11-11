import express from 'express';
import { createstudent,getstudent } from '../Controllers/student.controllers.js';

const router=express.Router();

router.post('/createstudent',createstudent);
router.get('/getstudent',getstudent)

export default router