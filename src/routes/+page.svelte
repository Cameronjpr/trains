<script lang="ts">
  import type { PageData } from './$types'
  import type { City, RichConnection } from '@db/schema'
  import ConnectionPreview from '../components/ConnectionPreview.svelte'

  export let data: PageData
  const { cities } = data

  let originName = 'London'
  let availableConnections = getConnections('London')
  let originSearch = ''

  async function getConnections(originName: string) {
    const originId = cities.find((city: City) => city.name === originName).id

    const response = await fetch(`/api/connections/${originId}`)
    const data = await response.json()

    return data as Array<RichConnection>
  }

  console.log('availableConnections', availableConnections)
</script>

<h1>EuroTrains</h1>

<label>
  Search for your starting city...
  <input type="text" bind:value={originSearch} />
</label>

<section id="origin-selection-row">
  {#each cities as city}
    {#if city.name.toLowerCase().includes(originSearch.toLowerCase())}
      <button
        on:click={() => {
          originName = city.name
          availableConnections = getConnections(city.name)
        }}>{city.name}</button
      >
    {/if}
  {/each}
</section>

{#key originName}
  <section>
    {#await availableConnections}
      <p>Fetching connections from {originName}...</p>
    {:then connections}
      <p>From {originName}, you can travel to:</p>
      <ul>
        {#each connections as connection}
          <ConnectionPreview {connection} />
        {/each}
      </ul>
    {:catch error}
      <p>Something went wrong: {error.message}</p>
    {/await}
  </section>
{/key}

<style>
  ul {
    list-style: none;
    padding: 0;
    padding-block: 1em;
  }

  section {
    margin-bottom: 2em;
  }

  #origin-selection-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25em;
    padding-top: 1em;
  }
</style>
