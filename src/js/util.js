export function cutText (str, length = 40) {
  if (str.length > length) {
    return str.slice(0, length) + '...'
  }

  return str
}

export function blobToDataURL (blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = (e) => {
      resolve(e.target.result)
    }
    // readAsDataURL
    fileReader.readAsDataURL(blob)
    fileReader.onerror = () => {
      reject(new Error('file error'))
    }
  })
}

export function hiddenRows (el, rows = 6, exceededRows = 2) {
  const style = window.getComputedStyle(el)
  const height = parseFloat(style.height)
  const lineHeight = parseFloat(style.lineHeight)
  const totalRows = Math.ceil(height / lineHeight)

  if (totalRows > rows + exceededRows) {
    return {
      hidden: true,
      height: rows * lineHeight
    }
  }
  return {
    hidden: false,
    height
  }
}

// function hiddenLength (el, count = 5, exceededRows = 2) {
//   const style = window.getComputedStyle(el)
//   const height = parseFloat(style.height)
//   const lineHeight = parseFloat(style.lineHeight)
//   const totalRows = Math.ceil(height / lineHeight)

//   if (totalRows > rows + exceededRows) {
//     return rows * lineHeight
//   }
//   return height
// }


function throttle (fn) {
  let curTick = false
  const that = this
  const params = [...arguments]

  params.shift()
  return function () {
    const curParams = [...arguments]

    if (!curTick) {
      curTick = true
      requestAnimationFrame(() => {
        fn.apply(that, [...curParams, params])
        curTick = false
      })
    }
  }
}


export function infiniteScroll (options) {
  let container = document
  const opt = Object.assign(
    {
      el: document.documentElement,
      distance: 0
    },
    options
  )
  const el = opt.el

  if (el !== document.documentElement) {
    container = el
  }

  function scroll () {
    const { scrollTop, scrollHeight, clientHeight } = el

    if (clientHeight + scrollTop + opt.distance >= scrollHeight) {

      opt.callback && opt.callback()
    }
  }

  const throttleScroll = throttle(scroll)

  function destory () {
    container.removeEventListener('scroll', throttleScroll)
  }

  container.addEventListener('scroll', throttleScroll)

  return {
    destory
  }
}
