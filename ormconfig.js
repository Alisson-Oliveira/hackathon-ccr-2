module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "host": "localhost",
  "port": 3306,
  "username": "alsrokn",
  "password": "0000",
  "database": "hackathon-ccr-2",
  "entities": [
    process.env.ENTITIES_TYPE
  ],
  "migrations": [
    process.env.MIGRATIONS_TYPE
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}