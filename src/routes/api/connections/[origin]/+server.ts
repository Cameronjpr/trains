import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '@db/db';
import { cities, connections } from '@db/schema';
import { eq } from 'drizzle-orm/expressions';

export const GET = (async ({ params }) => {
	console.log(Number(params.origin));

	const res = await db
		.select({
			id: connections.id,
			origin: connections.origin,
			destination: connections.destination,
			destinationName: cities.name,
			lat: cities.lat,
			lon: cities.lon
		})
		.from(connections)
		.innerJoin(cities, eq(connections.destination, cities.id))
		.where(eq(connections.origin, Number(params.origin)));

	console.log(res);
	if (!res.length) {
		throw error(404, 'No connections found');
	}

	return new Response(JSON.stringify(res));
}) satisfies RequestHandler;
