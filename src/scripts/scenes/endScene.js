export default class EndScene extends Phaser.Scene {
  timedEvent
  restartButton
  constructor () {
    super({ key: 'EndScene' })
  }

  create () {
    this.cameras.main.fadeIn(4000)
    const { centerX, centerY } = this.cameras.main
    var text = this.add.text(centerX, centerY, '謝謝大家的支持:D', { color: STYLES.DEFAULT_TEXT_COLOR, fontSize: '40px' })

    this.restartButton = this.add.text(centerX, this.cameras.main.centerY + 100, '再玩一次', { color: STYLES.DEFAULT_TEXT_COLOR, fontSize: '20px' })
      .setInteractive()
      .on('pointerup', e => {
        window.location.reload()
      })

    text.setOrigin(0.5)
    this.restartButton.setOrigin(0.5)

    this.timedEvent = this.time.delayedCall(20000, function () {
      window.location.reload()
    }, [], this)
  }

  update () {
    var a = this.timedEvent
    const l = ((a.delay - a.elapsed) / 1000).toFixed(0)
    this.restartButton.setText('再看一次: ' + l)
  }
}
