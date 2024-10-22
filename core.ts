import chroma from 'chroma-js'
import type {Action} from 'svelte/action'


export const colors = {
  primary: '#8b5cf6',
  disabled: '#e2e8f0',
  shadowAlpha: 1
}

export const ripple: Action = (e: HTMLElement) => {

}

export function darken(raw: string, v = .5) {
  return chroma(raw).darken(v).hex()
}

export function alpha(raw: string, alpha = .1) {
  return chroma(raw).alpha(alpha).brighten().hex()
}

/** style object to string */
export function toString(o: CSSStyleDeclaration): string
export function toString(o: any) {
  return Object.entries(o).map(([k, v]) => `${k}:${v}`).join(';')
}
