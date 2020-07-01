import STYLES from '@/gamedata/styles'
import Utils from '@/utils'

export default class LoadingBar extends Phaser.GameObjects.Container {
  public SIGN: String = '%'
  private loadingText: Phaser.GameObjects.Text
  private progText: Phaser.GameObjects.Text
  constructor(config: ObjectConfig) {
    super(config.scene)
    const scene = config.scene
    const fontSize = scene.cameras.main.width / 10
    const style = {
      color: STYLES.DEFAULT_TEXT_COLOR,
      fontSize,
    }
    this.loadingText = scene.add.text(0, 0, 'Loading', style)
    this.loadingText.setOrigin(0.5, 0.5)

    this.progText = scene.add.text(0, fontSize, '0' + this.SIGN, style)
    this.progText.setOrigin(0.5, 0.5)

    this.add(this.progText)
    this.add(this.loadingText)

    Utils.Align.toCenter(this)

    scene.add.existing(this)
    this.scene = scene
  }

  public setPer(value: number) {
    var per = Math.abs(Math.floor(value * 100) - 1)
    this.progText.setText(per.toString() + this.SIGN)
  }

  public finish() {
    this.progText.setText('100' + this.SIGN)
  }
}
