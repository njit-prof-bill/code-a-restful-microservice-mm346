const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
// my additions ---------------------------------------------------

// a. POST
let users = [];
let userId = 1; 
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }
    const newUser = {
        id: userId++,
        name: name,
        email: email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// b. GET
app.get('/users/:id', (req, res) => {
    const { id } = req.params; 
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    res.status(200).json(user);
});

//c. PUT
app.put('/users/:id', (req, res) => {
    const { id } = req.params; // Extract the id from the URL parameters
    const { name, email } = req.body;

    // Validate that both name and email are provided
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    // Find the user with the matching id
    const user = users.find(u => u.id === parseInt(id));

    // If user is not found, return a 404 error
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    // Update the user's information
    user.name = name;
    user.email = email;

    // Respond with the updated user details
    res.status(200).json(user);
});

//d. delete
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

// done my additions ----------------------------------------------------
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing