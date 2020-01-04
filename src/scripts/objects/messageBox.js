export default class FpsText extends Phaser.GameObjects.Text {
  texts = []
  constructor (scene) {
    const { width, height } = scene.cameras.main
    super(scene, 5, height - 118, '', { color: STYLES.DEFAULT_TEXT_COLOR, fontSize: '20px' })
    scene.add.existing(this)
    // this.setOrigin(1, 0)
  }

  add (text) {
    this.texts.unshift(text)
    this.setText(this.texts)
  }
}
