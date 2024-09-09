<script lang="ts">
  import clsx from 'clsx'
  import {type Snippet} from 'svelte'
  import Button from '../Button.svelte'
  import store, {get} from './store.svelte'
  import {Info} from '../icon'

  let dialog: HTMLDialogElement

  const tcls = $derived(store.type === 'warning' ? 'text-orange-500' : 'text-slate-500')

  function handle(ok: boolean) {
    get()(ok)
    store.visible = false
  }

  $effect(() => {
    if (store.visible) dialog.showModal()
    else dialog.close()
  })
</script>

<dialog bind:this={dialog} class="rounded-md">
  <div class="bg-white p-4 rounded-md">
    <p class={clsx(tcls, 'flex')}>
      {#if store.type === 'warning'}<Info class="fill-orange-500 stroke-white w-6 h-6 shrink-0 mr-2"/>{/if}
      <span class="break-all text-sm leading-6">{store.title}</span>
    </p>
    <div class="flex justify-end mt-2">
      <Button variant="text" class="text-sm" onclick={() => handle(false)}>cancel</Button>
      <Button variant="text" class="text-sm" onclick={() => handle(true)}>ok</Button>
    </div>
  </div>
</dialog>

<style lang="scss">
  dialog::backdrop {
    opacity: .5;
    background-color: #000;
  }
</style>
