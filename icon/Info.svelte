<script lang="ts">
  import clsx from 'clsx'
import type {SVGAttributes} from 'svelte/elements'

interface Props extends SVGAttributes<SVGSVGElement> {

}

let {class: _class, ...props}: Props = $props()

_class = clsx('stroke-[var(--stroke,#999)] fill-[var(--fill,transparent)]', _class)
</script>

<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke-width="1"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={_class} {...props}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" />
</svg>
