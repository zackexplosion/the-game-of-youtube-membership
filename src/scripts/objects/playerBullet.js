
export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    const { player } = scene
    super(scene, x, y, 'playerBullet')

    scene.physics.add.existing(this)
    this.setCollideWorldBounds(true)

    scene.add.existing(this)
    this.angle = player.angle
  }
}
