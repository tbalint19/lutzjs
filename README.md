# Lutzjs

Idle user checking for frontend applications

# Usage

__Start monitoring the user__
```js
const idle = require('lutzjs')

$idle.watch()
// or
$idle.watch(5000)
```

__Subscribe with a function__
```js
$idle.on(() => alert('HEY!!!'))
```

__Ignore (when watching a video for example)__
```js
$idle.ignore()
```


# License

MIT © TBalint19
