<script lang="ts">
  import type { PageData } from './$types'
  import type { City, Connection } from '@db/schema'
  export let data: PageData
  const { cities } = data

  let origin = 'London'
  let availableConnections = [] as Array<{
    id: number
    origin: number
    destination: number
    destinationName: string
  }>

  async function getConnections(originName: string) {
    const originId = cities.find((city: City) => city.name === originName).id

    const response = await fetch(`/api/connections/${originId}`)
    const data = await response.json()

    availableConnections = data
  }

  console.log('availableConnections', availableConnections)
</script>

<h1>Trains 🚂</h1>
<h2>Choose your starting location</h2>

{#each cities as city}
  <button
    on:click={() => {
      origin = city.name
      getConnections(city.name)
    }}>{city.name}</button
  >
{/each}

{#if origin}
  <section>
    <p>From {origin}, you can travel to:</p>
    <ul>
      {#each availableConnections as connection}
        <li>
          <h3>{connection.destinationName}</h3>
          <a
            href="https://www.google.com/search?q=night+trains+{origin}+to+{connection}"
            target="_blank"
          >
            Search {origin} to {connection.destinationName}
          </a>
        </li>
      {/each}
    </ul>
  </section>
{/if}

<style>
  ul {
    list-style: none;
    padding: 0;
    padding-block: 1em;
  }

  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5em;
    padding-block: 0.5em;
    border-bottom: 1px solid #ccc;
  }

  section {
    margin-top: 2em;
  }
</style>
