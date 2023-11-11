import express from 'express';
import { creatementor,getmentor,getmentortomultiplestudent,getStudentsForMentor,getmentortomultiplestudent_get} from '../Controllers/mentor.controllers.js';

const router=express.Router();

router.post('/creatementor',creatementor)
router.get('/getmentor',getmentor)
router.post("/getmentortomultiplestudent",getmentortomultiplestudent)
router.get("/getmentortomultiplestudent_get",getmentortomultiplestudent_get)
router.post("/getStudentsForMentor",getStudentsForMentor)


export default router