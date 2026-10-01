const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const PostgressPassword = process.env.password
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "techconnect",
    password: PostgressPassword,
    port: 5432
});
module.exports = pool;

