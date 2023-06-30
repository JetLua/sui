<script lang="ts">
  import {cls} from '@treeland/util'
  import {slide} from 'svelte/transition'

  let className: string | undefined = undefined
  let label: string = ''
  let required = false
  let rules: {pattern: RegExp, err: string}[] | undefined = undefined
  let value: string | undefined = undefined
  let err: string | undefined = undefined
  let variant: 'standard' | 'outlined' = 'standard'
  let focused = false
  let placeholder = true

  function onBlur() {
    focused = false
    if (!required) return

    if (!value) return err = `${label}不能为空`

    if (rules) {
      for (const {pattern, err: _err} of rules) {
        if (pattern.test(value)) continue
        return err = _err
      }
    }
  }

  function onFocus() {
    err = undefined
    focused = true
  }

  $: placeholder = !value

  export {className as class, label, required, rules, value, variant}
</script>

<div class={cls('flex flex-col items-center relative', className)}>
  <div class={cls('relative w-full flex-col flex overflow-hidden wrapper', variant)}
    class:focused class:placeholder>
    {#if label && variant === 'standard'}<i class="label-placeholder"/>{/if}
    {#if variant === 'outlined'}
      <fieldset class="w-full relative flex px-2 py-1">
        <legend class="px-2" class:required>{label}</legend>
        <input
        bind:value={value}
        class="outline-0 overflow-hidden flex-1 text-slate-500 block px-2 bg-transparent"
        on:blur={onBlur}
        on:focus={onFocus}/>
      </fieldset>
    {:else}
      <div class="w-full relative flex">
        <input
        bind:value={value}
        class="outline-0 overflow-hidden flex-1 text-slate-500 block bg-transparent"
        on:blur={onBlur}
        on:focus={onFocus}/>
        {#if label}<i class="label" class:required>{label}</i>{/if}
      </div>
    {/if}
  </div>
  {#if err}
    <i class="h-5 not-italic self-start text-xs text-rose-500 left-0 top-full whitespace-nowrap flex items-center" transition:slide>{err}</i>
  {/if}
</div>

<style lang="scss">
  $border-color: #ccc;
  .wrapper {
    padding-top: .5rem;
    box-sizing: content-box;

    &.standard {
      height: 3rem;
      border-radius: 0;
      border-width: 0;
      border-bottom: 1px solid var(--zero-border-color, $border-color);
    }

    &:hover {
      border-color: var(--zero-primary-color, #619ce9);
    }

    &:not(.placeholder) .label {
      transform: translate(0, -1.5rem) scale(.75);
    }

    &.focused {
      border-color: var(--zero-primary-color, #619ce9);

      .label {
        transform: translate(0, -1.5rem) scale(.75);
      }
    }

    input {
      height: 2rem;
      line-height: 2rem;
    }

    &:not(.standard):focus {
      box-shadow: 0 0 .3rem var(--zero-primary-color, #619ce9);
    }
  }

  %required {
    &::after {
      content: "*";
      color: var(--zero-asterisk-color, #f05752);
      margin-left: .2rem;
    }
  }

  fieldset {
    border-radius: var(--zero-border-radius, 4px);
    border: 1px solid var(--zero-border-color, $border-color);

    legend {
      font-size: .75rem;
      color: #999;

      &.required {
        @extend %required;
      }
    }
  }

  .label-placeholder {
    height: 1rem;
    display: block;
  }

  .label {
    transform-origin: left top;
    transition: all .2s ease;
    font-size: 1rem;
    position: absolute;
    height: 1rem;
    line-height: 1rem;
    top: 0;
    bottom: 0;
    margin: auto;
    color: #999;
    z-index: 1;
    display: flex;
    align-items: center;
    font-style: normal;

    &.required {
      @extend %required;
    }
  }
</style>
