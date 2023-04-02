import { cities } from '@db/schema';
import type { PageServerLoad } from './$types';
import { db } from '@db/db';
import { eq } from 'drizzle-orm/expressions';

export const load = (async ({ params, fetch }) => {
	const connections = await fetch(`/api/connections/${params?.cityId}`);
	const connectionData = await connections.json();

	const city = await db
		.select()
		.from(cities)
		.where(eq(cities.id, Number(params.cityId)));

	return {
		city: city[0],
		connections: connectionData
	};
}) satisfies PageServerLoad;
