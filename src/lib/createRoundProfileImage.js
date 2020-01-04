const imageSize = 80
export default function createRoundProfileImage (url) {
  var canvas = document.createElement('canvas')
  canvas.width = imageSize
  canvas.height = imageSize
  const ctx = canvas.getContext('2d')
  var i = new Image()
  i.src = url

  var img = document.createElement('img')
  img.setAttribute('crossOrigin', 'anonymous')
  return new Promise((resolve, reject) => {
    img.src = url
    img.onload = function () {
      ctx.beginPath()
      ctx.arc(imageSize / 2, imageSize / 2, imageSize / 2, 0, 6.28, false) // draw the circle
      ctx.clip()
      // call the clip method so the next render is clipped in last path
      // ctx.stroke();
      ctx.closePath()
      ctx.drawImage(img, 0, 0, imageSize, imageSize)
      const base64Data = canvas.toDataURL()
      resolve(base64Data)
    }
  })
}
