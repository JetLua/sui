<script lang="ts">
  import clsx from 'clsx'
  import type {Snippet} from 'svelte'
  import type {HTMLAttributes} from 'svelte/elements'

  import {onKeyDown} from './core'

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet
  }

  let {children, tabindex, class: _class, ...props}: Props = $props()

  _class = clsx('cursor-default', _class)
</script>

<div {tabindex} class={_class} onkeydown={onKeyDown} {...props} role="button">
  {@render children?.()}
</div>
