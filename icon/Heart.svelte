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
  viewBox="0 0 1024 1024"
  stroke-width="1"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={_class} {...props}>
  <path d="M520 912c4-8 8.8-16.8 13.6-25.6 5.6-8.8 11.2-16.8 16.8-24.8 51.2-65.6 112.8-120.8 182.4-167.2 36-23.2 72-45.6 107.2-69.6 32-21.6 61.6-45.6 85.6-76 31.2-38.4 49.6-82.4 52.8-132.8 2.4-31.2 0-62.4-6.4-93.6-8.8-44.8-24.8-87.2-53.6-122.4-52-64.8-119.2-92.8-200.8-81.6-47.2 6.4-87.2 27.2-122.4 59.2-32.8 29.6-56.8 64.8-74.4 104.8l-2.4 4.8c-4.8-10.4-9.6-20-14.4-29.6-24.8-45.6-56-84.8-100.8-111.2-75.2-44.8-152-46.4-227.2 0.8-45.6 28.8-75.2 72-94.4 121.6-13.6 36-20 73.6-21.6 112-3.2 58.4 9.6 112 44 160 20.8 29.6 47.2 53.6 75.2 75.2 33.6 25.6 70.4 47.2 106.4 68.8 43.2 25.6 85.6 53.6 122.4 88 44.8 40.8 86.4 84 112 139.2z"/>
</svg>
