
export default class People extends Phaser.GameObjects.Container {
  constructor (scene, imageKey) {
    super(scene)
    const { PEOPLE_SIZE } = settings
    this.width = PEOPLE_SIZE
    this.height = PEOPLE_SIZE
    scene.add.existing(this)

    const img = scene.add.image(0, 0, imageKey)
    img.displayWidth = PEOPLE_SIZE
    img.displayHeight = PEOPLE_SIZE
    img.angle = 90
    scene.physics.add.existing(this)
    // this.setSize(img.width, img.height)
    // this.setSize(PEOPLE_SIZE, PEOPLE_SIZE)

    // only main player need this
    if (imageKey === 'player') {
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
}

// export default class People {
//   constructor (scene, x, y, imageKey) {
//     scene.group.create(x, y, imageKey)
//   }
// }
