export default class EndScene extends Phaser.Scene {
  constructor () {
    super({ key: 'EndScene' })
  }

  create () {
    var text = this.add.text(10, this.cameras.main.centerY, '謝謝大家的支持:D', { color: 'black', fontSize: '40px' })

    var restart = this.add.text(10, this.cameras.main.centerY + 100, '再看一次', { color: 'black', fontSize: '20px' })
      .setInteractive()
      .on('pointerup', e => {
        window.location = window.location
      })

    text.alpha = 0.1
    restart.alpha = 0.1
    this.tweens.add({
      targets: [text, restart],
      props: {
        alpha: { value: 1, duration: 4000, ease: 'Power2' }
      }
    })
  }
}
