import { db } from "../connection/db.js"
export const getAllStudents = async (req, res) =>{

    try {
        const { teacher_id } = req.body;

        if(!teacher_id){
            return res.json({success:false, message:"Teacher id is required."})
        }

        const query = "SELECT * FROM `students` WHERE teacher_id = ?";

        const [rows] = await db.query(query,[teacher_id]);

        if(rows.length>0){
            res.json({success:true,message:"students_data",data:rows});
        }


    } catch (error) {
        res.json({success:false, message:error.message})
    }
    const {id} = req.body;


}