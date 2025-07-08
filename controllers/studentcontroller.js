// controllers/studentcontroller.js

import Student from "../models/student.js";

export function getstudents(req, res) {
    Student.find()
        .then((studentlist) => {
            res.json({ list: studentlist });
        })
        .catch((err) => {
            res.status(500).json({ message: "Error fetching students" });
        });
}

export function createstudent(req, res) {
    const newStudent = new Student(req.body);
    newStudent.save()
        .then(() => {
            res.json({ message: "Student created" });
        })
        .catch(() => {
            res.status(400).json({ message: "Student not created" });
        });
}

