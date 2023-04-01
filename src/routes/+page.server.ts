import type { PageLoad } from './$types'
import { db } from '@db/db'
import { cities } from '@db/schema'

export const load = (async ({ params }) => {
  const fetchedCities = await db.select().from(cities)

  return {
    cities: fetchedCities,
  }
}) satisfies PageLoad
