import chroma from 'chroma-js'
import type {Action} from 'svelte/action'


export const colors = {
  primary: '#8b5cf6'
}

export const ripple: Action = (e: HTMLElement) => {

  return {
    destroy() {

    }
  }
}

export function darken(raw: string, v = .5) {
  return chroma(raw).darken(v).hex()
}

export function alpha(raw: string, alpha = .1) {
  return chroma(raw).alpha(alpha).brighten().hex()

}
