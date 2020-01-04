
export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    const { player } = scene
    super(scene, x, y, 'playerBullet')
    this.width = 20
    this.height = 20

    scene.physics.add.existing(this)
    this.setCollideWorldBounds(true)

    scene.add.existing(this)
    this.setOrigin(0.5)
    this.angle = player.angle
  }

  // destroy () {
  //   console.log('on bullet destroy')
  //   this.destroy()
  // }
}
