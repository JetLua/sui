<script lang="ts">
  import {cubicInOut} from 'svelte/easing'
  import type {EasingFunction, TransitionConfig} from 'svelte/transition'
  import {contains, debounce, cls} from '@iro/util'

  let className: string | undefined = undefined
  let root: HTMLElement
  let target: HTMLElement
  let visible = false
  let origin = ['', ''] as [string, string]
  let position = {left: 'auto', right: 'auto', top: 'auto', bottom: 'auto'} satisfies Record<string, string>

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
      origin[0] = `${tw / 2}px`
    } else {
      position.right = `${w - right}px`
      origin[0] = `calc(100% - ${tw / 2}px)`
    }

    // 偏上
    if ((top + bottom) / 2 <= h / 2) {
      position.top = `${bottom + 10}px`
      origin[1] = 'top'
    } else {
      position.bottom = `${h - top + 10}px`
      origin[1] = 'bottom'
    }

    position = position
  }

  function show(node: HTMLElement, params?: {duration?: number, easing?: EasingFunction}): TransitionConfig {
    return {
      duration: params?.duration ?? 200,
      easing: params?.easing ?? cubicInOut,
      css: t => `transform-origin: ${origin.join(' ')}; transform: scale(${t}, ${t});`
    }
  }

  function onGlobalClick(e: MouseEvent) {
    const _target = e.target as HTMLElement
    if (!_target) return

    // 点击是 target
    if (contains(target, _target)) return onClick()

    if (contains(root, _target)) return

    // popover 外部点击则隐藏
    visible = false
  }

  const onResize = debounce(calc)

  export {target, visible, className as class}
</script>

<svelte:window on:click={onGlobalClick} on:resize={onResize}/>

{#if visible}
  <section class={cls("fixed bg-white rounded-md shadow-md z-10", className)}
    style:top={position.top}
    style:left={position.left}
    style:right={position.right}
    style:bottom={position.bottom}
    transition:show|local={{duration: 2e2}}
    bind:this={root}>
    <slot/>
  </section>
{/if}
