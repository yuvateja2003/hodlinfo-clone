const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database or open existing one
const db = new sqlite3.Database(path.join(__dirname, 'crypto_data.sqlite'), (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Connected to the SQLite database.');
        createTable();
    }
});

// Create table if it doesn't exist
function createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS crypto_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        last REAL,
        buy REAL,
        sell REAL,
        volume REAL,
        base_unit TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating table', err);
        } else {
            console.log('Table created or already exists.');
        }
    });
}

// Function to insert data into the table
function insertData(data) {
    const stmt = db.prepare(`INSERT INTO crypto_data (name, last, buy, sell, volume, base_unit) 
                             VALUES (?, ?, ?, ?, ?, ?)`);

    data.forEach((item) => {
        stmt.run(item.name, item.last, item.buy, item.sell, item.volume, item.base_unit);
    });

    stmt.finalize();
    console.log('Data inserted successfully.');
}

// Function to get all data from the table
function getAllData(callback) {
    db.all('SELECT * FROM crypto_data', [], (err, rows) => {
        if (err) {
            console.error('Error fetching data', err);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

// Function to clear all data from the table
function clearData(callback) {
    db.run('DELETE FROM crypto_data', [], (err) => {
        if (err) {
            console.error('Error clearing data', err);
            callback(err);
        } else {
            console.log('All data cleared from the table.');
            callback(null);
        }
    });
}

module.exports = { db, insertData, getAllData, clearData };