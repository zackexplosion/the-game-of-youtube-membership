import PlayerBullet from './playerBullet'
import { getDirFromAngle } from '@/utils'
import settings from '@/gamedata/settings'
import LevelScene from '@/scenes/LevelScene'

export default class People extends Phaser.GameObjects.Container {
  body!: Phaser.Physics.Arcade.Body
  hp = -1
  isPlayer = false
  scene: LevelScene
  constructor(
    scene: LevelScene,
    imageKey: string,
    x: number,
    y: number,
    texture?
  ) {
    super(scene)
    this.x = x
    this.y = y
    const { PEOPLE_SIZE } = settings
    this.width = PEOPLE_SIZE
    this.height = PEOPLE_SIZE
    scene.add.existing(this)
    this.scene = scene

    const img = scene.add.image(0, 0, imageKey)
    img.displayWidth = PEOPLE_SIZE
    img.displayHeight = PEOPLE_SIZE
    img.angle = 90
    img.setOrigin(0.5, 0.5)
    scene.physics.add.existing(this)
    this.add(img)
  }

  public setVelocity(x: number, y: number): void {
    this.body.setVelocity(x, y)
  }

  setVelocityX(x: number) {
    this.body.setVelocityX(x)
  }

  setVelocityY(y: number) {
    this.body.setVelocityY(y)
  }

  fire() {
    const { scene } = this
    new PlayerBullet(scene, this.x, this.y)
  }
}
