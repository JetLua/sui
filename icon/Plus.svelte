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
  <path stroke="none" d="M0 0h24v24H0z"/>
  <path d="M12 5l0 14"/>
  <path d="M5 12l14 0"/>
</svg>
