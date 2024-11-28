import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';

const app = express();
const PORT = 5000;

app.use(express.json());

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'build')));

const getPerfumes = async () => {
    const filePath = path.join(__dirname, 'src/api/perfumesData.json');
    try {
        await fs.access(filePath);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error accessing or reading perfumesData.json:', error);
        throw error;
    }
};

let cart = []; // Тимчасове сховище для кошика

// Отримання парфумів
app.get('/api/perfumes', async (req, res) => {
    try {
        const perfumes = await getPerfumes();
        res.json(perfumes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch perfumes data' });
    }
});

// Отримання товарів у кошику
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// Додавання товару в кошик
app.post('/api/cart', (req, res) => {
    const { id, title, imageUrl, price, type, volume, quantity } = req.body;
    const existingPerfume = cart.find(
        p => p.id === id && p.type === type && p.volume === volume
    );

    if (existingPerfume) {
        existingPerfume.quantity += quantity;
    } else {
        cart.push({ id, title, imageUrl, price, type, volume, quantity });
    }
    res.status(201).json(cart);
});

// Функція затримки для імітації часу виконання запиту
app.get('/api/delay', async (req, res) => {
    await delay(2000);
    res.send({ message: "Цей запит був затриманий на 2 секунди" });
});

// Тестовий маршрут для перевірки роботи сервера
app.get('/api/test', (req, res) => {
    res.json({ message: "Сервер працює правильно!" });
});

// Обробка випадків, коли потрібний файл не знайдено
app.get('/api/not-found', (req, res) => {
    res.status(404).json({ error: "Ресурс не знайдено" });
});

// Маршрут для додаткової перевірки серверного логу
app.post('/api/log', (req, res) => {
    console.log("Лог з клієнта:", req.body);
    res.status(200).json({ message: "Лог отримано" });
});

// Обробка будь-яких інших маршрутів (для React Router)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
