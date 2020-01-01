export default class FpsText extends Phaser.GameObjects.Text {
  texts = []
  constructor (scene) {
    const { width, height } = scene.cameras.main
    super(scene, width - 10, height - 122, '', { color: 'black', fontSize: '12px' })
    scene.add.existing(this)
    this.setOrigin(1, 0)
  }

  add (text) {
    this.texts.unshift(text)
    this.setText(this.texts)
  }
}
