<script lang="ts" generics="T">
  import clsx from 'clsx'
  import {onMount, type Snippet} from 'svelte'
  import type {HTMLSelectAttributes} from 'svelte/elements'
  import {dispatch} from './util'

  import VirtualList from './VirtualList.svelte'
  import Popover from './Popover.svelte'

  interface Props extends HTMLSelectAttributes {
    children?: Snippet
    label?: string
    items: T[]
    filter?: (item: T) => boolean
    value?: T
    index?: number
  }

  let {children, label, value = $bindable(), index = $bindable(), ...props}: Props = $props()

  const st = $state({
    focused: false,
    root: null as unknown as HTMLElement,
    w: '',
    visible: false,
    inputEl: null as unknown as HTMLElement,
  })

  function onFocus() {
    st.visible = true
    st.focused = true
  }

  function onBlur() {
    st.focused = false
    // st.visible = false
  }

  onMount(() => {
    const observer = new ResizeObserver(entries => {
      st.w = `${entries[0].contentRect.width}px`
    })

    observer.observe(st.root)

    return observer.disconnect.bind(observer)
  })
</script>

<div
  bind:this={st.root}
  class={clsx('group as-button relative inline-block rounded-t-md overflow-hidden bg-[var(--bg,transparent)] pb-0', st.focused && 'focused', label ? 'pt-5' : 'pt-2', props.class)}
  onkeydown={dispatch}
  tabindex="0"
  role="button"
  onblur={onBlur}
  onfocus={onFocus}>
  {#if label}
    <span class="text-slate-500 absolute w-fit h-fit top-[0] left-4 right-[0] bottom-[0] m-auto !ml-0" class:small={st.focused || value}>{label}</span>
  {/if}
  <input readonly bind:this={st.inputEl} tabindex="-1" type="text" placeholder={props.placeholder} class="w-full outline-none block bg-transparent leading-[32px] text-[var(--fc)] pointer-events-none" bind:value>
  <Popover
    anchor={['left', 'auto']}
    target={st.root}
    visible={st.visible}
    class="py-2"
    --w={st.w}
    onClose={() => st.visible = false}>
    <VirtualList
      items={props.items}
      item={item}
      class="h-[200px] overflow-auto"
      onSelect={(item, i) => {
        st.visible = false
        value = item
        index = i
      }}
      filter={props.filter}></VirtualList>
  </Popover>
</div>

{#snippet item(s: T, i: number)}
  <p class="text-indigo-400 leading-10 hover:bg-sky-100 cursor-pointer px-2" class:bg-indigo-100={i === index}>{s}</p>
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
