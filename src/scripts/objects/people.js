import PlayerBullet from './playerBullet'
export default class People extends Phaser.GameObjects.Container {
  hp = -1
  isPlayer = false
  constructor (scene, imageKey) {
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
      this.body.setCollideWorldBounds(true)
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

  setVelocity (x, y) {
    this.body.setVelocity(x, y)
  }

  setVelocityX (x) {
    this.body.setVelocityX(x)
  }

  setVelocityY (y) {
    this.body.setVelocityY(y)
  }

  fire () {
    if (this.isPlayer) {
      emitter.emit('PLAY_SOUND', 'playerFireSFX', {
        volume: 0.6
      })
    }

    const { scene } = this
    const bullet = new PlayerBullet(scene, this.x, this.y)
    scene.bulletGroup.add(bullet)
    bullet.scale = 0.5

    const { BULLET_SPEED } = settings
    const { tx, ty } = Phaser.Math.getDirFromAngle(this.angle)
    bullet.setVelocity(tx * BULLET_SPEED, ty * BULLET_SPEED)
  }

  gotHit () {
    this.hp--
    const volume = 0.2
    if (this.hp > 0) {
      emitter.emit('PLAY_SOUND', 'explosion', { volume })
    } else {
      emitter.emit('PLAY_SOUND', 'playerDie', { volume })
    }
  }
}

// export default class People {
//   constructor (scene, x, y, imageKey) {
//     scene.group.create(x, y, imageKey)
//   }
// }
