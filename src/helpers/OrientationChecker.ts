type OrientationchangeCallbackType = (isValid: boolean) => void;
const PAUSE_OVERLAY_SHOW_CLASS: string = 'show'
export default class OrientationChecker {
  gameScene: Phaser.Scene
  onOrientationchangeCallback: OrientationchangeCallbackType
  currentSceneKey: string

  constructor(gameScene: Phaser.Scene) {
    this.gameScene = gameScene
    this.currentSceneKey = gameScene.scene.key

    const pauseOverlay = document.querySelector('#invalid-orientation-pause-overlay')

    // check devise orientation on not desktop device
    if (this.isMobilePortrait() && pauseOverlay) {
      gameScene.scene.pause(this.currentSceneKey)
      pauseOverlay.className = PAUSE_OVERLAY_SHOW_CLASS
    }

    gameScene.game.scale.on('orientationchange', (orientation: Phaser.Scale.Orientation) => {
      var isValid = false
      if (orientation === Phaser.Scale.Orientation.LANDSCAPE) {
        isValid = true
        gameScene.scene.resume(this.currentSceneKey)
      } else {
        gameScene.scene.pause(this.currentSceneKey)
      }

      if (pauseOverlay) {
        pauseOverlay.className = isValid ? '' : PAUSE_OVERLAY_SHOW_CLASS
      }


      if (typeof this.onOrientationchangeCallback === 'function') {
        this.onOrientationchangeCallback(isValid)
      }

    })
  }

  isMobilePortrait(): boolean {
    const { gameScene } = this
    return !gameScene.game.device.os.desktop && gameScene.scale.orientation == Phaser.Scale.Orientation.PORTRAIT
  }

  onOrientationchange(cb: OrientationchangeCallbackType) {
    this.onOrientationchangeCallback = cb
  }

}