import { join } from 'path'
import Database from 'better-sqlite3'
import { app } from 'electron'

const dbPath = join(app.getPath('userData'), 'database.sqlite')
const db = Database(dbPath)
console.log(dbPath)

export const initializeDatabase = () => {
  db.exec('PRAGMA foreign_keys = ON')

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      password TEXT,
      range TEXT,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS measurements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      model TEXT NOT NULL,
      user_id TEXT NOT NULL,
      total_measurements INTEGER DEFAULT 0,
      median REAL DEFAULT 0,
      range REAL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `)
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS measurement_values (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      measurement_id INTEGER NOT NULL,
      position_index INTEGER NOT NULL,
      value REAL NOT NULL,
      FOREIGN KEY (measurement_id) REFERENCES measurements(id)
    );
  `)
  
  
  db.exec(`
    INSERT INTO users (id, name, password, range) 
    SELECT 1, 'admin', 'admin', 'admin'
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE id = 1)
  `)
}

export const queryDatabase = (query, params) => {
  const stmt = db.prepare(query)
  return stmt.all(params)
}

export const insertIntoDatabase = (query, params) => {
  const stmt = db.prepare(query)
  const result = stmt.run(params)
  return { id: result.lastInsertRowid }
}

export const runQuery = (query, params) => {
  const stmt = db.prepare(query)
  return stmt.run(params)
}