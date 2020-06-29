import LevelScene from '@/scenes/LevelScene'
export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: LevelScene,
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

    // this.angle = player.angle
    // @ts-ignore
    // this.body.angle = player.angle
    // @ts-ignore
    this.body.rotation = player.angle
  }
}
