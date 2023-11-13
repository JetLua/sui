<script lang="ts">
  import {cls} from '@iro/util'
  const id = crypto.randomUUID()
  let className = ''

  export {className as class}
</script>

<input type="checkbox" class="hidden" id={id}>
<label for={id} class="flex items-center gap-2 cursor-pointer">
  <div class={cls('flex items-center justify-center rounded-full p-[4px]', className)}>
    <svg width="12px" height="9px" viewBox="0 0 12 9">
      <polyline points="1 5 4 8 11 1"></polyline>
    </svg>
  </div>
  <slot/>
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
      & > div {
        border: 1px solid #ccc;
        background-color: #fff;
        transition: background-color .3s ease;
      }
    }

    &:checked + label {
      & > div {
        border: none;
        background-color: var(--color, #0ea5e9);
      }

      svg {
        stroke-dashoffset: 0;
      }
    }
  }
</style>
