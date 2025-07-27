import { db } from "../connection/db.js"
import jwt from 'jsonwebtoken';
export const getAllTeachers = async (req, res) => {
    try {
        const q = `SELECT * From teachers`
        const [row] = await db.query(q);
        res.json({ success: true, message: "teachers data fetch successfuly.", data: row })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const handleRegister = async (req, res) => {
    try {
        const {
            teacher_name,
            email,
            password,
            number_of_student,
            county,
            state,
            course,
            students
        } = req.body;

        const insertTeacher =
            "INSERT INTO `teachers` ( `full_name`, `email`, `password`, `number_of_students`, `courses`, `state`,`county`) VALUES (?,?,?,?,?,?,?)";

        const teacherValues = [teacher_name, email, password, number_of_student, county, course, state, county];
        const [insertedRes] = await db.query(insertTeacher, teacherValues);

        const teacherId = insertedRes.insertId;

        if (teacherId) {
            for (const s of students) {
                const insertStudent = "INSERT INTO `students`(`student_full_name`, `email`, `password`, `course`, `teacher_id`) VALUES (? ,? ,? ,? ,? )"
                const studentValues = [s.student_full_name, s.email, s.password, s.course, teacherId]

                await db.query(insertStudent, studentValues);
            }

        }
        return res.json({ success: true, message: "Teacher and students inserted successfully", teacher_id: teacherId });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const teacherLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "email and password are required." })
        }

        if (email && password) {

            const checkEmailQuery = "SELECT * FROM `teachers` WHERE email = ?";
            const [RowInfo] = await db.query(checkEmailQuery, [email]);

            if (RowInfo.length == 0) {
                return res.json({ success: false, message: "teacher not found." })
            }

            if ( RowInfo[0].password != password) {
                return res.json({ success: false, message: "Invalide password." })
            }

            if (RowInfo[0].email == email && RowInfo[0].password == password) {
                const token = jwt.sign({ id: RowInfo[0].id }, 'your_secret_key', { expiresIn: '1d' });
                return res.json({ success: true, message: "Login successfully", teacher_id: RowInfo[0].id, token:token })
            }else{
                return res.json({ success: false, message: "something went wrong" })
            }

        }


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
} 

