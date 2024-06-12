<script lang="ts" generics="T">
  import {onMount, type Snippet} from 'svelte'
  import type {HTMLAttributes} from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    item: Snippet<[T]>
    items: T[]
  }

  const {children, items, ...props}: Props = $props()
  const st = $state({
    mounted: false,
  })

  const vp = $state({
    h: 0,
    st: 0,
    end: 0,
    start: 0,
  })

  const total = $derived(items.length)

  onMount(() => {
    st.mounted = true
  })

  $inspect(vp.h)

  function onScroll(e: UIEvent) {
    const target = e.currentTarget as HTMLElement
    vp.st = target.scrollTop
  }
</script>

<div class={props.class} bind:offsetHeight={vp.h} onscroll={onScroll}>
  <div>
    {#each items as item}
      <div>{@render props.item(item)}</div>
    {/each}
  </div>
</div>
