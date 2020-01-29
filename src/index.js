let _window = null
let _millis = 900000 // 15 minutes

const _idle = () => {

  const subscribtions = []
  const trigger = () => subscribtions.forEach(func => func())

  let idleTimeoutId
  let ignored = true

  const waitAndTrigger = () => {
    if (ignored) return
    if (idleTimeoutId) clearTimeout(idleTimeoutId)
    idleTimeoutId = _window.setTimeout(trigger, _millis)
  }

  const watch = (millis, __window) => {
    if (!_window) _window = window === undefined ? __window : window
    if (millis) _millis = millis

    // fails silently
    if (!_window) return

    ignored = false

    _window.addEventListener('mousemove', waitAndTrigger, false)
    _window.addEventListener('mousedown', waitAndTrigger, false)
    _window.addEventListener('scroll', waitAndTrigger, false)
    _window.addEventListener('keyup', waitAndTrigger, false)
    _window.addEventListener('touchmove', waitAndTrigger, false)

    idleTimeoutId = _window.setTimeout(trigger, millis)
  }

  const ignore = () => {
    ignored = true
    if (idleTimeoutId) clearTimeout(idleTimeoutId)

    // fails silently
    if (!_window) return

    _window.removeEventListener('mousemove', waitAndTrigger)
    _window.removeEventListener('mousedown', waitAndTrigger)
    _window.removeEventListener('scroll', waitAndTrigger)
    _window.removeEventListener('keyup', waitAndTrigger)
    _window.removeEventListener('touchmove', waitAndTrigger)
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

const idle = _idle()

export default idle

export { idle }
