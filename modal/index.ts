import store, {set} from './store.svelte'

export {default as Modal} from './Modal.svelte'

export const modal = {
  show(title: string): Promise<boolean> {
    store.title = title
    store.visible = true
    store.type = 'info'
    return new Promise<boolean>(resolve => {
      set(resolve)
    })
  },

  warn(title: string): Promise<boolean> {
    store.title = title
    store.visible = true
    store.type = 'warning'
    return new Promise<boolean>(resolve => {
      set(resolve)
    })
  },
}
