<script lang="ts">
  import clsx from 'clsx'
  import {type Snippet} from 'svelte'
  import type {HTMLInputAttributes} from 'svelte/elements'

  import {ripple, colors, darken, alpha} from './core'

  interface Props extends HTMLInputAttributes {
    children?: Snippet
    class?: string
    disabled?: boolean
    color?: string
    checked?: boolean
  }

  let {
    children,
    class: _class,
    disabled = false,
    color,
    checked = $bindable(false),
    ...props
  }: Props = $props()

  const _color = $derived(color || (disabled ? colors.disabled : checked ? colors.primary : darken(colors.disabled, 1.5)))

  const shadowColor = $derived(alpha(_color, colors.shadowAlpha))

  const rootClass = $derived.by(() => {
    const cls = ['w-fit h-fit rounded-[4px] aspect-square border-2 border-solid border-[var(--color)] p-0 transition-[box-shadow,background-color] duration-300 ease-[ease]'] as string[]

    if (checked) cls.push('bg-[var(--color)]')
    if (!disabled) cls.push('hover:shadow')

    return clsx(cls)
  })

</script>

<button
  onclick={() => checked = !checked}
  disabled={disabled}
  style:--color={_color}
  style:--shadow={shadowColor}
  class={rootClass}>
  <svg
    class:active={checked}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round">
    <path d="M5 12l5 5l10 -10" stroke-dasharray="22 22" stroke-dashoffset="22" stroke="white"/>
  </svg>
</button>

<style lang="scss">
  svg.active {
    path {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset .2s ease;
    }
  }
</style>
