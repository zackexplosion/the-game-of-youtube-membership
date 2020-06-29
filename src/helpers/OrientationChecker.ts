import PauseScene from '@/scenes-ui/PauseScene'

type OrientationchangeCallbackType = (isValid: boolean) => void;
const PAUSE_SCENE_KEY: string = 'PauseScene'
export default class OrientationChecker {
  gameScene: Phaser.Scene
  onOrientationchangeCallback: OrientationchangeCallbackType
  currentSceneKey: string

  constructor(gameScene: Phaser.Scene) {
    this.gameScene = gameScene

    this.currentSceneKey = gameScene.scene.key

    // check devise orientation on not desktop device
    if (this.isMobilePortrait()) {
      gameScene.scene.pause(this.currentSceneKey)
      gameScene.scene.launch(PAUSE_SCENE_KEY)
    }

    gameScene.game.scale.on('orientationchange', (orientation: Phaser.Scale.Orientation) => {
      var isValid = false
      if (orientation === Phaser.Scale.Orientation.LANDSCAPE) {
        isValid = true
        gameScene.scene.resume(this.currentSceneKey)
        gameScene.scene.bringToTop(this.currentSceneKey)
      } else {
        // launch the pause secene when orientation is not valid
        gameScene.scene.launch(PAUSE_SCENE_KEY)
        gameScene.scene.bringToTop(PAUSE_SCENE_KEY)
        gameScene.scene.pause(this.currentSceneKey)
      }

      // gameScene.scene.switch(PAUSE_SCENE_KEY)
      // set the visiable for the pause scene
      gameScene.scene.setVisible(!isValid, PAUSE_SCENE_KEY)


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