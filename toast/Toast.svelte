<script lang="ts">
  import {onMount} from 'svelte'
  import {slide} from 'svelte/transition'
  import type {Action} from 'svelte/action'

  import {Check} from '../icon'
  import {msgs} from './store.svelte'

  let root: HTMLElement

  const snap = $state({sh: 0})

  const handle: Action = e => {
    const h = e.offsetHeight
    const children = root.children

    e.style.setProperty('--oh', `${h}`)
    snap.sh = h

    for (let i = 0; i < children.length; i++) {
      const c = children.item(i) as HTMLElement
      c.style.height = `${h}px`
    }

    return {
      destroy() {
        // todo
      }
    }
  }

  onMount(() => {
    const gap = +(root.style.getPropertyValue('--gap') || 12)
    const children = root.children

    function onEnter() {
      let r

      r = children.item(children.length - 1) as HTMLElement
      let ah = +r.style.getPropertyValue('--oh')

      for (let i = children.length - 2; i > -1; i--) {
        r = children.item(i) as HTMLElement
        const oh = +r.style.getPropertyValue('--oh')
        ah += gap
        r.style.setProperty('--ty', `${-ah}px`)
        r.style.setProperty('height', `${oh}px`)
        ah += oh
      }

      root.style.height = `${ah}px`
    }

    function onLeave() {
      root.style.height = '0'
      for (let i = 0; i < children.length; i++) {
        const c = children.item(i) as HTMLElement
        c.style.height = `${snap.sh}px`
      }
    }

    root.addEventListener('pointerenter', onEnter)

    root.addEventListener('pointerleave', onLeave)

    return () => {
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('pointerenter', onEnter)
    }
  })
</script>

<div
  class="fixed bottom-4 right-4 root w-[20rem]"
  bind:this={root}>
  {#each msgs as {msg, icon, id}, i (id)}
    {@const j = msgs.length - i}
    <p use:handle
      out:slide|global={{duration: 3e2, delay: 0}}
      class="overflow-hidden item flex w-full bg-white p-2 py-4 shadow-lg border border-solid border-gray-200 rounded-md"
      style:--r={j}>
      {#if icon === 'success'}<Check class="fill-lime-600 stroke-white w-6 h-6 shrink-0 mr-2"/>{/if}
      <span class="break-all text-stone-800 text-sm leading-6">{msg}{j}</span>
    </p>
  {/each}
</div>

<style lang="scss">
  .root {
    &:hover .item {
      transform: scale(1) translateY(var(--ty));
    }
  }

  .item {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: scale(calc(1 - (var(--r) - 1) * .1)) translateY(calc((1 - var(--r)) * 8px));
    transform-origin: top center;
    transition: transform .3s ease, height .3s ease;


    @starting-style {
      transform: translateY(100%);
    }
  }
</style>
