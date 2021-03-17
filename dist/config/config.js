"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const local = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT)
};
const remote = {
    connectionString: process.env.DATABASE_URL
};
const pool = new pg_1.Pool(process.env.NODE_ENV === 'development' ? local : remote);
exports.default = pool;
