const snap = $state({
  title: '',
  visible: false,
  type: 'info' as 'error' | 'warning' | 'info' | 'success'
})

let resolve: (ok: boolean) => void

export function set(fn: typeof resolve) {
  resolve = fn
}

export function get() {
  return resolve
}

export default snap
