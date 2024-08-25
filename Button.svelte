<script lang="ts">
  import clsx from 'clsx'
  import {type Snippet} from 'svelte'
  import type {HTMLButtonAttributes} from 'svelte/elements'

  import {ripple, colors, darken, alpha} from './core'

  interface Props extends HTMLButtonAttributes {
    children?: Snippet
    class?: string
    variant?: 'outlined' | 'contained'
    loading?: boolean
    disabled?: boolean
    bgColor?: string
    textColor?: string
  }

  let {
    children,
    class: _class,
    variant = 'contained',
    disabled = false,
    loading = false,
    bgColor,
    textColor,
    ...props
  }: Props = $props()

  _class = clsx(
    'relative px-4 py-2 rounded-md transition-[background,box-shadow] duration-300 hover:shadow disabled:bg-slate-200 disabled:border-slate-200 disabled:hover:shadow-none',
    variant === 'contained' ? 'text-[var(--text-color)] bg-[var(--bg-color)] hover:bg-[var(--hover-bg-color)] border border-solid border-[var(--bg-color)]' :
    variant === 'outlined' ? 'bg-transparent border border-solid border-[var(--text-color)] text-[var(--text-color)] hover:bg-[var(--hover-bg-color)]' : '',
    _class
  )

  if (loading) disabled = true
  textColor = textColor || (variant === 'contained' ? 'white' : colors.primary)
  bgColor = bgColor || (variant === 'contained' ? colors.primary : '#0000')

  const shadowColor = variant === 'contained' ? bgColor : textColor
  const hoverBgColor = variant === 'contained' ? darken(bgColor) : alpha(textColor)
</script>

<button
  use:ripple
  style:--text-color={textColor}
  style:--hover-bg-color={hoverBgColor}
  style:--bg-color={bgColor}
  style:--shadow={alpha(shadowColor, 1)}
  class={_class}
  {disabled}
  {...props}>
  {#if loading}
    <svg
      class="absolute left-[50%] translate-x-[-50%]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="1.5rem">
      <circle
        stroke-dasharray="164.93361431346415 56.97787143782138"
        r="35" stroke-width="10" stroke="#fff"
        fill="none"
        cy="50" cx="50">
        <animateTransform
          keyTimes="0;1"
          values="0 50 50;360 50 50"
          dur="1s"
          repeatCount="indefinite"
          type="rotate"
          attributeName="transform"
        ></animateTransform>
      </circle>
    </svg>
  {/if}
  <span class="contents" class:invisible={loading}>{@render children?.()}</span>
</button>
