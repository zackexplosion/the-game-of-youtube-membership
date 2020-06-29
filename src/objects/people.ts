import PlayerBullet from './playerBullet'
import { getDirFromAngle } from '@/utils'
import settings from '@/gamedata/settings'
import Level from '@/scenes/LevelScene'
export default class People extends Phaser.GameObjects.Container {
  body!: Phaser.Physics.Arcade.Body
  hp = -1
  isPlayer = false
  scene: Level
  constructor(scene: Level, imageKey: string) {
    super(scene)
    const { PEOPLE_SIZE } = settings
    this.width = PEOPLE_SIZE
    this.height = PEOPLE_SIZE
    scene.add.existing(this)
    this.scene = scene

    const img = scene.add.image(0, 0, imageKey)
    img.displayWidth = PEOPLE_SIZE
    img.displayHeight = PEOPLE_SIZE
    img.angle = 90
    scene.physics.add.existing(this)
    // this.setSize(img.width, img.height)
    // this.setSize(PEOPLE_SIZE, PEOPLE_SIZE)

    // only main player need this
    if (imageKey === 'player') {
      this.isPlayer = true
      // this.body.setCollideWorldBounds(true)
    }

    // this.body.x = -100
    // img.setOrigin(0.5, 0.5)
    // img.setOrigin(0.5)
    this.add(img)
    scene.input.enableDebug(img)
    // this.refreshBody()

    // this.setOrigin(0.5, 0.5)
    //   .setBounce(0)
    //   .setInteractive({ useHandCursor: true })
    //   .on('pointerdown', () => {
    //     const v = Phaser.Math.Between(0, -800)
    //     this.setVelocity(v, v)
    //   })
    // this.setVelocity(100, 0)

    // scene.group.add(this)
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
    const bullet = new PlayerBullet(scene, this.x + 40, this.y + 40)
    bullet.scale = 0.5
    if (scene.bulletGroup) {
      scene.bulletGroup.add(bullet)
    }

    // bullet.scale = 0.5

    const { BULLET_SPEED } = settings
    const { tx, ty } = getDirFromAngle(this.angle)
    bullet.setVelocity(tx * BULLET_SPEED, ty * BULLET_SPEED)
  }
}
