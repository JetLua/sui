<script lang="ts">
  import {type Snippet} from 'svelte'
  import type {HTMLAttributes} from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet
  }

  const {children, ...props}: Props = $props()
</script>

<div class={props.class}>
  {@render children()}
</div>
