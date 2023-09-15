const express = require('express');

const app = express();
const PORT = 5005;

app.get('/api', (req, res) => {
    res.send('Welcome to the API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://mayssaeahmadie:EOxoDuOkrREyFAIk@cluster0.tp4wj5n.mongodb.net/?retryWrites=true&w=majority/'; // Replace with your MongoDB connection string

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

app.post('/api/users', async (req, res) => {
    try {
        const db = client.db('Testing'); // Replace with your database name
        const collection = db.collection('Users');

        const newUser = req.body;
        const result = await collection.insertOne(newUser);

        res.json(result.ops[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

async function addUserToDatabase() {
    try {
        const db = client.db('Testing'); // Use your database name
        const collection = db.collection('Users'); // Use your collection name

        const user = { name: 'Mayssae', age: 22 };
        const result = await collection.insertOne(user);

        console.log('User added:', result.ops);
    } catch (error) {
        console.error('Error adding user:', error);
    } finally {
        // Close the connection after adding the user
        await client.close();
    }
}
// Call the function to connect
connectToDatabase();

addUserToDatabase();
