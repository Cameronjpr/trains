import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { RETOOL_DB_CONNECTION_STRING } from '$env/static/private'

const pool = new Pool({
  connectionString: RETOOL_DB_CONNECTION_STRING,
})

export const db = drizzle(pool)
