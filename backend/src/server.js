const express = require('express');
const cors = require('cors');
const env = require('./config/env.js');
const { db, schema } = require('./config/db.js');
const { and, eq } = require("drizzle-orm");
const job = require('./config/cron.js');

const authMiddleware = require('./middleware/authMiddleware.js');

const app = express();
const PORT = env.PORT || 7000;

if (env.NODE_ENV === "production") {
    job.start();
}

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true });
});

// --- CATEGORIES ---
app.post('/categories', authMiddleware, async (req, res) => {
    try {
        const { name, type, color } = req.body;
        const userId = req.auth.userId;
        if (!name || !type) return res.status(400).send('Missing fields');
        const category = await db.insert(schema.Categories).values({ userId, name, type, color }).returning();
        res.status(201).json(category[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/categories', authMiddleware, async (req, res) => {
    try {
        const userId = req.auth.userId;
        const categories = await db.select().from(schema.Categories).where(eq(schema.Categories.userId, userId)).all();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- TRANSACTIONS ---
app.post('/transactions', authMiddleware, async (req, res) => {
    try {
        const { categoryId, title, amount, type, date } = req.body;
        const userId = req.auth.userId;
        if (!title || !amount || !type || !date) return res.status(400).send('Missing fields');
        const transaction = await db.insert(schema.Transactions).values({ userId, categoryId, title, amount, type, date }).returning();
        res.status(201).json(transaction[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/transactions', authMiddleware, async (req, res) => {
    try {
        const userId = req.auth.userId;
        const transactions = await db.select().from(schema.Transactions).where(eq(schema.Transactions.userId, userId)).all();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.put('/transactions/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.auth.userId;
        const updates = req.body;
        // Ensure user can only update their own records
        await db.update(schema.Transactions).set(updates).where(and(eq(schema.Transactions.id, Number(id)), eq(schema.Transactions.userId, userId)));
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete('/transactions/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.auth.userId;
        await db.delete(schema.Transactions).where(and(eq(schema.Transactions.id, Number(id)), eq(schema.Transactions.userId, userId)));
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
