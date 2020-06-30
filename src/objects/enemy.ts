import LevelScene from '@/scenes/LevelScene'

export default class Enemy extends Phaser.GameObjects.Container {
  body!: Phaser.Physics.Arcade.Body
  hp: number
  maxHP: number
  hpPercent: number
  text: Phaser.GameObjects.Text
  scene: LevelScene
  constructor(
    scene: LevelScene,
    x: number,
    y: number,
    texture?,
    etc?
  ) {
    super(scene)
    this.scene = scene
    this.x = x
    this.y = y
  }

  create() {
    this.hpPercent = 0
    this.setSize(this.text.width, this.text.height)
    this.text.setOrigin(0.5, 0.5)
    this.scene.physics.add.existing(this)
    this.body.setCollideWorldBounds(true)
    this.body.immovable = true
    const { scene } = this
    // scene.physics.add.collider(scene.playerBulletGroup, this, () => {
    //   console.log('helo')
    // }, undefined, this)
    scene.physics.add.collider(
      scene.playerBulletGroup,
      this,
      (enemy, bullet) => {
        bullet.destroy()
        this.gotHit()
      }
    )
  }

  update() {

  }

  setVelocity(x: number, y: number) {
    this.body.setVelocity(x, y)
  }

  setVelocityX(x: number) {
    this.body.setVelocityX(x)
  }

  setVelocityY(y: number) {
    this.body.setVelocityY(y)
  }

  gotHit() {
    const offset = Phaser.Math.Between(-10, 10)
    this.scene.tweens.add({
      targets: this,
      x: this.x + offset,
      y: this.y + offset,
      duration: 10,
      repeat: 10,
      ease: 'Elastic',
    })
    this.hp--
    this.hpPercent = this.hp / this.maxHP

    const { emitter } = window
    emitter.emit('E_HITTEN')

    if (this.hp === 0) {
      this.destroy()
      emitter.emit('E_DESTROY')
    }
  }
}

// export default class People {
//   constructor (scene, x, y, imageKey) {
//     scene.group.create(x, y, imageKey)
//   }
// }
