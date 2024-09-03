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
  stroke-width="1"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={_class} {...props}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1" />
</svg>
