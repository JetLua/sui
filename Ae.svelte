<!-- 可以点击的 div 封装起来 避免 lint 警告-->
<script lang="ts">
  import type {Snippet} from 'svelte'
  import type {HTMLAttributes} from 'svelte/elements'
  import {dispatch} from './util'

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet
    root?: HTMLElement
  }

  let {children, root = $bindable(), ...props}: Props = $props()
</script>

<div tabindex="0" bind:this={root} role="button" onkeydown={dispatch} {...props}>{@render children?.()}</div>
