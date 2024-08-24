<script lang="ts">
  import clsx from 'clsx'
  import chroma from 'chroma-js'
  import {type Snippet} from 'svelte'
  import {ripple, colors, darken, alpha} from './core'
  import type {HTMLButtonAttributes} from 'svelte/elements'

  interface Props extends HTMLButtonAttributes {
    children?: Snippet
    class?: string
    variant?: 'outlined' | 'contained' | 'text'
    loading?: boolean
    disabled?: boolean
  }

  let {
    children,
    class: _class,
    variant = 'contained',
    disabled = false,
    loading = false,
    ...props
  }: Props = $props()

  _class = clsx(
    'relative px-4 py-2 rounded-md transition-[background] duration-300 hover:shadow-lg',
    variant === 'contained' ? 'text-white bg-[var(--bg)] hover:bg-[var(--hover-bg)] border border-solid border-[var(--bg)]' :
    variant === 'outlined' ? 'bg-transparent border border-solid border-[var(--bg)] text-[var(--bg)] hover:bg-[var(--outline-bg)]' : '',
    _class
  )

  if (loading) disabled = true
</script>

<button
  use:ripple
  style:--hover-bg={darken(colors.primary)}
  style:--outline-bg={alpha(colors.primary)}
  style:--bg={colors.primary}
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
        r="35" stroke-width="10" stroke="#e15b64"
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
