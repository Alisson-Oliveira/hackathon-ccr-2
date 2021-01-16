module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    process.env.ENTITIES_TYPE
  ],
  "migrations": [
    process.env.MIGRATIONS_TYPE
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations/"
  }
};