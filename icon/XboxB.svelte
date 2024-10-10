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
  <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
  <path d="M13 12a2 2 0 1 1 0 4h-3v-4" />
  <path d="M13 12h-3" />
  <path d="M13 12a2 2 0 1 0 0 -4h-3v4" />
</svg>
