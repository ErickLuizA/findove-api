import { Pool, PoolConfig } from 'pg'

const local: PoolConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
}

const remote: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}

const pool = new Pool(process.env.NODE_ENV === 'development' ? local : remote)

export default pool
