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
    const { tx, ty } = getDirFromAngle(player.angle)
    this.scale = 0.8
    this.x = x + (tx * settings.PEOPLE_SIZE / 2 * 2)
    this.y = y + (ty * settings.PEOPLE_SIZE / 2 * 2)

    scene.physics.add.existing(this)
    scene.add.existing(this)

    if (scene.playerBulletGroup) {
      scene.playerBulletGroup.add(this)
    }
    this.angle = player.angle
    const { BULLET_SPEED } = settings

    this.setVelocity(tx * BULLET_SPEED, ty * BULLET_SPEED)

  }
}
