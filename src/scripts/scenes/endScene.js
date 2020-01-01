export default class EndScene extends Phaser.Scene {
  constructor () {
    super({ key: 'EndScene' })
  }

  create () {
    this.cameras.main.fadeIn(4000)
    const { centerX, centerY } = this.cameras.main
    var text = this.add.text(centerX, centerY, '謝謝大家的支持:D', { color: 'black', fontSize: '40px' })

    var restart = this.add.text(centerX, this.cameras.main.centerY + 100, '再看一次', { color: 'black', fontSize: '20px' })
      .setInteractive()
      .on('pointerup', e => {
        window.location.reload()
      })

    text.setOrigin(0.5)
    restart.setOrigin(0.5)
  }
}
