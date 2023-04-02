<script lang="ts">
  import { journey, type Journey } from '../../lib/store';
  import { get } from 'svelte/store';

  let journeyStops = get(journey).stops;
</script>

<h1>My journey</h1>

{#each journeyStops as stop}
  <a href="/{stop.destination}">{stop.destinationName}</a>
{/each}
