const START_SCENE = 'menuScene'
import LoadingBar from '@/objects/loadingBar'
import levels from '@/gamedata/levels'

export default class LoadingScene extends Phaser.Scene {
  private loadingBar: LoadingBar
  constructor() {
    super({ key: 'LoadingScene' })
  }

  preload() {
    this.loadingBar = new LoadingBar({ scene: this })

    this.load.on('progress', (e: number) => {
      this.loadingBar.setPer(e)
    })

    this.load.pack("asset-pack", "assets/asset-pack.json")

    this.load.audio('menu-selection', 'assets/audios/menu-selection.wav')
    this.load.audio('menu-bgm', 'assets/audios/menu-bgm.mp3')


    for (let i in levels) {
      const _ = <LevelConfig>levels[i]
      this.load.audio(_.AUDIO_KEY, _.AUDIO_FILE_PATH)
    }

    this.sound.pauseOnBlur = false
  }

  create() {
    this.loadingBar.setVisible(false)
    this.scene.start(START_SCENE)
  }
}
