import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
// Код імпортів та підключення middleware бібліотек
import { logger } from './middleware/logger.js';
import cookieParser from 'cookie-parser';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';


import authRoutes from './routes/authRoutes.js';
import studentsRoutes from './routes/studentsRoutes.js';




const app = express();
const PORT = process.env.PORT ?? 3000;

// Глобальні middleware
app.use(logger);         // 1. Логер першим — бачить усі запити
app.use(express.json({
    limit: '100kb' // обмежуємо розмір тіла запиту
})); // 2. Парсинг JSON-тіла
app.use(cookieParser());
app.use(cors());         // 3. Дозвіл для запитів з інших доменів

// Підключаємо групу маршрутів для аутентифікації
app.use(authRoutes);
// підключаємо групу маршрутів студента
app.use(studentsRoutes);

// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);
app.use(errors());
// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


