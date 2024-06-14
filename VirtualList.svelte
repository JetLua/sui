<script lang="ts" generics="T">
  import {onMount, tick, type Snippet} from 'svelte'
  import type {HTMLAttributes} from 'svelte/elements'
    import {dispatch} from './util'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    item: Snippet<[T, number]>
    items: T[]
    selected?: number
    onSelect?: (item: T, index: number) => void
    filter?: (item: T) => boolean
  }

  let {children, selected = $bindable(-1), ...props}: Props = $props()

  const st = $state({
    mounted: false,
  })

  const items = $derived(props.filter ? props.items.filter(props.filter) : props.items)

  const vp = $state({
    el: null as unknown as HTMLElement,
    h: 0,
    end: 0,
    top: 0,
    start: 0,
    bottom: 0,
    itemHeight: 0,
    content: null as unknown as HTMLElement
  })

  const visible = $derived.by(() => {
    return items.slice(vp.start, vp.end).map((item, i) => {
      return {index: i + vp.start, data: item}
    })
  })

  $effect(() => {
    if (st.mounted) refresh(items, vp.h)
  })

  onMount(() => {
    st.mounted = true
  })

  const hMap = [] as number[]

  let rows: HTMLCollection
  let ah = 0

  async function refresh(items: Props['items'], vh: number) {
    const {scrollTop} = vp.el

    await tick()

    let ch = vp.top - scrollTop
    let i = vp.start

    while (ch < vh && i < items.length) {
      let row = rows[i - vp.start]

      if (!row) {
        vp.end = i + 1
        await tick()
        row = rows[i - vp.start]
      }

      const row_height = hMap[i] = vp.itemHeight || (row as HTMLElement).offsetHeight
      ch += row_height
      i += 1
    }

    vp.end = i

    const remaining = items.length - vp.end
    ah = (vp.top + ch) / vp.end

    vp.bottom = remaining * ah
    hMap.length = items.length
  }

  async function onScroll() {
		const {scrollTop} = vp.el

		const old_start = vp.start

		for (let v = 0; v < rows.length; v += 1) {
			hMap[vp.start + v] = vp.itemHeight || (rows[v] as HTMLElement).offsetHeight
		}

		let i = 0;
		let y = 0;

		while (i < items.length) {
			const rh = hMap[i] || ah

			if (y + rh > scrollTop) {
				vp.start = i
				vp.top = y
				break
			}

			y += rh
			i += 1
		}

		while (i < items.length) {
			y += hMap[i] || ah
			i += 1

			if (y > scrollTop + vp.h) break
		}

		vp.end = i

		const remaining = items.length - vp.end
		ah = y / vp.end

		while (i < items.length) hMap[i++] = ah
		vp.bottom = remaining * ah

		if (vp.start < old_start) {
			await tick();

			let eh = 0;
			let ah = 0;

			for (let i = vp.start; i < old_start; i +=1) {
				if (rows[i - vp.start]) {
					eh += hMap[i]
					ah += vp.itemHeight || (rows[i - vp.start] as HTMLElement).offsetHeight
				}
			}

			const d = ah - eh
			vp.el.scrollTo(0, scrollTop + d);
		}
  }

  onMount(() => {
    rows = vp.content.children
    st.mounted = true
  })

  function onSelect(data: T, index: number) {
    props.onSelect?.(data, index)
    selected = index
  }
</script>

<div class={props.class} bind:offsetHeight={vp.h} onscroll={onScroll} bind:this={vp.el}>
  <div bind:this={vp.content} style:padding-top={`${vp.top}px`} style:padding-bottom={`${vp.bottom}px`}>
    {#each visible as {data, index} (index)}
      <div
        onclick={() => onSelect(data, index)}
        onkeydown={dispatch}
        role="button"
        class="as-button"
        tabindex="0">{@render props.item(data, index)}</div>
    {/each}
  </div>
</div>
