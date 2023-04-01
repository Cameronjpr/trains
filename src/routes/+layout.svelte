<script lang="ts">
  import { get } from 'svelte/store'
  import { journey, type Journey } from '../lib/store'

  let journeyStops = get(journey).stops.length
  const unsubscribe = journey.subscribe((value) => {
    journeyStops = value.stops.length
  })
</script>

<nav>
  <a href="/">Home</a>
  <span>Journey has {journeyStops} stops</span>
</nav>

<main>
  <slot />
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 1em;
  }

  nav {
    background-color: blanchedalmond;
    padding: 1em;
    display: flex;
    justify-content: space-between;
  }

  a {
    color: #333;
    text-decoration: none;
  }
</style>
