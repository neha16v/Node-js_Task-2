import Student from "../Models/student.schema.js";

export const createstudent=async(req,res)=>{
    try {
        const student=new Student(req.body)
        await student.save();
        res.status(200).json(student)
    } catch (error) {
        res.status(200).json({error:"error in creating student"})
    }
}

export const getstudent=async(req,res)=>{
    try {
        const student=await Student.find();
        res.status(200).json(student)
    } catch (error) {
        res.status(200).json({error:"error in get_student"})
    }
}