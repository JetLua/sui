<script lang="ts" module>
  import {Check} from './icon'

  type Icon = 'error' | 'success' | 'info'

  const msgs = $state([] as Array<{msg: string, icon?: Icon, id: string}>)
  const hs = $state([] as Array<number>)


  function toast(e: string) {
    push(e)
  }

  toast.success = function(e: string) {
    push(e, 'success')
  }

  toast.error = function(e: string | Error) {
    push(e instanceof Error ? e.message : e, 'error')
  }

  function push(msg: string, icon?: Icon) {
    const id = crypto.randomUUID()
    if (msgs.length < 3) return msgs.push({msg, icon, id})
    msgs.shift()
    msgs.push({msg, icon, id})
  }

  export {toast}
</script>

<script lang="ts">
</script>

<div class="fixed bottom-4 right-4 root">
  {#each msgs as {msg, icon, id}, i (id)}
    {@const j = msgs.length - i}
    <p class="item flex bg-white p-2 py-4 shadow-lg border border-solid border-gray-200 rounded-md w-[20rem] overflow-hidden" style:--r={j} style:--h={hs.slice(i + 1).reduce((a, c) => a + c, 0)} bind:offsetHeight={hs[i]}>
      {#if icon === 'success'}<Check class="fill-lime-600 stroke-white w-6 h-6 shrink-0 mr-2"/>{/if}
      <span class="break-all text-stone-800 text-sm leading-6">{msg}{j}</span>
    </p>
  {/each}
</div>

<style lang="scss">
  .root {
    &:hover .item {
      transform: scale(1) translateY(calc(var(--h) * -1px + (var(--r) - 1) * -16px));
    }
  }

  .item {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: scale(calc(1 - (var(--r) - 1) * .1)) translateY(calc((1 - var(--r)) * 8px));
    transform-origin: top center;
    transition: all .3s ease;

    @starting-style {
      transform: translateY(100%);
    }
  }
</style>
