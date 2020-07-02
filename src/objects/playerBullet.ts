import LevelScene from '@/scenes/LevelScene'
import { getDirFromAngle } from '@/utils'
import settings from '@/gamedata/settings'
export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: LevelScene,
    x: number,
    y: number
  ) {
    const { player } = scene
    super(scene, x, y, 'playerBullet')
    // this.scale = 0.5

    this.x = x
    this.y = y

    console.log('player.x', player.x, x)
    // this.rotation = player.angle
    scene.physics.add.existing(this)
    scene.add.existing(this)

    // this.setCollideWorldBounds(true)
    // this.onWorldBounds = true

    // this.angle = player.angle
    // @ts-ignore
    // this.body.angle = player.angle
    // @ts-ignore

    // @ts-ignore
    // this.body.angle = player.angle
    // this.angle = player.angle



    // bullet.scale = 0.5



  }
}
