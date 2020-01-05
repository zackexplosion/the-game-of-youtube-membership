var startAngle = 0
var endAngle = Math.PI * 2
export default function rotateSponsors () {
  const { x, y } = this.player
  const circle = {
    x,
    y,
    radius: settings.SPONSORS_RADIUS
  }

  startAngle += settings.SPONSORS_ROTATE_SPEED
  endAngle += settings.SPONSORS_ROTATE_SPEED

  if (startAngle >= Math.PI * 2) {
    startAngle = 0
    endAngle = Math.PI * 2
  }

  Phaser.Actions.PlaceOnCircle(this.sponsors.getChildren(), circle, startAngle, endAngle)
}
