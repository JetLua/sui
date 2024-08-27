<script lang="ts">
  import type {Snippet} from 'svelte'
  import type {HTMLAttributes} from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet
  }

  const {children, tabindex, ...props}: Props = $props()

  const onKeyDown: HTMLElement['onkeydown'] = (e) => {
    if (!e.target) return
    const k = e.key.toLowerCase()
    if (k !== ' ' && k !== 'enter') return
    e.target.dispatchEvent(new MouseEvent('click', {view: e.view, bubbles: true}))
  }
</script>

<div {tabindex} onkeydown={onKeyDown} {...props} role="button">
  {@render children?.()}
</div>
