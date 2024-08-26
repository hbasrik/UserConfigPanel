const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./firebase');
const cors = require('cors');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(bodyParser.json());

// Middleware to verify Firebase ID token
app.use(async (req, res, next) => {
    const idToken = req.headers.authorization;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).send('Unauthorized');
    }
});

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Endpoint to fetch configurations
app.get('/configurations', async (req, res) => {
    try {
        const configurations = [];
        const snapshot = await admin.firestore().collection('configurations').get();
        snapshot.forEach(doc => {
            configurations.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(configurations);
    } catch (error) {
        console.error('Error fetching configurations:', error);
        res.status(500).send('Error fetching configurations: ' + error.message);
    }
});

// Endpoint to add a new configuration
app.post('/configurations', async (req, res) => {
  const { key, value, description } = req.body;

  try {
    // Create a unique ID for the new configuration
    const id = uuidv4();

    // Save the new configuration to the database (assuming Firestore is used)
    const db = admin.firestore();
    const configRef = db.collection('configurations').doc(id);
    
    await configRef.set({
      key,
      value,
      description,
      createDate: new Date().toISOString(), // Save the creation date
    });

    res.status(201).send({ id });
  } catch (error) {
    console.error('Error adding configuration:', error);
    res.status(500).send(`Error adding configuration: ${error.message}`);
  }
});

// Endpoint to update an existing configuration
app.put('/configurations/:id', async (req, res) => {
    try {
        const configId = req.params.id;
        await admin.firestore().collection('configurations').doc(configId).update(req.body);
        res.status(200).send('Configuration updated successfully');
    } catch (error) {
        console.error('Error updating configuration:', error);
        res.status(500).send('Error updating configuration: ' + error.message);
    }
});

// Endpoint to delete a configuration
app.delete('/configurations/:id', async (req, res) => {
    try {
        const configId = req.params.id;
        await admin.firestore().collection('configurations').doc(configId).delete();
        res.status(200).send('Configuration deleted successfully');
    } catch (error) {
        console.error('Error deleting configuration:', error);
        res.status(500).send('Error deleting configuration: ' + error.message);
    }
});

// Endpoint for login (already present)
app.post('/login', async (req, res) => {
    const { token } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        console.log('Authenticated user with UID:', uid);

        res.status(200).send(`User logged in successfully: ${uid}`);
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(500).send(`Error logging in user: ${error.message}`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
