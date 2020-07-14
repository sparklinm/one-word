export function cutText (str, length = 40) {
  if (str.length > length) {
    return str.slice(0, length) + '...'
  }

  return str
}
