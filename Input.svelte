<script lang="ts">
  import clsx from 'clsx'
  import type {Snippet} from 'svelte'
  interface Props {
    children?: Snippet
    label?: string
  }

  const {children, label}: Props = $props()

  const data = $state({
    focused: false,
    value: ''
  })

  function onFocus() {
    data.focused = true
  }

  function onBlur() {
    data.focused = false
  }
</script>

<div class={clsx('group relative border-b border-slate-900 inline-block rounded-t-md overflow-hidden bg-neutral-100 pt-5 pb-2 px-4', data.focused && 'focused')}>
  <span class="text-slate-500 absolute w-fit h-fit top-[0] left-4 right-[0] bottom-[0] m-auto !ml-0" class:small={data.focused || data.value}>{label}</span>
  <input type="text" class="outline-none block bg-transparent leading-[32px] text-[var(--fc)]" bind:value={data.value} onfocus={onFocus} onblur={onBlur}>
  <div class="line"></div>
</div>

<style lang="scss">
  $t: .2s;
  .group {
    & > span {
      transition: transform $t, color $t;
      transform-origin: top left;
    }

    .small {
      color: var(--color);
      transform: scale(.8) translateY(-70%);
    }

    &::after {
      height: 1.2px;
      width: 0;
      background-color: var(--color);
      transition: width $t ease;
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      margin: auto auto 0 auto;
      content: "";
      display: block;
    }

    &.focused {
      border-color: var(--color);
      &::after {
        width: 100%;
      }
    }
  }
</style>
