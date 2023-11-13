<script lang="ts">
  import {cls, shouldKey} from '@iro/util'
  const id = crypto.randomUUID()

  let className = ''
  let checked = false

  export {className as class, checked}
</script>

<input type="checkbox" class="hidden" id={id} bind:checked={checked}>
<label for={id}>
  <div class="flex items-center gap-2 cursor-pointer" tabindex="0" role="button"
    on:keydown={e => (shouldKey(e, 'enter') || shouldKey(e, 'space')) && (checked = !checked)}>
    <div class={cls('flex items-center justify-center rounded-full p-[4px]', className)}>
      <svg width="12px" height="9px" viewBox="0 0 12 9">
        <polyline points="1 5 4 8 11 1"></polyline>
      </svg>
    </div>
    <slot/>
  </div>
</label>

<style lang="scss">
  svg {
    width: 100%;
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }

  input[type=checkbox] {
    & + label {
      div > div {
        border: 1px solid #ccc;
        background-color: #fff;
        transition: background-color .3s ease;
      }
    }

    &:checked + label {
      div > div {
        border: none;
        background-color: var(--color, #0ea5e9);
      }

      svg {
        stroke-dashoffset: 0;
      }
    }
  }
</style>
