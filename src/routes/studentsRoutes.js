// src/routes/studentsRoutes.js
import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  studentIdParamSchema,
  updateStudentSchema,
  createStudentSchema,
  getStudentsSchema
} from '../validations/studentsValidation.js';
import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../controllers/studentsController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();
router.use("/students", authenticate); // Захищаємо всі маршрути, що починаються на /students
router.get('/students',
  celebrate(getStudentsSchema), 
  getStudents);
router.get(
  '/students/:studentId',
  celebrate(studentIdParamSchema),
  getStudentById,
);
router.post('/students', celebrate(createStudentSchema), createStudent);
router.delete(
  '/students/:studentId',
  celebrate(studentIdParamSchema),
  deleteStudent,
);
router.patch(
  '/students/:studentId',
  celebrate(updateStudentSchema),
  updateStudent,
);

export default router;
