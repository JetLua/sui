<script lang="ts">
  import clsx from 'clsx'
  import AsButton from './AsButton.svelte'

  interface Props {
    class?: string
    checked?: boolean
  }

  let {checked = $bindable(false), ...props}: Props = $props()

</script>

<div class="root contents">
  <AsButton class={clsx('root cursor-pointer', props.class, checked && 'active')} onclick={() => {
    checked = !checked
  }}></AsButton>
</div>


<style lang="scss">
  $gap: 2px;
  .root > :global {
    .root {
      --default-h: var(--h, 1.5rem);
      --dot-size: calc(var(--default-h) - 4px);
      width: var(--w, 2.5rem);
      height: var(--default-h);
      background-color: var(--bg, #e2e8f0);
      border-radius: calc(var(--default-h) / 2);
      position: relative;
      transition: background-color .2s ease;

      &.active {
        &::after {
          left: calc(var(--w, 2.5rem) - $gap - var(--dot-size));
        }

        background-color: var(--active-bg, #2eb387);
      }

      &::after {
        transition: left .2s ease;
        content: "";
        background-color: var(--dot-color, #fff);
        aspect-ratio: 1;
        height: var(--dot-size);
        border-radius: 50%;
        display: block;
        top: $gap;
        left: $gap;
        position: absolute;
      }
    }
  }
</style>
