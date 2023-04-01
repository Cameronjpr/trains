<script lang="ts">
  import type { RichConnection } from '@db/schema'
  import { journey, type Journey } from '../lib/store'

  export let connection: RichConnection

  function addStop(cityId: number) {
    console.log('add stop', cityId)
    journey.update((journey: Journey) => {
      return {
        ...journey,
        stops: [...journey.stops, connection],
      }
    })
  }
</script>

<li>
  <h3>{connection.destinationName}</h3>
  <!-- <a
    href="https://www.google.com/search?q=night+trains+{originName}+to+{connection}"
    target="_blank"
  >
    search trains to {connection.destinationName}
  </a> -->
  <button on:click={() => addStop(connection.destination)}>Add stop</button>
</li>

<style>
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5em;
    padding-block: 0.75em;
    border-bottom: 2px solid #eee;
  }
</style>
