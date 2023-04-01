import type { InferModel } from 'drizzle-orm'
import { pgTable, text, serial, timestamp, integer } from 'drizzle-orm/pg-core'

export const cities = pgTable('cities', {
  id: serial('id'),
  name: text('name'),
  country: text('country'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const connections = pgTable('connections', {
  id: serial('id'),
  origin: integer('origin')
    .references(() => cities.id)
    .notNull(),
  destination: integer('destination')
    .references(() => cities.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type City = InferModel<typeof cities>
export type Connection = InferModel<typeof connections>
export type RichConnection = Connection & { destinationName: string }
