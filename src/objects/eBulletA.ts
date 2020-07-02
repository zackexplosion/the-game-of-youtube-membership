import LevelScene from '@/scenes/LevelScene'
import Player from '@/prefabs/Player'
export default class EBulletA extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: LevelScene,
    x: number,
    y: number) {
    super(scene, x, y, 'ebulletA')

    this.scale = 0.5

    scene.physics.add.existing(this)
    scene.add.existing(this)

    scene.physics.add.collider(
      scene.playerBulletGroup,
      this,
      (a, b) => {
        a.destroy()
        b.destroy()
      }
    )

    scene.physics.add.collider(
      scene.player,
      this,
      (player, eBullet) => {
        (<Player>player).hitten()
        eBullet.destroy()
      }
    )
  }
}