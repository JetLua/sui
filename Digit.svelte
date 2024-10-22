<script lang="ts">
  import clsx from 'clsx'
  import {untrack} from 'svelte'
  import type {HTMLAttributes} from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLElement> {
    value: number
    abbr?: boolean
  }

  let {value, abbr, class: cls, ...props}: Props = $props()

  const _value = $derived.by(() => {
    if (!abbr) return value.toString()
    const units = ['', 'W', 'M', 'B']
    let _value = value
    let count = 0

    untrack(() => {
      while (_value > 9999) {
        _value /= 10000
        count++
      }
    })

    return `${_value}${units[count]}`
  })

  console.log(abbr)
</script>

{#if abbr}
  <span class={cls} {...props}>{_value}</span>
{:else}
  <span class={clsx(cls, 'raw')} {...props} style:--num={_value}></span>
{/if}

<style lang="scss">
  @property --num {
    syntax: '<integer>';
    initial-value: 0;
    inherits: false;
  }

  .raw {
    transition: --num 1s;
    counter-reset: num var(--num);

    &::after {
      content: counter(num);
    }
  }
</style>
