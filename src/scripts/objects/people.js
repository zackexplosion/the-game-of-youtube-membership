export default class People extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, imageKey) {
    super(scene, x, y, imageKey)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setCollideWorldBounds(true)
      .setBounce(0.8)
      .setInteractive()
      .on('pointerdown', () => {
        const v = Phaser.Math.Between(0, -800)
        // this.setVelocityY(v)
        this.setVelocity(v, v)
      })

    scene.group.add(this)
  }
}

// export default class People {
//   constructor (scene, x, y, imageKey) {
//     scene.group.create(x, y, imageKey)
//   }
// }
