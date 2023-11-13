<script lang="ts">
  import {shouldKey} from '@iro/util'

  let width = 60
  let height = 30
  let gap = 4
  let checked = false
  let activeColor = '#03a9f4'
  let color = '#ececec'

  $: d = height - gap * 2

  export {width, height, gap, checked, activeColor, color}
</script>

<section
  on:click={() => checked = !checked}
  on:keydown={e => shouldKey(e, 'enter') && (checked = !checked)}
  role="switch"
  tabindex={0}
  aria-checked={false}
  style:width={`${width}px`}
  style:height={`${height}px`}
  style:border-radius={`${height / 2}px`}
  class:active={checked}
  style:background-color={checked ? activeColor : color}
  class="flex items-center cursor-pointer relative transition-all duration-300 ease-in-out">
  <i
    class="block bg-white absolute transition-transform duration-300 ease-in-out"
    style:width={`${d}px`}
    style:height={`${d}px`}
    style:top={`${gap}px`}
    style:left={`${gap}px`}
    style:transform={`translateX(${checked ? width - gap * 2 - d : 0}px)`}
    style:border-radius={`${d / 2}px`}/>
</section>
