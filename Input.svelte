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
    textColor?: string
    borderColor?: string
    value?: string
  }

  let {
    children,
    class: _class,
    variant = 'standard',
    disabled = false,
    loading = false,
    borderColor,
    textColor,
    value = $bindable(),
    ...props
  }: Props = $props()

  _class = clsx(
    'relative px-0 py-2 outline-none text-[var(--text-color)] duration-300',
    variant === 'standard' ? 'border-b border-solid border-slate-400' : '',
    _class
  )

  const rootClass = clsx('inline-block relative',
    variant === 'standard' ? 'after:block after:absolute after:left-0 after:bottom-0 after:right-0 after:m-auto after:content-[""] after:w-0 after:h-[2px] focus-within:after:w-[100%] after:bg-[var(--border-color)] after:transition-[width] after:duration-200 after:ease-[ease]' : ''
  )

  if (loading) disabled = true

  textColor = textColor || '#57534e'
  borderColor = borderColor || colors.primary
</script>

<div class={rootClass}
  style:--border-color={borderColor}>
  <input
    bind:value={value}
    class={_class}
    style:--text-color={textColor}
    {...props}
  >
</div>
