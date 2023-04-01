import type { RichConnection } from '@db/schema'
import { setContext } from 'svelte'
import { writable } from 'svelte/store'

export type Journey = {
  stops: Array<RichConnection>
}

export const journey = writable<Journey>({ stops: [] })
