export function ripple(node: HTMLElement, opts: {cls?: string}) {
  const size = Math.sqrt(node.offsetHeight ** 2 + node.offsetWidth ** 2)

  let id: string

  {
    const bg = getComputedStyle(node).backgroundColor

    const list = bg.replace('rgba(', '')
      .replace('rgb(', '')
      .replace(')', '')
      .split(',')
      .map(v => +v)

    for (let i = 0; i < 3; i++) {
      list[i] *= .8
      list[i] = Math.min(255, Math.round(list[i]))
    }

    node.style.setProperty('--bg-hover', list.length === 3 ? `rgb(${list.join(',')})` : `rgba(${list.join(',')})`)
  }

  for (const item of node.classList) {
    if (item.startsWith('svelte')) id = item
  }

  function handle(e: MouseEvent) {
    const ripple = document.createElement('div')

    opts.cls && ripple.classList.add(opts.cls)
    ripple.classList.add(id)

    ripple.style.setProperty('--size', `${size * 2}px`)
    ripple.style.setProperty('--opacity', '0')
    ripple.style.setProperty('--r', '1')
    ripple.style.setProperty('--x', `${e.offsetX}px`)
    ripple.style.setProperty('--y', `${e.offsetY}px`)

    function handle(e: TransitionEvent) {
      if (e.propertyName !== 'opacity') return
      ripple.removeEventListener('transitionend', handle)
      ripple.remove()
    }

    ripple.addEventListener('transitionend', handle)
    ripple.addEventListener('transitioncancel', handle)

    node.prepend(ripple)
  }

  node.addEventListener('pointerdown', handle)

  return {
    destroy() {
      node.removeEventListener('pointerdown', handle)
    }
  }
}

export function dispatch(e: KeyboardEvent) {
  if (e.key === ' ' || e.key.toLowerCase() === 'enter') {
    e.stopPropagation()
    const target = e.target as HTMLElement
    target.dispatchEvent(new MouseEvent('click', {view: window, bubbles: true, cancelable: true}))
  }
}

export function debounce<T extends (...args: any[]) => void>(fn: T, t = .2) {
  let id: ReturnType<typeof setTimeout>

  return (...args: Parameters<typeof fn>) => {
    clearTimeout(id)
    id = setTimeout(() => fn(...args), t * 1e3)
  }
}

export function contains(parent: HTMLElement, target: HTMLElement) {
  if (!parent) return false

  if (parent === target || parent.contains(target)) return true

  if (parent.childElementCount) {
    const queue = Array.from(parent.children)
    while (queue.length) {
      const item = queue.pop()

      if (item?.contains(target) || item === target) return true

      if (item?.childElementCount) {
        queue.push(...Array.from(item.children))
      }
    }
  }

  return false
}
