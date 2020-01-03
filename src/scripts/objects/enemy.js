
export default class Enemy extends Phaser.GameObjects.Container {
  constructor (scene, enemy) {
    super(scene)
    scene.add.existing(this)
    this.hp = 10
    const text = scene.add.text(0, 0, '機車道DEJA!', {
      color: STYLES.DEFAULT_TEXT_COLOR,
      fontSize: 40
    })

    text.setOrigin(0.5, 0.5)
    this.add(text)
    // debugger

    this.setSize(text.width, text.height)

    scene.physics.add.existing(this)
    this.body.setCollideWorldBounds(true)

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

  gotHit () {
    this.hp--
    console.log('this.hp', this.hp)
    if (this.hp === 0) {
      this.destroy()
    }
  }
}

// export default class People {
//   constructor (scene, x, y, imageKey) {
//     scene.group.create(x, y, imageKey)
//   }
// }
