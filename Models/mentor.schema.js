import mongoose from "mongoose";

const mentSchema=mongoose.Schema({
    mentor_name:String,
    expertise:String,
    students:Array

})
const Mentor=mongoose.model("Mentor",mentSchema)

export default Mentor;