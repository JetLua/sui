<script lang="ts">
  import {onMount, type Snippet} from 'svelte'
  import type {HTMLAttributes, MouseEventHandler} from 'svelte/elements'

  import {toString} from './core'
    import AsButton from './AsButton.svelte'

  interface Props extends HTMLAttributes<HTMLElement> {
    target?: HTMLElement
    children?: Snippet
    visible?: boolean
  }

  let {target, visible = $bindable(false), ...props}: Props = $props()

  const snap = $state({
    style: {} as CSSStyleDeclaration
  })

  onMount(() => {
    if (!target) return
    target.addEventListener('click', () => {
      visible = !visible
      let r
      r = target.getBoundingClientRect()
      if (r.bottom > innerHeight / 2) {
        snap.style.bottom = `${innerHeight - r.top}px`
      } else {
        snap.style.top = `${r.bottom}px`
      }

      if (r.left > innerWidth / 2) {
        snap.style.right = `${innerWidth - r.right}px`
      } else {
        snap.style.left = `${r.left}px`
      }
    })
  })

  const click: MouseEventHandler<HTMLElement> = e => {
    const target = e.target as HTMLElement
    e.stopPropagation()
    if (!target) return
    if (target.dataset.id === 'root') visible = false
  }
</script>

{#if visible}
  <AsButton class="w-[100vw] h-[100vh] fixed top-0 left-0 z-[999]" onclick={click} data-id="root">
    <div class="shadow w-fit rounded-md fixed bg-white" style={toString(snap.style)}>
      {@render props.children?.()}
    </div>
  </AsButton>
{/if}
