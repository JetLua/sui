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
  <path d="M512 978.4c-14.4 0-26.4-5.6-36-16l-129.6-129.6C251.2 738.4 156 643.2 61.6 548c-16-16-20.8-38.4-10.4-58.4 2.4-4.8 6.4-9.6 10.4-13.6C199.2 337.6 337.6 199.2 476 60.8c20.8-20.8 51.2-20.8 71.2 0l415.2 415.2c20.8 20.8 20.8 50.4 0 71.2l-415.2 415.2c-9.6 10.4-21.6 16-35.2 16z"/>
</svg>
