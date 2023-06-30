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

export function pureObject(o: any) {
  if (!isObject(o)) return false

  const ctor = o.constructor
  if (ctor == null) return true

  const prot = ctor.prototype
  if (!isObject(prot)) return false

  if (!Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf')) return false

  return true
}


function isObject(o: unknown) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export function debounce<T extends (...args: any[]) => void>(fn: T, t = .2) {
  let id: ReturnType<typeof setTimeout>

  return (...args: Parameters<typeof fn>) => {
    clearTimeout(id)
    id = setTimeout(() => fn(...args), t * 1e3)
  }
}

export function cls(...ss: (string | undefined | null)[]) {
  return ss.filter(s => s?.trim()).join(' ')
}

/**
 * @param t 单位秒，默认0
 * @returns
 */
export function delay(t = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, t * 1e3)
  })
}

export function shouldKey(e: KeyboardEvent, key: string) {
  return e.key.toLowerCase() === key
}
