<script lang="ts">
  import type {Snippet} from 'svelte'
  import type {HTMLButtonAttributes} from 'svelte/elements'
  import Ripple from './Ripple.svelte'

  interface Props extends Partial<HTMLButtonAttributes> {
    children?: Snippet
  }

  const {children, ...props}: Props = $props()
</script>

<Ripple class="w-fit rounded-md"><button class="z-[1] relative px-6 text-[var(--fc,white)] py-2" {...props}>{@render children?.()}</button></Ripple>
