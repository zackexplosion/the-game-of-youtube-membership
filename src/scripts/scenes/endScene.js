export default class EndScene extends Phaser.Scene {
  constructor () {
    super({ key: 'EndScene' })
  }

  create () {
    var text = this.add.text(10, this.cameras.main.centerY, '謝謝大家的支持:D', { color: 'black', fontSize: '40px' })

    text.alpha = 0.1

    this.tweens.add({
      targets: text,
      props: {
        alpha: { value: 1, duration: 4000, ease: 'Power2' }
      }
    })
  }
}
