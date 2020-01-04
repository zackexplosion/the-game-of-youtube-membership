var lastTimeFired = 0
export default function playerController (time, delta) {
  const { player, playerControlerKeys } = this

  player.setVelocity(0, 0)

  if (playerControlerKeys.up.isDown) {
    player.setVelocityY(-settings.PLAYER_MOVE_SPEED)
  }
  if (playerControlerKeys.down.isDown) {
    player.setVelocityY(settings.PLAYER_MOVE_SPEED)
  }
  if (playerControlerKeys.left.isDown) {
    player.setVelocityX(-settings.PLAYER_MOVE_SPEED)
  }
  if (playerControlerKeys.right.isDown) {
    player.setVelocityX(settings.PLAYER_MOVE_SPEED)
  }

  if (playerControlerKeys.fire.isDown && time - lastTimeFired > settings.PLAYER_FIRE_DELAY
  ) {
    this.playerFire()
    lastTimeFired = time
  }
}
