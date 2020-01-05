import ENEMIES from 'gamedata/enemies.json'

export default class Enemy extends Phaser.GameObjects.Container {
  constructor (scene, enemy) {
    super(scene)
    scene.add.existing(this)
    this.scene = scene

    const eindex = Phaser.Math.Between(0, ENEMIES.length - 1)

    const e = ENEMIES[eindex]

    this.hp = e.hp
    this.maxHP = e.hp
    this.hpPercent = 0
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
    const offset = Phaser.Math.Between(-10, 10)
    this.scene.tweens.add({
      targets: this,
      x: this.x + offset,
      y: this.y + offset,
      duration: 10,
      repeat: -1,
      ease: 'Elastic'
    })
    this.hp--
    this.hpPercent = this.hp / this.maxHP
  }
}

// export default class People {
//   constructor (scene, x, y, imageKey) {
//     scene.group.create(x, y, imageKey)
//   }
// }
