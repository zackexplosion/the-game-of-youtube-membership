import ENEMIES from 'gamedata/enemies.json'
export default class Enemy extends Phaser.GameObjects.Container {
  constructor (scene, enemy) {
    super(scene)
    scene.add.existing(this)

    const eindex = Phaser.Math.Between(0, ENEMIES.length - 1)

    const e = ENEMIES[eindex]

    this.hp = e.hp
    const text = scene.add.text(0, 0, e.text, {
      color: STYLES.DEFAULT_TEXT_COLOR,
      fontSize: e.size * 1.5
    })

    // Utils.Align.scaleToGameW(text, 0.25)

    text.setOrigin(0.5, 0.5)
    this.add(text)
    // debugger

    this.setSize(text.width, text.height)

    scene.physics.add.existing(this)
    this.body.setCollideWorldBounds(true)
    this.body.immovable = true
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
  }
}

// export default class People {
//   constructor (scene, x, y, imageKey) {
//     scene.group.create(x, y, imageKey)
//   }
// }
