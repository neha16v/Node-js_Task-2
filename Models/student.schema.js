import mongoose from "mongoose";

const studSchema=mongoose.Schema({
    student_name:String,
    subject:String,
    Mentor:String,
    prevmentor:Array
})

const Student=mongoose.model("Student",studSchema)

export default Student;