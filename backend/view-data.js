const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Connect to the database
const db = new sqlite3.Database('./database.sqlite', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Query all users
db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
        throw err;
    }
    
    // Write all database rows to a clean, highly readable JSON file
    fs.writeFileSync('users-data.json', JSON.stringify(rows, null, 2));
    console.log('Success! Your database has been converted to a readable users-data.json file.');
});

db.close();
