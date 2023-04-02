<script lang="ts">
	import ConnectionPreview from '../../components/ConnectionPreview.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import XYZ from 'ol/source/XYZ';
	import { useGeographic } from 'ol/proj';

	export let data: PageData;

	const { city, connections } = data;

	const { lat, lon } = city;

	onMount(() => {
		if (!lat || !lon) return;

		useGeographic();
		new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new XYZ({
						url: 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
						attributions:
							'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
					})
				})
			],
			view: new View({
				center: [lon, lat],
				zoom: 6
			}),
			controls: [],
			interactions: []
		});
	});
</script>

<h1 class="hero">{city.name}</h1>

<div id="map" />

<h2>Travel from {city.name} to:</h2>

{#each connections as connection}
	<ConnectionPreview {connection} />
{/each}

<style>
	#map {
		height: 400px;
		width: 100%;
		overflow: hidden;
		border: 2px solid #000000;
		margin-block: 1em;
	}

	:global(.hero) {
		margin-block: 0.5em;
		font-size: 3em;
		text-decoration: underline;
		text-decoration-color: dodgerblue;
	}
</style>
