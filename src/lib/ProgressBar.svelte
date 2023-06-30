<script lang="ts">
  import type {SVGAttributes} from 'svelte/elements'

  export let color = "#03a9f4"
  export let progress = 0
  export let linecap = 'round' as SVGAttributes<HTMLElement>['stroke-linecap']
  export let size = 20
  export let strokeWidth = 4

  let w = 200

  $: r = (w - strokeWidth) / 2
  $: l = Math.PI * 2 * r
</script>


<svg viewBox={`0 0 ${w} ${w}`} width={size} height={size}>
  {#if progress > 0}
    <circle
      cx={w / 2}
      cy={w / 2}
      r={r}
      stroke={color}
      stroke-width={strokeWidth}
      fill="transparent"
      stroke-dasharray={`${l * progress / 100} ${l + 1}`}
      stroke-linecap={linecap}
      class="circle"
    />
  {/if}
</svg>

<style lang="scss">
  .circle {
    transition: stroke-dasharray .3s ease;
  }
</style>
