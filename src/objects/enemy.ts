import LevelScene from '@/scenes/LevelScene'
// import Player from '@/prefabs/Player'
import EBulletA from './eBulletA'
abstract class Fire {
  bulletTimer: Phaser.Time.TimerEvent
  enemy: Enemy
  constructor(e: Enemy) {
    this.enemy = e
  }

  abstract fire(): void

  destroy() {
    if (this.bulletTimer) this.bulletTimer.destroy()
  }
}

class FireA extends Fire {
  bullets: Array<EBulletA>
  constructor(e: Enemy) {
    super(e)
    this.bulletTimer = e.scene.time.addEvent({
      delay: 500,
      callback: this.fire,
      callbackScope: this,
      loop: true,
    })
  }

  fire() {
    const { scene } = this.enemy
    const e = this.enemy
    const p = scene.player
    const E_BULLET_SPEED = 100
    const b1 = new EBulletA(scene, e.x, e.y)

    var angle = Phaser.Math.Angle.BetweenPoints(e, p)
    var v = scene.physics.velocityFromRotation(angle, E_BULLET_SPEED)

    b1.setVelocity(v.x, v.y)
  }
}

export default class Enemy extends Phaser.GameObjects.Container {
  body!: Phaser.Physics.Arcade.Body
  hp: number
  maxHP: number
  hpPercent: number
  text: Phaser.GameObjects.Text
  scene: LevelScene
  fire: Fire
  mode?: string
  constructor(
    scene: LevelScene,
    x: number,
    y: number,
    edata: any,
    mode?
  ) {
    super(scene)
    this.scene = scene
    this.x = x
    this.y = y
    this.mode = mode

    const text = scene.add.text(0, 0, '', {})
    text.setOrigin(0.5, 0.5)
    text.text = edata.text
    text.setStyle({ fontSize: edata.size + 'px' })
    this.add(text)

    this.hp = edata.hp

    this.text = text
    this.setSize(this.text.width, this.text.height)
    this.scene.add.existing(this)
  }

  create() {}

  wakeUp() {
    this.scene.physics.add.existing(this)
    // this.body.setCollideWorldBounds(true)
    this.body.immovable = true

    const { scene } = this
    // player bullet hit enemy
    scene.physics.add.collider(scene.playerBulletGroup, this, (enemy, bullet) => {
      bullet.destroy()
      this.hitten()
    })
    // this.setActive(false)
    switch (this.mode) {
      default:
        this.fire = new FireA(this)
    }
  }

  hitten() {
    const offset = Phaser.Math.Between(-5, 5)
    this.scene.tweens.add({
      targets: this,
      x: this.x + offset,
      y: this.y + offset,
      // offset: offset,
      duration: 5,
      repeat: 5,
      ease: 'Elastic',
    })
    this.hp--
    this.hpPercent = this.hp / this.maxHP

    if (this.hp === 0) {
      window.emitter.emit('E_DESTROY')
      if (this.fire) this.fire.destroy()
      this.destroy()
    }
  }
}
