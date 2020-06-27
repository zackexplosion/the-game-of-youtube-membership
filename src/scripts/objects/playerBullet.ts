import MainScene from '../scenes/mainScene'

export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: MainScene,
    x: number,
    y: number
  ) {
    const { player } = scene
    super(scene, x, y, 'playerBullet')
    this.width = 20
    this.height = 20

    scene.physics.add.existing(this)
    scene.add.existing(this)
    // this.setCollideWorldBounds(true)
    // this.onWorldBounds = true
    this.setOrigin(0.5)
    this.angle = player.angle
    //
  }
}
