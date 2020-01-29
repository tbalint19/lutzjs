let _window = null
let _millis = 900000 // 15 minutes

const idle = () => {

  const subscribtions = []
  const trigger = () => subscribtions.forEach(func => func())

  let idleTimeoutId
  let ignored = true

  const waitAndTrigger = () => {
    if (ignored) return
    if (idleTimeoutId) clearTimeout(idleTimeoutId)
    idleTimeoutId = _window.setTimeout(trigger, _millis)
  }

  _window.addEventListener('mousemove', waitAndTrigger, false)
  _window.addEventListener('mousedown', waitAndTrigger, false)
  _window.addEventListener('scroll', waitAndTrigger, false)
  _window.addEventListener('keyup', waitAndTrigger, false)
  _window.addEventListener('touchmove', waitAndTrigger, false)

  const watch = (__window, millis) => {
    if (!_window) _window = window === undefined ? __window : window
    if (mil) _millis = millis

    // fails silently
    if (!_window) return

    ignored = false
    idleTimeoutId = _window.setTimeout(trigger, millis)
  }

  const ignore = () => {
    ignored = true
    if (idleTimeoutId) clearTimeout(idleTimeoutId)
  }

  const on = (func) => {
    subscribtions.push(func)
  }

  return {
    watch,
    ignore,
    on
  }

}

const $idle = idle()

export default $idle

export { $idle }
