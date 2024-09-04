<script lang="ts">
  import clsx from 'clsx'
import type {SVGAttributes} from 'svelte/elements'

interface Props extends SVGAttributes<SVGSVGElement> {

}

let {class: _class, ...props}: Props = $props()

_class = clsx('stroke-[var(--stroke,#999)] fill-[var(--fill,transparent)]', _class)
</script>

<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={_class} {...props}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
</svg>
