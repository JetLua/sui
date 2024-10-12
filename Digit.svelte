<script lang="ts">
  import {animate} from 'popmotion'
  import {untrack, type Snippet} from 'svelte'
  import type {HTMLAttributes} from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLElement> {
    value: number
    // children: Snippet
  }

  const {value, ...props}: Props = $props()

  // const snap = $state({
  //   value: 0
  // })

  // function tick(value: number) {
  //   animate({
  //     from: snap.value,
  //     to: value,
  //     duration: 3e2,
  //     onUpdate: v => {
  //       snap.value = v | 0
  //     }
  //   })
  // }

  // $effect(() => {
  //   const v = value
  //   untrack(() => tick(v))
  // })
</script>

<span {...props} style:--num={value}></span>

<style lang="scss">
  @property --num {
    syntax: '<integer>';
    initial-value: 0;
    inherits: false;
  }

  span {
    transition: --num 1s;
    counter-reset: num var(--num);
  }

  span::after {
    content: counter(num);
  }
</style>
