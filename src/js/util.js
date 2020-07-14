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
