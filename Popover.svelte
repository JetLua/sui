<script lang="ts">
  import clsx from 'clsx'
  import {onMount, type Snippet} from 'svelte'
  import {cubicInOut} from 'svelte/easing'
  import type {EasingFunction, TransitionConfig} from 'svelte/transition'
  import {contains, debounce} from './util'

  interface Props {
    children: Snippet
    class?: string
    target: HTMLElement
    visible?: boolean
    auto?: boolean
    anchor?: ['left' | 'right' | 'auto', 'top' | 'bottom' | 'auto']
    onClose?: () => void
  }

  let {
    class: _class,
    target,
    visible = $bindable(false),
    children,
    auto,
    anchor = $bindable(['auto', 'auto']),
    onClose
  }: Props = $props()

  let root = $state<HTMLElement>()
  let position = $state({left: 'auto', right: 'auto', top: 'auto', bottom: 'auto'} satisfies Record<string, string>)

  function onClick() {
    visible = !visible
    if (!visible) return
    calc()
  }

  const calc = function() {
    if (!target) return
    // 计算位置
    const {innerHeight: h, innerWidth: w} = window
    const {bottom, left, right, top} = target.getBoundingClientRect()
    const tw = right - left

    position.top = 'auto'
    position.left = 'auto'
    position.right = 'auto'
    position.bottom = 'auto'

    // 偏左
    if ((left + right) / 2 <= w / 2) {
      position.left = `${left}px`
      if (anchor[0] === 'auto') anchor[0] = `left`
    } else {
      position.right = `${w - right}px`
      if (anchor[0] === 'auto') anchor[0] = `right`
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

  function onGlobalClick(e: MouseEvent) {
    const _target = e.target as HTMLElement
    if (!_target) return

    const inner = root && (contains(root, _target) || contains(target, _target))

    if (!auto) {
      if (!inner) onClose?.()
      return
    }

    // 点击是 target
    if (contains(target, _target)) return onClick()

    if (inner) return

    // popover 外部点击则隐藏
    visible = false
  }

  const onResize = debounce(calc)

  onMount(calc)
</script>

<svelte:window on:click={onGlobalClick} on:resize={onResize}/>

<section class={clsx('root fixed bg-white rounded-md shadow-popover z-10 w-[var(--w,inherit)] overflow-auto', _class, visible ? 'block' : 'hidden')}
  style:top={position.top}
  style:left={position.left}
  style:right={position.right}
  style:bottom={position.bottom}
  style:transform-origin={anchor.join(' ')}
  bind:this={root}>
  {@render children()}
</section>

<style lang="scss">
  .root {
    animation: x .3s ease forwards;

    @keyframes x {
      from {
        transform: scale(0);
      }

      to {
        transform: scale(1);
      }
    }
  }
</style>
