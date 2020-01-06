
const removeCallback = function (c) {
  const { width, height } = settings.gameConfig.scale
  if (c.x <= 0 || c.x >= width || c.y > height || c.y <= 0) {
    // remove bullet out of bound
    c.destroy()
  }
}
export default function removeOutOfBoundsBullets (time, delta) {
  if (this.bulletGroup) {
    this.bulletGroup.getChildren().forEach(removeCallback)
  }

  if (this.ebullet_group_a) {
    this.ebullet_group_a.getChildren().forEach(removeCallback)
  }

  if (this.ebullet_group_b) {
    this.ebullet_group_b.getChildren().forEach(removeCallback)
  }
}
