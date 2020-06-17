const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./src/database/database.db')

//Criar tabela
db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            number TEXT,
            complement TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );    
    `)
})

module.exports = db