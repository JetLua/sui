import {writable, get} from 'svelte/store'

interface Msg {
  id: number
  content: string
  auto: boolean
  closeable: boolean
}

let id = 0

export const msgs = writable<Msg[]>([])
export const auto = writable(true)
export const closeable = writable(false)

export function addMsg(content: string, opts?: {auto?: boolean, duration?: number, closeable?: boolean}) {

  opts ??= {duration: 3e3}

  opts.closeable ??= get(closeable)
  opts.auto ??= get(auto)
  opts.duration ??= 3e3

  id++

  msgs.update(msgs => {
    opts!.auto && setTimeout((id: number) => removeMsg(id), opts!.duration, id)
    return msgs.concat({content, id, auto: opts?.auto!, closeable: opts?.closeable!})
  })

  return id
}

export function removeMsg(id: number) {
  msgs.update(msgs => {
    return msgs.filter(msg => msg.id !== id)
  })
}
