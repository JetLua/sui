<script lang="ts">
  import clsx from 'clsx'
  import type {Snippet} from 'svelte'
  import {ripple} from './util'

  interface Props {
    children: Snippet
    class?: string
  }

  const {children, class: cls}: Props = $props()
</script>

<div use:ripple={{cls: 'ripple'}} class={clsx('relative overflow-hidden group', cls)}>
  {@render children()}
</div>

<style lang="scss">
  .group {
    background-color: var(--bg);
    transition: background-color .2s ease;

    &:hover {
      background-color: var(--bg-hover);
    }
  }
  .ripple {
    content: "";
    width: var(--size);
    height: var(--size);
    opacity: var(--opacity, .8);
    transform: translate(-50%, -50%) scale(var(--r, 0));
    background-color: rgba(255, 255, 255, .6);
    display: block;
    position: absolute;
    top: var(--y, 0);
    left: var(--x, 0);
    z-index: 0;
    transition: transform .4s linear, opacity .8s linear;
    border-radius: 50%;

    @starting-style {
      opacity: .8;
      transform: translate(-50%, -50%) scale(0);
    }
  }
</style>
