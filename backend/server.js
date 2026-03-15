const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Handle persistent paths
const dataDir = process.env.DATA_DIR || '.';
const dbPath = path.join(dataDir, 'database.sqlite');
const jsonPath = path.join(dataDir, 'users-data.json');

// Initialize SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            phone TEXT,
            password TEXT,
            role TEXT
        )`);
    }
});

const updateJsonSnapshot = () => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (!err) {
            fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 2));
        }
    });
};

app.post('/api/register', async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const sql = `INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [name, email, phone, hashedPassword, role || 'user'], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({ message: 'Email already exists' });
                }
                return res.status(500).json({ message: 'Database error' });
            }
            updateJsonSnapshot();
            res.status(201).json({ message: 'Registration Successful', userId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/login', (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const sql = `SELECT * FROM users WHERE email = ? AND role = ?`;
    db.get(sql, [email, role || 'user'], async (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid Email or Role' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        res.json({ message: 'Login successful!', user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
    });
});

// Serve frontend static files
const buildPath = path.join(__dirname, '../build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
