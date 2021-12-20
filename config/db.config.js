require('dotenv').config()
module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB,
    dialect: process.env.dialect,
    pool: {
        max: 10000,
        min: 0,
        acquire: 30000,
        idle: 10
    },
}
