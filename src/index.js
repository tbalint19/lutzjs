const interpretTime = (timeString) => {
  const number = parseInt(timeString.slice(0, -1))
  const unit = timeString.slice(-1)
  const multiplier = unit == "s" ? 1 : unit == "m" ? 60 : unit == "h" ? 3600 : 1
  return multiplier * number
}

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  })
}

const _idle = () => {

  let idleFor = 0
  let interval = null

  let subscribtions = []
  const trigger = () => subscribtions
    .forEach(subscribtion => {
      if (subscribtion.seconds < idleFor && !subscribtion.called) {
        subscribtion.func()
        subscribtion.called = true
      }
    })

  const reset = () => {
    idleFor = 0
    subscribtions.forEach((subscribtion) => {
      subscribtion.called = false
    })
  }

  const on = (timeString, func) => {
    const id = uuidv4()
    subscribtions.push({ seconds: interpretTime(timeString), func, triggered: false, id })
    return id
  }

  const ignoreSubscribtion = (id) => {
    subscribtions = subscribtions.filter(subscribtion => subscribtion.id != id)
  }

  const observe = () => {
    if (interval) return

    window.addEventListener('mousemove', reset, false)
    window.addEventListener('mousedown', reset, false)
    window.addEventListener('scroll', reset, false)
    window.addEventListener('keyup', reset, false)
    window.addEventListener('touchmove', reset, false)

    interval = setInterval(() => {
      idleFor++
      trigger()
    }, 1000)
  }

  const ignore = () => {
    window.removeEventListener('mousemove', reset)
    window.removeEventListener('mousedown', reset)
    window.removeEventListener('scroll', reset)
    window.removeEventListener('keyup', reset)
    window.removeEventListener('touchmove', reset)

    clearInterval(interval)
    interval = null
  }

  return {
    observe,
    ignore,
    ignoreSubscribtion,
    on
  }

}

const idle = _idle()

export default idle

export { idle }
