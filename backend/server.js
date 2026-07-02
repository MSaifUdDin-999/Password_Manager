const express = require('express')
const { MongoClient } = require('mongodb')
const bodyparser = require('body-parser')
const cors = require('cors')

// Connection URL
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url)

// Database Name
const dbName = process.env.MONGO_DB_NAME || 'passop';

const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(cors());

client.connect();

// Get all the passwords
app.get('/api/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save a password
app.post('/api/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const findResult = await collection.insertOne(password);
    res.json({ success: true, result: findResult })
})

// Delete a password by id
app.delete('/api/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const findResult = await collection.deleteOne(password);
    res.json({ success: true, result: findResult })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

module.exports = app;

// Run in server "node --watch server.js"

// ChatGPT link : https://chatgpt.com/s/t_69f5e5a00c8c8191af1f78319f05140e