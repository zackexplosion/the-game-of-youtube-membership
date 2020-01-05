var lastTimeFired = 0
export default function playerController (time, delta) {
  const { player, playerControlerKeys } = this
  const key = playerControlerKeys
  player.setVelocity(0, 0)

  // movement control
  if (key.up.isDown) {
    player.setVelocityY(-settings.PLAYER_MOVE_SPEED)
  }
  if (key.down.isDown) {
    player.setVelocityY(settings.PLAYER_MOVE_SPEED)
  }
  if (key.left.isDown) {
    player.setVelocityX(-settings.PLAYER_MOVE_SPEED)
  }
  if (key.right.isDown) {
    player.setVelocityX(settings.PLAYER_MOVE_SPEED)
  }

  // fire control
  var pointer = this.input.activePointer
  if (pointer.isDown || key.fire.isDown) {
    if (time - lastTimeFired < settings.PLAYER_FIRE_DELAY) return
    this.playerFire()
    lastTimeFired = time
  }
}
