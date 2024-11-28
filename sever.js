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

const updatePerfumeStock = async (id, type, amount) => {
    const filePath = path.join(__dirname, 'src/api/perfumesData.json');
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const perfumes = JSON.parse(data);
        const perfume = perfumes.find(perfume => perfume.id === parseInt(id, 10));
        if (perfume) {
            const stockItem = perfume.stock.find(stockItem => stockItem.type === type);
            if (stockItem) {
                stockItem.amount += amount;
                if (stockItem.amount < 0) {
                    stockItem.amount = 0;
                }
            }
        }
        await fs.writeFile(filePath, JSON.stringify(perfumes, null, 2));
    } catch (error) {
        console.error('Error updating perfumesData.json:', error);
        throw error;
    }
};

app.get('/api/perfumes', async (req, res) => {
    try {
        const perfumes = await getPerfumes();
        let filteredPerfumes = perfumes;

        const { search, sortName, sortPrice } = req.query;

        if (search) {
            filteredPerfumes = filteredPerfumes.filter(perfume =>
                perfume.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (sortName && sortName !== 'None') {
            filteredPerfumes.sort((a, b) => {
                if (sortName === 'NameAsc') {
                    return a.title.localeCompare(b.title);
                } else if (sortName === 'NameDesc') {
                    return b.title.localeCompare(a.title);
                }
                return 0;
            });
        } else if (sortPrice && sortPrice !== 'None') {
            filteredPerfumes.sort((a, b) => {
                if (sortPrice === 'PriceLowToHigh') {
                    return a.price - b.price;
                } else if (sortPrice === 'PriceHighToLow') {
                    return b.price - a.price;
                }
                return 0;
            });
        }

        await delay(300);

        res.json(filteredPerfumes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch perfumes data' });
    }
});

app.get('/api/perfumes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const perfumes = await getPerfumes();
        const perfume = perfumes.find(perfume => perfume.id === parseInt(id, 10));

        if (!perfume) {
            return res.status(404).json({ error: 'Perfume not found' });
        }

        await delay(500);

        res.json(perfume);
    } catch (error) {
        console.error('Error loading perfume:', error);
        res.status(500).json({ error: 'Failed to load perfume' });
    }
});

app.patch('/api/update-stock', async (req, res) => {
    const { id, type, amount } = req.body;
    try {
        await updatePerfumeStock(id, type, amount);
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).json({ error: 'Failed to update stock' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});