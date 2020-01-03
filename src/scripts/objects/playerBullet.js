
export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
  constructor (scene) {
    const { player } = scene
    super(scene, player.x, player.y, 'playerBullet')

    scene.physics.add.existing(this)
    this.setCollideWorldBounds(true)

    scene.add.existing(this)
    this.angle = player.angle
  }
}
