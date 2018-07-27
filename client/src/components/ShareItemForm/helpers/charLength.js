export const maxCharLength = (charLimit, value) => {
  if (value.length > charLimit) {
    return value.slice(0, value.length - 1)
  }
  return value
}
