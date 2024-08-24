<script lang="ts" generics="T">
  import clsx from 'clsx'
  import chroma from 'chroma-js'
  import {type Snippet} from 'svelte'
  import {ripple, colors, darken, alpha} from './core'

  interface Props {
    children?: Snippet
    class?: string
    variant?: 'outlined' | 'contained' | 'text'
  }

  let {children, class: _class, variant = 'contained'}: Props = $props()

  _class = clsx(
    'px-4 py-2 rounded-md transition-[background] duration-300 hover:shadow-lg',
    variant === 'contained' ? 'text-white bg-[var(--bg)] hover:bg-[var(--hover-bg)] border border-solid border-[var(--bg)]' :
    variant === 'outlined' ? 'bg-transparent border border-solid border-[var(--bg)] text-[var(--bg)] hover:bg-[var(--outline-bg)]' : '',
    _class
  )
</script>

<button
  use:ripple
  style:--hover-bg={darken(colors.primary)}
  style:--outline-bg={alpha(colors.primary)}
  style:--bg={colors.primary}
  class={_class}
>{@render children?.()}</button>
