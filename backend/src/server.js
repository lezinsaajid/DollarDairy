const express = require('express');
const cors = require('cors');
const env = require('./config/env.js');
const { db, schema } = require('./config/db.js');
const job = require('./config/cron.js');

const app = express();
app.use(cors({ origin: 'http://localhost:8000' }));
app.use(express.json());

if (env.NODE_ENV === "production") job.start();

// --- CATEGORIES ---
app.post('/categories', async (req, res) => {
    try {
        const { userId, name, type, color } = req.body;
        if (!userId || !name || !type) return res.status(400).send('Missing fields');
        const category = await db.insert(schema.Categories).values({ userId, name, type, color }).returning();
        res.status(201).json(category[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/categories/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const categories = await db.select().from(schema.Categories).where(schema.Categories.userId.eq(Number(userId))).all();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- TRANSACTIONS ---
app.post('/transactions', async (req, res) => {
    try {
        const { userId, categoryId, title, amount, type, date } = req.body;
        if (!userId || !title || !amount || !type || !date) return res.status(400).send('Missing fields');
        const transaction = await db.insert(schema.Transactions).values({ userId, categoryId, title, amount, type, date }).returning();
        res.status(201).json(transaction[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/transactions/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await db.select().from(schema.Transactions).where(schema.Transactions.userId.eq(Number(userId))).all();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.put('/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        await db.update(schema.Transactions).set(updates).where(schema.Transactions.id.eq(Number(id)));
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete('/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.delete(schema.Transactions).where(schema.Transactions.id.eq(Number(id)));
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true });
});

const PORT = env.PORT || 7000;
app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
