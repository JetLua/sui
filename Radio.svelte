<script lang="ts">
  import clsx from 'clsx'
  import type {Snippet} from 'svelte'
  import type {HTMLAttributes} from 'svelte/elements'
  import {dispatch} from './util'

  interface Props extends HTMLAttributes<HTMLElement> {
    children: Snippet
    checked?: boolean
    readonly?: boolean
    onCheck?: (checked: boolean) => void
  }

  const {children, checked = false, readonly = false, onCheck, ...props}: Props = $props()
</script>

<div
  title={props.title}
  class={clsx('flex items-center gap-1 cursor-pointer as-button text-[var(--text-color,currentColor)]', readonly && 'cursor-not-allowed')}
  role="button"
  tabindex="0"
  onkeydown={readonly ? null : dispatch}
  onclick={readonly ? null : () => onCheck?.(!checked)}>
  <div class={clsx('w-4 h-4 border border-[var(--default-color,currentColor)] rounded-full flex items-center justify-center before:hidden', checked && 'before:content-[""] before:w-2.5 before:h-2.5 before:rounded-full before:!block before:bg-[var(--color)] !border-[var(--color)]')}></div>
  {@render children()}
</div>
