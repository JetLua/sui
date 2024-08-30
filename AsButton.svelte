<script lang="ts">
  import clsx from 'clsx'
  import type {Snippet} from 'svelte'
  import type {HTMLAttributes} from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet
  }

  let {children, tabindex, class: _class, ...props}: Props = $props()

  const onKeyDown: HTMLElement['onkeydown'] = (e) => {
    if (!e.target) return
    const k = e.key.toLowerCase()
    if (k !== ' ' && k !== 'enter') return
    e.target.dispatchEvent(new MouseEvent('click', {view: e.view, bubbles: true}))
  }

  _class = clsx('cursor-default', _class)
</script>

<div {tabindex} class={_class} onkeydown={onKeyDown} {...props} role="button">
  {@render children?.()}
</div>
