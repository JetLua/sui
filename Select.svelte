<script lang="ts">
  import clsx from 'clsx'
  import {onMount, type Snippet} from 'svelte'
  import type {HTMLSelectAttributes} from 'svelte/elements'
  import VirtualList from './VirtualList.svelte'
  import Popover from './Popover.svelte'

  interface Props extends HTMLSelectAttributes {
    children?: Snippet
    label?: string
    items: any[]
  }

  const {children, label, ...props}: Props = $props()

  const st = $state({
    focused: false,
    value: '',
    root: null as unknown as HTMLElement,
    w: ''
  })

  function onFocus() {
    st.focused = true
  }

  function onBlur() {
    st.focused = false
  }



  onMount(() => {
    const resizeObserver = new ResizeObserver(entries => {
      st.w = `${entries[0].contentRect.width}px`
    })

    resizeObserver.observe(st.root)

    return () => resizeObserver.disconnect()
  })
</script>

<div bind:this={st.root} class={clsx('group relative inline-block rounded-t-md overflow-hidden bg-[var(--bg,transparent)] pt-5 pb-0', st.focused && 'focused', label ? 'pt-5' : 'pt-2', props.class)}>
  {#if label}
    <span class="text-slate-500 absolute w-fit h-fit top-[0] left-4 right-[0] bottom-[0] m-auto !ml-0" class:small={st.focused || st.value}>{label}</span>
  {/if}
  <input type="text" placeholder={props.placeholder} class="w-full outline-none block bg-transparent leading-[32px] text-[var(--fc)]" bind:value={st.value} onfocus={onFocus} onblur={onBlur}>
  <Popover anchor={['left', 'auto']} target={st.root} visible={true} class="w-[100%] py-2" --w={st.w}>
    <VirtualList items={props.items} item={item} class="h-[200px] overflow-auto"></VirtualList>
  </Popover>
</div>

{#snippet item(s: string)}
  <p class="text-indigo-400 leading-10 hover:bg-indigo-100 cursor-pointer px-2">{s}</p>
{/snippet}

<style lang="scss">
  $t: .3s;

  .group {
    transition: border-width .2s linear;

    & > span {
      transition: transform $t, color $t;
      transform-origin: top left;
    }

    .small {
      color: var(--color, currentColor);
      transform: scale(.8) translateY(-70%);
    }

    &:hover {
      &::before {
        height: 1.5px;
      }
    }

    &::before {
      height: 1.2px;
      width: 100%;
      background-color: currentColor;
      transition: height $t ease;
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      margin: auto auto 0 auto;
      content: "";
      display: block;
    }

    &::after {
      height: 1.5px;
      width: 0;
      background-color: var(--color, currentColor);
      transition: width $t ease;
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      margin: auto auto 0 auto;
      content: "";
      display: block;
    }

    &.focused {
      border-color: var(--color, currentColor);

      &::after {
        width: 100%;
      }
    }
  }
</style>
