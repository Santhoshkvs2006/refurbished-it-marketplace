const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    }
});

// Delete all users from the database
db.run("DELETE FROM users", function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Successfully deleted all rows from the users table.`);
    
    // Reset the auto-incrementing ID back to 1
    db.run("DELETE FROM sqlite_sequence WHERE name='users'", function(err) {
        if (err) {
             console.error("No sqlite_sequence table yet, or error resetting ID.", err);
        } else {
             console.log("User IDs have been reset to start at 1.");
             
             // Update the JSON snapshot file to be completely empty
             fs.writeFileSync('./users-data.json', '[]');
             console.log("users-data.json has been restored to an empty state.");
        }
    });
});

db.close();
