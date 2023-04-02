<script lang="ts">
	import type { PageData } from './$types';
	import type { City, RichConnection } from '@db/schema';
	import ConnectionPreview from '../components/ConnectionPreview.svelte';

	export let data: PageData;
	const { cities } = data;

	let originName = 'London';

	let originSearch = '';
</script>

<h1 class="hero">EuroTrains</h1>

<label>
	Search for your starting city...
	<input type="text" bind:value={originSearch} />
</label>

<section id="origin-selection-row">
	{#each cities as city}
		{#if city?.name.toLowerCase().includes(originSearch.toLowerCase())}
			<a href="/{city.id}">
				<article>
					<h2>{city.name}</h2>
				</article>
			</a>
		{/if}
	{/each}
</section>

<style>
	section {
		margin-bottom: 2em;
	}

	#origin-selection-row {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 1em;
		padding-top: 1em;
	}

	article {
		padding: 1em;
		display: flex;
		flex-direction: column;
		border-radius: 0.75em;
	}
</style>
