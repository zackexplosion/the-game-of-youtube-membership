import styles from '@/gamedata/styles'
export default class MessageBox extends Phaser.GameObjects.Text {
  private texts: string[] = []
  constructor(scene: Phaser.Scene) {
    super(scene, 5, scene.cameras.main.height - 118, '', { color: styles.DEFAULT_TEXT_COLOR, fontSize: '20px' })
    scene.add.existing(this)
  }

  add(text: string) {
    this.texts.unshift(text)
    this.setText(this.texts)
  }
}
