const cron = require("cron");
const https = require("https");
const { db, schema } = require('./db.js'); // Assuming db.js is in the same dir or adjust path
const { eq, and, sql } = require("drizzle-orm");

// Keep-alive job (every 14 mins)
const keepAliveJob = new cron.CronJob("*/14 * * * *", function () {
    const apiUrl = process.env.API_URL || 'http://localhost:7000/api/health';
    https
        .get(apiUrl, (res) => {
            if (res.statusCode === 200) console.log("Keep-alive GET request sent successfully");
            else console.log("Keep-alive GET request failed", res.statusCode);
        })
        .on("error", (e) => console.error("Error while sending keep-alive request", e));
});

// Recurring Transactions job (every day at midnight)
const recurringJob = new cron.CronJob("0 0 * * *", async function () {
    console.log("Running recurring transactions processor...");
    try {
        const today = new Date().toISOString().split('T')[0];

        // Find recurring transactions
        const recurringTxs = await db.select()
            .from(schema.Transactions)
            .where(eq(schema.Transactions.isRecurring, true))
            .all();

        for (const tx of recurringTxs) {
            // Logic: If frequency is 'daily', create one for today
            // In a real app, you'd check if today's is already created
            // For this MVP, we'll just check if the last transaction date + frequency = today

            // Simplified logic: If daily, and it's a new day, we create it.
            // Frequency could be 'daily', 'weekly', 'monthly'

            let shouldCreate = false;
            const txDate = new Date(tx.date);
            const now = new Date();

            if (tx.frequency === 'daily') {
                shouldCreate = true;
            } else if (tx.frequency === 'weekly' && now.getDay() === txDate.getDay()) {
                shouldCreate = true;
            } else if (tx.frequency === 'monthly' && now.getDate() === txDate.getDate()) {
                shouldCreate = true;
            }

            if (shouldCreate) {
                await db.insert(schema.Transactions).values({
                    userId: tx.userId,
                    categoryId: tx.categoryId,
                    title: `${tx.title} (Recurring)`,
                    amount: tx.amount,
                    currency: tx.currency,
                    type: tx.type,
                    date: today,
                    isRecurring: false, // The new one isn't a "template" unless it spawns more
                });
                console.log(`Created recurring transaction for user ${tx.userId}: ${tx.title}`);
            }
        }
    } catch (err) {
        console.error("Error processing recurring transactions:", err);
    }
});

keepAliveJob.start();
recurringJob.start();

module.exports = { keepAliveJob, recurringJob };

// CRON JOB EXPLANATION:
// Cron jobs are scheduled tasks that run periodically at fixed intervals
// we want to send 1 GET request for every 14 minutes so that our api never gets inactive on Render.com

// How to define a "Schedule"?
// You define a schedule using a cron expression, which consists of 5 fields representing:

//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK
