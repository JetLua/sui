<script lang="ts">
  import clsx from 'clsx'
  import {type Snippet} from 'svelte'
  import type {HTMLInputAttributes} from 'svelte/elements'

  import {ripple, colors, darken, alpha} from './core'

  interface Props extends HTMLInputAttributes {
    children?: Snippet
    class?: string
    variant?: 'outlined' | 'standard'
    loading?: boolean
    disabled?: boolean
  }

  let {
    children,
    class: _class,
    variant = 'standard',
    disabled = false,
    loading = false,
    ...props
  }: Props = $props()

  _class = clsx(
    'relative px-0 py-2 outline-none text-stone-600 duration-300',
    variant === 'standard' ? 'border-b border-solid border-slate-400' : '',
    _class
  )

  const rootClass = clsx('inline-block relative',
    variant === 'standard' ? 'after:block after:absolute after:left-0 after:bottom-0 after:right-0 after:m-auto after:content-[""] after:w-0 after:h-[2px] focus-within:after:w-[100%] after:bg-[var(--primary)] after:transition-[width] after:duration-200 after:ease-[ease]' : ''
  )

  if (loading) disabled = true
</script>

<div class={rootClass}
  style:--primary={colors.primary}>
  <input class={_class} {...props}>
</div>
