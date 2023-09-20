<script lang="ts" context="module">
  let x: number
  let y: number
  let shadow: HTMLElement
</script>

<script lang="ts">
  import {cls, shouldKey} from './util'
  import {cubicOut} from 'svelte/easing'
  import {fade, type TransitionConfig} from 'svelte/transition'

  let visible = false
  let className: string | undefined = undefined

  function onDown({pageX, pageY, target}: MouseEvent) {
    x = pageX
    y = pageY

    target === shadow && (visible = false)
  }

  function animate(node: HTMLElement, opts?: {duration: number}): TransitionConfig {
    const {innerWidth: w, innerHeight: h} = window
    const cx = w / 2
    const cy = h / 2
    const {top, left, right, bottom} = node.getBoundingClientRect()

    let ox = 'center'
    let oy = 'center'
    let tx = 0
    let ty = 0

    if (x > cx) {
      ox = 'right'
      tx = x - right
    } else if (x < cx) {
      ox = 'left'
      tx = x - left
    }

    if (y > cy) {
      oy = 'bottom'
      ty = y - bottom
    } else if (y < cy) {
      oy = 'top'
      ty = y - top
    }

    return {
      duration: opts?.duration || 3e2,
      easing: cubicOut,
      css: (t: number, u: number) => `transform-origin: ${ox} ${oy}; opacity: ${t}; transform: translate(${tx * u}px, ${ty * u}px) scale(${t})`
    }
  }

  export {visible, className as class}
</script>

<svelte:window
  on:mousedown={onDown}
  on:keydown={e => shouldKey(e, 'escape') && (visible = false)}
/>

{#if visible}
<section
  bind:this={shadow}
  class="bg-black/50 w-full h-full fixed top-0 left-0 flex items-center justify-center"
  transition:fade={{duration: 2e2}}>
  <section
    class={cls('bg-white rounded-lg w-5/6 max-w-lg', className)}
    transition:animate={{duration: 3e2}}>
    <slot/>
  </section>
</section>
{/if}
