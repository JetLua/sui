<script lang="ts">
  import clsx from 'clsx'
  import type {HTMLAttributes} from 'svelte/elements'

  interface Props extends HTMLAttributes<SVGSVGElement> {

  }

  const {
    class: _class,
    ...props
  }: Props = $props()
</script>

<svg
  width="24"
  height="24"
  viewBox="0 0 23.52 24"
  fill="none"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={clsx(_class)}
  {...props}>
  <path d=" M 12 9.818 L 12 14.465 L 18.458 14.465 C 18.174 15.96 17.323 17.225 16.047 18.076 L 19.942 21.098 C 22.211 19.004 23.52 15.927 23.52 12.273 C 23.52 11.422 23.443 10.604 23.302 9.818 L 12 9.818 Z " fill="rgb(66,133,244)"/><path d=" M 5.275 14.284 L 4.396 14.956 L 1.287 17.378 L 1.287 17.378 C 3.262 21.295 7.309 24 12 24 C 15.239 24 17.956 22.931 19.941 21.098 L 16.047 18.076 C 14.978 18.796 13.614 19.233 12 19.233 C 8.88 19.233 6.229 17.127 5.28 14.291 L 5.275 14.284 Z " fill="rgb(52,168,83)"/><path d=" M 1.287 6.622 C 0.469 8.236 0 10.058 0 12 C 0 13.942 0.469 15.764 1.287 17.378 C 1.287 17.389 5.28 14.28 5.28 14.28 C 5.04 13.56 4.898 12.796 4.898 12 C 4.898 11.203 5.04 10.44 5.28 9.72 L 1.287 6.622 Z " fill="rgb(251,188,5)"/><path d=" M 12 4.778 C 13.767 4.778 15.338 5.389 16.593 6.567 L 20.029 3.131 C 17.945 1.189 15.24 0 12 0 C 7.309 0 3.262 2.695 1.287 6.622 L 5.28 9.72 C 6.229 6.884 8.88 4.778 12 4.778 L 12 4.778 Z " fill="rgb(234,67,53)"/>
</svg>
