const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // מאפשר גישה לקבצים סטטיים

// ROOT - מציג את index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// שליפת פגישות
app.get('/newP.json', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'public', 'newP.json');
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('❌ שגיאה בשליפת הפגישות:', error);
        res.status(500).json([]);
    }
});

// שליפת חגים
app.get('/holidays', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'public', '12.json');
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('❌ שגיאה בשליפת החגים:', error);
        res.status(500).json([]);
    }
});

// שמירת פגישות
app.post('/save-meetings', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'public', 'newP.json');
        await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));
        res.json({ message: '✅ הפגישות נשמרו בהצלחה' });
    } catch (error) {
        console.error('❌ שגיאה בשמירת הפגישות:', error);
        res.status(500).json({ message: '❌ שגיאה בשמירה' });
    }
});

// favicon
app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(PORT, () => {
    console.log(`🚀 השרת רץ על http://localhost:${PORT}`);
});
