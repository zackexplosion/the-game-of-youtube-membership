import LevelScene from '@/scenes/LevelScene'
import Player from '@/prefabs/Player'

export default class Enemy extends Phaser.GameObjects.Container {
  body!: Phaser.Physics.Arcade.Body
  hp: number
  maxHP: number
  hpPercent: number
  text: Phaser.GameObjects.Text
  scene: LevelScene
  bulletTimer: Phaser.Time.TimerEvent
  constructor(scene: LevelScene, x: number, y: number, texture?, etc?) {
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
    scene.physics.add.collider(scene.playerBulletGroup, this, (enemy, bullet) => {
      bullet.destroy()
      this.gotHit()
    })
    this.setActive(false)

    this.bulletTimer = this.scene.time.addEvent({
      delay: 500,
      callback: this.fire,
      //args: [],
      callbackScope: this ,
      loop: true
    })
  }

  fire() {
    const { scene } = this
    const E_BULLET_SPEED = 500
    scene.ebulletGroupA = scene.physics.add.group({
      key: 'ebulletA',
      frameQuantity: 10,
    })

    scene.ebulletGroupA.children.iterate((c) => {
      const _ = <Phaser.GameObjects.Container>c
      _.x = this.x
      _.y = this.y
      _.scale = 0.3
      var vx = Phaser.Math.Between(-E_BULLET_SPEED, E_BULLET_SPEED)
      var vy = Phaser.Math.Between(-E_BULLET_SPEED, E_BULLET_SPEED)
      const body = <Phaser.Physics.Arcade.Body>_.body
      body.setVelocity(vx, vy)

      // scene.ebulletGroupA.add(_)
    })

    // remove bullet when play bullet hit e bullet a
    scene.physics.add.collider(
      scene.playerBulletGroup,
      scene.ebulletGroupA,
      (a, b) => {
        a.destroy()
        b.destroy()
      }
    )

    scene.physics.add.collider(
      scene.ebulletGroupA,
      scene.player,
      (player, eBullet) => {
        (<Player>player).hitten()
        eBullet.destroy()
      }
    )


  }

  update() {}

  setVelocity(x: number, y: number) {
    this.body.setVelocity(x, y)
  }

  setVelocityX(x: number) {
    this.body.setVelocityX(x)
  }

  setVelocityY(y: number) {
    this.body.setVelocityY(y)
  }

  destroy() {
    if (this.bulletTimer) this.bulletTimer.destroy()
    super.destroy()
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

    if (this.hp === 0) {
      window.emitter.emit('E_DESTROY')
      this.destroy()
    }
  }
}
