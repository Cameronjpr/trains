<script lang="ts">
	import ConnectionPreview from '../../components/ConnectionPreview.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Map from 'ol/Map';
	import Feature from 'ol/Feature.js';
	import Point from 'ol/geom/Point.js';
	import Polygon from 'ol/geom/Polygon.js';
	import Overlay from 'ol/Overlay.js';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import XYZ from 'ol/source/XYZ';
	import { useGeographic } from 'ol/proj';
	import type { Connection, RichConnection } from '@db/schema';
	import Pin from '../../icons/Pin.svelte';
	import BottomDrawer from '../../components/BottomDrawer.svelte';
	import { journey, type Journey } from '../../lib/store';

	export let data: PageData;

	const { city, connections } = data;
	const { lat, lon } = city;
	let drawerOpen = false;
	const toggleDrawer = () => {
		drawerOpen = !drawerOpen;
	};
	let selectedConnection: RichConnection | undefined;

	onMount(() => {
		if (!lat || !lon) return;

		useGeographic();
		const map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new XYZ({
						url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
						attributions:
							'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
					})
				})
			],
			view: new View({
				center: [lon, lat],
				zoom: 4
			}),
			controls: [],
			interactions: []
		});

		const feature = new Feature({
			geometry: new Polygon([
				[
					[0, 0],
					[0, 1],
					[1, 1],
					[1, 0],
					[0, 0]
				]
			]),
			labelPoint: new Point([0, 0]),
			name: 'My Polygon'
		});

		// Add pin for origin
		const mapButton = new Overlay({
			element: document.getElementById('origin-pin')!
		});
		mapButton.setPosition([lon, lat]);
		map.addOverlay(mapButton);

		// Add pins for each connection
		connections.forEach((connection: RichConnection) => {
			const { lat, lon } = connection;

			console.log(connection);
			const mapButton = new Overlay({
				element: document.getElementById('con-' + connection.id)!
			});
			mapButton.setPosition([lon, lat]);
			map.addOverlay(mapButton);
		});
	});

	function handlePinSelect(connectionId: number) {
		selectedConnection = connections.find((c: Connection) => c.id === connectionId);
		drawerOpen = true;
	}

	function addStop(cityId: number) {
		console.log('add stop', cityId);
		journey.update((journey: Journey) => {
			return {
				...journey,
				stops: [...journey.stops, selectedConnection!]
			};
		});

		drawerOpen = false;
	}
</script>

<h1 class="hero">{city.name}</h1>
<div id="map" />

<div id="origin-pin" class="pin">
	<Pin />
	<span class="pin-label">{city.name}</span>
</div>

{#each connections as connection}
	<button
		class="pin map-connection"
		id="con-{connection.id}"
		on:mouseover={() => {
			console.log('mouseover');
		}}
		on:focus={() => {
			console.log('focus');
		}}
		on:click={() => handlePinSelect(connection.id)}
		><Pin /><span class="pin-label">{connection.destinationName}</span></button
	>
{/each}

<h2>Practical information</h2>

{#if !!selectedConnection}
	<BottomDrawer isOpen={drawerOpen} {toggleDrawer}>
		<strong>Selected connection: {selectedConnection?.destinationName}</strong>
		<button on:click={() => addStop(selectedConnection.destination)}>Add stop</button>
	</BottomDrawer>
{/if}

<style>
	#map {
		height: 400px;
		width: 100%;
		overflow: hidden;
		border: 2px solid var(--color-primary);
		margin-block: 1em;
	}

	:global(.hero) {
		margin-block: 0.5em;
		font-size: 3em;
		text-decoration: underline;
		text-decoration-color: var(--color-primary);
	}

	:global(.map-connection) {
		position: relative;
		border-radius: 0;
		background: transparent;
		box-shadow: none;
		border: none;
	}

	:global(.pin) {
		position: relative;
		padding: 0.25em;
		stroke: rgba(255, 255, 255, 0.92);
		transform: translate(-50%, -90%);
		text-align: center;
		display: flex;
		cursor: pointer;
		justify-content: center;
		transform-origin: center;
		align-items: center;
		border-radius: 100%;
	}

	:global(#origin-pin) {
		stroke: rgba(237, 138, 33, 0.92);
	}

	:global(.pin-label) {
		position: absolute;
		top: 90%;
		left: 50%;
		transform: translate(-50%, 0);
		font-size: 0.75em;
		background: white;
		padding-inline: 4px;
		padding-block: 1px;
		border-radius: 0.25em;
	}
</style>
