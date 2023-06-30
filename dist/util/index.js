export function contains(parent, target) {
    if (!parent)
        return false;
    if (parent === target || parent.contains(target))
        return true;
    if (parent.childElementCount) {
        const queue = Array.from(parent.children);
        while (queue.length) {
            const item = queue.pop();
            if (item?.contains(target) || item === target)
                return true;
            if (item?.childElementCount) {
                queue.push(...Array.from(item.children));
            }
        }
    }
    return false;
}
export function pureObject(o) {
    if (!isObject(o))
        return false;
    const ctor = o.constructor;
    if (ctor == null)
        return true;
    const prot = ctor.prototype;
    if (!isObject(prot))
        return false;
    if (!Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf'))
        return false;
    return true;
}
function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}
export function debounce(fn, t = .2) {
    let id;
    return (...args) => {
        clearTimeout(id);
        id = setTimeout(() => fn(...args), t * 1e3);
    };
}
export function cls(...ss) {
    return ss.filter(s => s?.trim()).join(' ');
}
/**
 * @param t 单位秒，默认0
 * @returns
 */
export function delay(t = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, t * 1e3);
    });
}
export function shouldKey(e, key) {
    return e.key.toLowerCase() === key;
}
