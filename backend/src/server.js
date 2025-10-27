const express = require('express');
const cors = require('cors');
const env = require('./config/env.js');
const { db, schema } = require('./config/db.js');
const job = require('./config/cron.js');

const app = express();
app.use(express.json());
const PORT = env.PORT || 7000;


if (env.NODE_ENV === 'production') job.start();


app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true });
});


app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
