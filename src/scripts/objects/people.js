export default class People extends Phaser.GameObjects.Container {
  constructor (scene, x = 0, y = 0, imageKey) {
    super(scene)
    scene.add.existing(this)

    const img = scene.add.image(x, y, imageKey)
    img.angle = 90
    scene.physics.add.existing(this)
    // this.setSize(img.width, img.height)
    this.setSize(40, 40)
    this.body.setCollideWorldBounds(true)

    this.add(img)
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
