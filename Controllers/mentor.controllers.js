import Mentor from "../Models/mentor.schema.js";
import Student from "../Models/student.schema.js";


export const creatementor=async(req,res)=>{
    try {
        const mentor=new Mentor(req.body)
        await mentor.save()
        res.status(200).json(mentor)

    } catch (error) {
        res.status(500).json({error:"error in creating mentor"})
    }

}

export const getmentor=async(req,res)=>{
    try {
        const mentor=await Mentor.find()
        const result=await mentor.map((val)=>{
            return {
                mentor_name: val.mentor_name, expertise: val.expertise
            }
        })
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error:"error in get_mentor"})
    }
}


export const getmentortomultiplestudent_get=async(req,res)=>{
    try {
        const mentor=await Mentor.find()
        res.status(200).json(mentor)
    } catch (error) {
        res.status(500).json("Error")
    }
}
//Assign student to mentor and multiple student to mentor
export const getmentortomultiplestudent = async (req, res) => {
    const { mentor, student_name } = req.body;
    try {
        // Check if the mentor exists
        const mentorRecord = await Mentor.findOne({ mentor_name: mentor });
        if (!mentorRecord) {
            return res.status(400).json({ error: "Mentor not found" });
        }
        const arr = await Promise.all(
            student_name.map(async (val) => {
                try {
                    const studentRecord = await Student.findOne({ student_name: val });
                    if (mentorRecord.students.some(student => student.student_name === val)) {
                        return res.status(500).json({message: "Already assigned"})  
                    }
                    console.log("studentrecord", studentRecord);
                    const prevmentor = await Student.findOneAndUpdate(
                        { student_name: val },
                        { $push: { prevmentor: mentorRecord} }, // Add the new mentor field
                        { new: true }
                    );
                    console.log(prevmentor);
                    return studentRecord;
                } catch (error) {
                    console.error("Error finding student:", error);
                    throw error; // Throw the error to handle it later, if necessary
                }
            })
        );        
        // console.log("arr",arr);
        // Update the student's Mentor field
        const updatedStudent = await Mentor.findOneAndUpdate(
                { mentor_name: mentorRecord.mentor_name },
                { $set: { students: [...mentorRecord.students,arr[0]]} }, // Add the new mentor field
                { new: true }
            );
        // res.status(200).json(prevmentortoStudent)
        if (!updatedStudent) {
            return res.status(400).json({ error: "Student not found" });
        }
        else{
            res.status(200).json(updatedStudent);
        }

    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getStudentsForMentor = async (req, res) => { 
    const {mentor_name,studentname}=req.body
    try {
        const student=await Student.aggregate([
            {
                $match:{
                    student_name:studentname
                }
            },
            {
                $set:{
                    Mentor:mentor_name
                }
            },
            {
                $lookup:{
                    from:"mentors",//collection name
                    localField:"Mentor",//student schema field
                    foreignField:"mentor_name",//inpu field
                    as:'mentor_details'
                }
            },{
                $project:{
                    "_id":1,
                    "student_name":1,
                    "subject":1,
                    "Mentor":1,
                    "mentor_details":{
                        $map:{
                            input:"$mentor_details",
                            as:"mentor",
                            in:{
                                mentor_name:"$$mentor.mentor_name",
                                expertise:"$$mentor.expertise"
                            }
                        }
                    }
                }
            }
        ])
        res.status(200).json(student);
    } catch (error) {
        console.log("error",error);
        res.status(500).json({error:"Error"})
    }
};









