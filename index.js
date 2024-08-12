import express from 'express'
import cors from 'cors'
// Get the client
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create the connection to database
const connection = await mysql.createConnection({
    host: process.env.DB_MYSQL_HOST,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_NAME,
});

const app = express()
app.use(cors())

app.get('/test', (req, res, next) => {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.get('/users', async (req, res, next) => {
    // A simple SELECT query
    try {
        const [ results ] = await connection.query('SELECT * FROM `users`;');

        res.json(results)
    } catch (err) {
        console.log(err);
        es.status(500).json({ error: 'An error occurred' });
    }
})

app.listen(process.env.APP_PORT, () => {
    console.log(`CORS-enabled web server listening on port ${process.env.APP_PORT}`)
})