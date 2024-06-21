<script lang="ts">
  import clsx from 'clsx'
  import {onMount, tick, type Snippet} from 'svelte'
  import {cubicInOut} from 'svelte/easing'
  import type {HTMLAttributes} from 'svelte/elements'
  import type {EasingFunction, TransitionConfig} from 'svelte/transition'
  import {contains, debounce} from './util'

  import Ae from './Ae.svelte'

  interface Props extends HTMLAttributes<HTMLElement> {
    children: Snippet
    class?: string
    visible?: boolean
    auto?: boolean
    anchor?: ['left' | 'right' | 'auto', 'top' | 'bottom' | 'auto']
    onClose?: () => void
    content: Snippet
    trigger?: 'click' | 'hover' | 'manual'
  }

  let {
    visible = $bindable(false),
    children,
    auto,
    anchor = ['auto', 'auto'],
    trigger = 'click',
    onClose,
    content,
    ...props
  }: Props = $props()

  const st = $state({
    root: null as unknown as HTMLElement,
  })

  let target = $state<HTMLElement>()!

  let position = $state({left: 'auto', right: 'auto', top: 'auto', bottom: 'auto'} satisfies Record<string, string>)

  function onClick() {

  }

  function show(node: HTMLElement, params?: {duration?: number, easing?: EasingFunction}): TransitionConfig {
    return {
      duration: params?.duration ?? 200,
      easing: params?.easing ?? cubicInOut,
      css: t => `transform-origin: ${anchor.join(' ')}; transform: scale(${t}, ${t});`
    }
  }


  const calc = function() {
    if (!target) return
    // 计算位置
    const {innerHeight: h, innerWidth: w} = window
    const {bottom, left, right, top} = target.firstElementChild!.getBoundingClientRect()

    position.top = 'auto'
    position.left = 'auto'
    position.right = 'auto'
    position.bottom = 'auto'

    // 偏左
    if ((left + right) / 2 <= w / 2) {
      position.left = `${left}px`
      if (anchor[0] === 'auto') anchor[0] = 'left'
    } else {
      position.right = `${w - right}px`
      if (anchor[0] === 'auto') anchor[0] = 'right'
    }

    // 偏上
    if ((top + bottom) / 2 <= h / 2) {
      position.top = `${bottom + 10}px`
      if (anchor[1] === 'auto') anchor[1] = 'top'
    } else {
      position.bottom = `${h - top + 10}px`
      if (anchor[1] === 'auto') anchor[1] = 'bottom'
    }
  }

  onMount(() => {
    calc()
  })

  const onResize = debounce(calc)

  function handle(e: Event) {
    if (e instanceof MouseEvent) {
      switch (e.type) {
        case 'mouseenter': {
          if (e.currentTarget === target && trigger === 'hover') visible = true
          break
        }

        case 'pointerdown': {
          if ((e.target as HTMLElement).dataset.id === 'shadow') visible = false
          break
        }

        default: {
          console.log(e.type)
        }
      }
    }
  }
</script>

<svelte:window on:resize={onResize}/>

<Ae class="contents"
  onclick={handle}
  bind:root={target}
  onmouseenter={handle}>
  {@render children()}
</Ae>

{#if visible}
<div class="fixed top-0 left-0 w-full h-full z-[99999] bg-transparent"
  onpointerdown={handle} tabindex="-1" data-id="shadow">
  <section class={clsx('root fixed bg-white rounded-md shadow-popover z-10 min-w-[var(--w)] width-[fit-content]', props.class)}
    style:top={position.top}
    style:left={position.left}
    style:right={position.right}
    style:bottom={position.bottom}
    style:transform-origin={anchor.join(' ')}
    transition:show
    bind:this={st.root}>
    {@render content()}
  </section>
</div>
{/if}
