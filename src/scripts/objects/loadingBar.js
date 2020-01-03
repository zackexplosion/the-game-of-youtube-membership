export default class LoadingBar extends Phaser.GameObjects.Container {
  SIGN = '%'
  constructor (config) {
    super(config.scene)
    const scene = config.scene
    const style = {
      color: STYLES.DEFAULT_TEXT_COLOR,
      fontSize: game.config.width / 15
    }
    const textY = 20
    this.loadingText = scene.add.text(0, -textY, 'Loading', style)
    this.loadingText.setOrigin(0.5, 0.5)

    this.progText = scene.add.text(0, textY, '0' + this.SIGN, style)
    this.progText.setOrigin(0.5, 0.5)

    this.add(this.progText)
    this.add(this.loadingText)

    Utils.Align.toCenter(this)

    scene.add.existing(this)
    this.scene = scene
  }

  setPer (value) {
    var per = Math.floor(value * 100)
    this.progText.setText(per + this.SIGN)
  }
}
