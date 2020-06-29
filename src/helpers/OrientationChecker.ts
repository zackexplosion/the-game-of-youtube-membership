type OrientationchangeCallbackType = (isValid: boolean) => void;
export default class OrientationChecker {
  scene: Phaser.Scene
  onOrientationchangeCallback: OrientationchangeCallbackType

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    const rotateNotice = scene.add.text(
      <number>scene.game.config.width / 2,
      <number>scene.game.config.height / 2,
      "請把手機轉橫 :D",
      {
        fontSize: 120
      }
    )
      .setOrigin(0.5)
      .setVisible(false)

    // check devise orientation on not desktop device
    if (this.isMobile()) {
      rotateNotice.setVisible(true)
    }

    scene.game.scale.on('orientationchange', (orientation: Phaser.Scale.Orientation) => {
      var isValid = false
      if (orientation === Phaser.Scale.Orientation.LANDSCAPE) {
        isValid = true
      }

      rotateNotice.setVisible(!isValid)
      this.onOrientationchangeCallback(isValid)
    })
  }

  isMobile(): boolean {
    return !this.scene.game.device.os.desktop && this.scene.scale.orientation == Phaser.Scale.Orientation.PORTRAIT
  }

  onOrientationchange(cb: OrientationchangeCallbackType) {
    this.onOrientationchangeCallback = cb
  }

}