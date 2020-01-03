
var chunk = 100
var FIRE_DELAY = 300
var lastTimeFired = 0
export default function playerController (time, delta) {
  const { player, playerControlerKeys } = this

  player.setVelocity(0, 0)

  if (playerControlerKeys.up.isDown) {
    player.setVelocityY(-chunk)
  }
  if (playerControlerKeys.down.isDown) {
    player.setVelocityY(chunk)
  }
  if (playerControlerKeys.left.isDown) {
    player.setVelocityX(-chunk)
  }
  if (playerControlerKeys.right.isDown) {
    player.setVelocityX(chunk)
  }

  if (playerControlerKeys.fire.isDown && time - lastTimeFired > FIRE_DELAY
  ) {
    this.playerFire()
    lastTimeFired = time
  }

  // if (keys.up.isUp && keys.down.isUp) {
  //   player.setVelocity(0, 0)
  // } else if()
}
