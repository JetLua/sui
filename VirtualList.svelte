<script lang="ts" generics="T">
  import {onMount, tick, type Snippet} from 'svelte'
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
    el: null as unknown as HTMLElement,
    h: 0,
    st: 0,
    end: 0,
    top: 0,
    start: 0,
    bottom: 0,
    itemHeight: 0,
    content: null as unknown as HTMLElement
  })

  const total = $derived(items.length)

  const visible = $derived.by(() => {
    return items.slice(vp.start, vp.end).map((item, i) => {
      return {index: i + vp.start, data: item}
    })
  })

  $effect(() => {
    if (st.mounted) refresh()
  })

  onMount(() => {
    st.mounted = true
  })

  const hMap = [] as number[]

  let rows: HTMLCollection
  let ah = 0

  async function refresh() {
    const {scrollTop} = vp.el

    await tick()

    let ch = vp.top - scrollTop
    let i = vp.start

    while (ch < vp.h && i < items.length) {
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

  $inspect(vp.top, vp.bottom)
</script>

<div class={props.class} bind:offsetHeight={vp.h} onscroll={onScroll} bind:this={vp.el}>
  <div bind:this={vp.content} style:padding-top={`${vp.top}px`} style:padding-bottom={`${vp.bottom}px`}>
    {#each visible as item (item.index)}
      <div>{@render props.item(item.data)}</div>
    {/each}
  </div>
</div>
