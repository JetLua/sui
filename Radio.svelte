<script lang="ts">
  import clsx from 'clsx'
  import type {Snippet} from 'svelte'
  import {dispatch} from './util'

  interface Props {
    children: Snippet
    checked?: boolean
    onCheck?: (checked: boolean) => void
  }

  const {children, checked = false, onCheck}: Props = $props()
</script>

<div class="flex items-center gap-1 cursor-pointer as-button text-[var(--text-color,currentColor)]" role="button" tabindex="0" onkeydown={dispatch} onclick={() => onCheck?.(!checked)}>
  <div class={clsx('w-4 h-4 border border-[var(--default-color,currentColor)] rounded-full flex items-center justify-center before:hidden', checked && 'before:content-[""] before:w-2.5 before:h-2.5 before:rounded-full before:!block before:bg-[var(--color)] !border-[var(--color)]')}></div>
  {@render children()}
</div>
