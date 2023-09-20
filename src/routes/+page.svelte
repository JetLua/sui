<script lang="ts">
  import {Switch, Dialog, ProgressBar, Input, Popover} from '$lib'
  let target: HTMLElement
  let inputValue: string
  let dialog = false
</script>

<button bind:this={target} class="bg-blue-500 text-white p-2 rounded-md">Show Popover</button>
<Switch/>

<ProgressBar progress={80} strokeWidth={18}/>

<Input label="文件名" required bind:value={inputValue} rules={[{pattern: /\d+/, err: '只能dddddddd是整数'}]}/>
<Input label="用户名" class="mt-4" variant="outlined" required bind:value={inputValue} rules={[{pattern: /\d+/, err: '只能是整数'}]}/>

<Popover target={target} class="p-4">
  哈哈哈
</Popover>

<div class="flex justify-between">
  <button on:click={() => dialog = true}>show dialog</button>
  <button on:click={() => dialog = true}>show dialog</button>
</div>
<p>okdd</p>


<Dialog bind:visible={dialog}>
  <p>dkfskjf</p>
  <p>dkfskjf</p>
  <p>dkfskjf</p>
  <p>dkfskjf</p>
  <p>dkfskjf</p>
  <p>dkfskjf</p>
</Dialog>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    width: 80%;
    margin: auto;
  }
</style>
