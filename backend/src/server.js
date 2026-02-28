const express = require('express');
const cors = require('cors');
const env = require('./config/env.js');
const { db, schema } = require('./config/db.js');
const { and, eq, between, gte, lte, desc } = require("drizzle-orm");
const job = require('./config/cron.js');

const authMiddleware = require('./middleware/authMiddleware.js');
const errorMiddleware = require('./middleware/errorMiddleware.js');
const reportService = require('./services/reportService.js');
const insightService = require('./services/insightService.js');
const scanService = require('./services/scanService.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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
app.post('/categories', authMiddleware, async (req, res, next) => {
    try {
        const { name, type, color } = req.body;
        const userId = req.auth.userId;
        if (!name || !type) return res.status(400).send('Missing fields');
        const category = await db.insert(schema.Categories).values({ userId, name, type, color }).returning();
        res.status(201).json(category[0]);
    } catch (err) {
        next(err);
    }
});
app.get('/categories', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const categories = await db.select().from(schema.Categories).where(eq(schema.Categories.userId, userId)).all();
        res.json(categories);
    } catch (err) {
        next(err);
    }
});

// --- SETTINGS ---
app.get('/settings', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        let settings = await db.select().from(schema.UserSettings).where(eq(schema.UserSettings.userId, userId)).get();
        if (!settings) {
            settings = (await db.insert(schema.UserSettings).values({ userId, currency: 'USD' }).returning())[0];
        }
        res.json(settings);
    } catch (err) {
        next(err);
    }
});

app.post('/settings', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const { currency } = req.body;
        const existing = await db.select().from(schema.UserSettings).where(eq(schema.UserSettings.userId, userId)).get();
        if (existing) {
            await db.update(schema.UserSettings).set({ currency, updatedAt: new Date() }).where(eq(schema.UserSettings.userId, userId));
            res.sendStatus(204);
        } else {
            const settings = await db.insert(schema.UserSettings).values({ userId, currency }).returning();
            res.status(201).json(settings[0]);
        }
    } catch (err) {
        next(err);
    }
});

// --- BUDGETS ---
app.get('/budgets', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const budgets = await db.select().from(schema.Budgets).where(eq(schema.Budgets.userId, userId)).all();
        res.json(budgets);
    } catch (err) {
        next(err);
    }
});

app.post('/budgets', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const { categoryId, amount, period } = req.body;
        const budget = await db.insert(schema.Budgets).values({ userId, categoryId, amount, period }).returning();
        res.status(201).json(budget[0]);
    } catch (err) {
        next(err);
    }
});

// --- TRANSACTIONS ---
app.post('/transactions', authMiddleware, async (req, res, next) => {
    try {
        const { categoryId, title, amount, type, date, currency, isRecurring, frequency } = req.body;
        const userId = req.auth.userId;
        if (!title || !amount || !type || !date) return res.status(400).send('Missing fields');

        const transaction = await db.insert(schema.Transactions).values({
            userId,
            categoryId,
            title,
            amount,
            type,
            date,
            currency: currency || 'USD',
            isRecurring: isRecurring || false,
            frequency
        }).returning();

        res.status(201).json(transaction[0]);
    } catch (err) {
        next(err);
    }
});
app.get('/transactions', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const { startDate, endDate, categoryId } = req.query;

        let conditions = [eq(schema.Transactions.userId, userId)];

        if (startDate && endDate) {
            conditions.push(between(schema.Transactions.date, startDate, endDate));
        } else if (startDate) {
            conditions.push(gte(schema.Transactions.date, startDate));
        } else if (endDate) {
            conditions.push(lte(schema.Transactions.date, endDate));
        }

        if (categoryId) {
            conditions.push(eq(schema.Transactions.categoryId, Number(categoryId)));
        }

        const transactions = await db.select()
            .from(schema.Transactions)
            .where(and(...conditions))
            .orderBy(desc(schema.Transactions.date))
            .all();

        res.json(transactions);
    } catch (err) {
        next(err);
    }
});
app.put('/transactions/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.auth.userId;
        const updates = req.body;
        // Ensure user can only update their own records
        await db.update(schema.Transactions).set(updates).where(and(eq(schema.Transactions.id, Number(id)), eq(schema.Transactions.userId, userId)));
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});
app.delete('/transactions/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.auth.userId;
        await db.delete(schema.Transactions).where(and(eq(schema.Transactions.id, Number(id)), eq(schema.Transactions.userId, userId)));
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

app.get('/transactions/export', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const transactions = await db.select()
            .from(schema.Transactions)
            .where(eq(schema.Transactions.userId, userId))
            .orderBy(desc(schema.Transactions.date))
            .all();

        if (transactions.length === 0) {
            return res.status(404).send('No transactions to export');
        }

        // Simple CSV generation
        const headers = ['Date', 'Title', 'Amount', 'Type'];
        const rows = transactions.map(t => [
            t.date,
            `"${t.title.replace(/"/g, '""')}"`,
            t.amount,
            t.type
        ].join(','));

        const csv = [headers.join(','), ...rows].join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=transactions_${new Date().toISOString().split('T')[0]}.csv`);
        res.status(200).send(csv);
    } catch (err) {
        next(err);
    }
});

// --- CARDS ---
app.get('/cards', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const cards = await db.select().from(schema.Cards).where(eq(schema.Cards.userId, userId)).all();
        res.json(cards);
    } catch (err) {
        next(err);
    }
});

app.post('/cards', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const { cardNumber, cardHolder, expiryMonth, expiryYear, type, color } = req.body;

        if (!cardNumber || !cardHolder || !expiryMonth || !expiryYear) {
            return res.status(400).send('Missing fields');
        }

        const card = await db.insert(schema.Cards).values({
            userId,
            cardNumber,
            cardHolder,
            expiryMonth,
            expiryYear,
            type: type || 'VISA',
            color: color || '#667eea'
        }).returning();

        res.status(201).json(card[0]);
    } catch (err) {
        next(err);
    }
});

// --- INSIGHTS ---
app.get('/insights', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const transactions = await db.select().from(schema.Transactions).where(eq(schema.Transactions.userId, userId)).all();
        const insights = insightService.generateInsights(transactions);
        res.json(insights);
    } catch (err) {
        next(err);
    }
});

// --- PDF REPORTS ---
app.get('/reports/monthly', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const { year, month } = req.query; // Expecting month name or number

        if (!year || !month) return res.status(400).send('Year and Month are required');

        // Fetch transactions for that month/year
        // Note: This is simplified. In a real app we'd filter strictly by date range.
        const transactions = await db.select().from(schema.Transactions).where(eq(schema.Transactions.userId, userId)).all();
        const filteredTxs = transactions.filter(t => {
            const d = new Date(t.date);
            return d.getFullYear() === parseInt(year) && (d.getMonth() + 1 === parseInt(month) || t.date.includes(month));
        });

        const stats = filteredTxs.reduce((acc, t) => {
            const amount = parseFloat(t.amount);
            if (t.type === 'income') acc.income += amount;
            else acc.expenses += amount;
            return acc;
        }, { income: 0, expenses: 0 });

        // Mocking user profile info since we don't have a local users table yet, we'd ideally get this from Clerk or a local table
        const user = { firstName: 'User', lastName: '' };

        const pdfBuffer = await reportService.generateMonthlyReport({
            user,
            month,
            year,
            transactions: filteredTxs,
            stats
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Report_${month}_${year}.pdf`);
        res.send(pdfBuffer);
    } catch (err) {
        next(err);
    }
});

// --- OCR SCANNING ---
app.post('/scan', authMiddleware, upload.single('receipt'), async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).send('No image uploaded');
        const results = await scanService.scanReceipt(req.file.path);
        // Clean up: ideally delete the file after processing
        // const fs = require('fs'); fs.unlinkSync(req.file.path);
        res.json(results);
    } catch (err) {
        next(err);
    }
});

// Error handling middleware should be at the end
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
