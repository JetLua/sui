type Icon = 'error' | 'success' | 'info'

export const msgs = $state([] as Array<{msg: string, icon?: Icon, id: string, duration: number}>)

function toast(e: string, duration?: number) {
  push(e, {duration})
}

toast.success = function(e: string, duration?: number) {
  push(e, {icon: 'success', duration})
}

toast.error = function(e: string | Error, duration?: number) {
  push(e instanceof Error ? e.message : e, {icon: 'error', duration})
}

function push(msg: string, opts?: {icon?: Icon, duration?: number}) {
  const id = crypto.randomUUID()
  const duration = opts?.duration ?? 3
  setTimeout(() => {
    const i = msgs.findIndex(m => m.id === id)
    msgs.splice(i, 1)
  }, duration * 1e3)
  if (msgs.length < 3) return msgs.push({msg, icon: opts?.icon, id, duration})
  msgs.shift()
  msgs.push({msg, icon: opts?.icon, id, duration: opts?.duration ?? 3})
}

export {toast}
