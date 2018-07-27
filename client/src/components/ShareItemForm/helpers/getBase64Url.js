export const getBase64Url = imageFile => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = e => {
      resolve(`data:${imageFile.mimeType};base64, ${btoa(e.target.result)}`)
    }
    reader.readAsBinaryString(imageFile)
  })
}
