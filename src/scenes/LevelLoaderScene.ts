import LevelEasy from '@/levels/LevelEasy'
import LoadingBar from '@/objects/loadingBar'

export default class LevelLoaderScene extends Phaser.Scene {
  config: LevelConfig
  levelToLoad: any
  loadingBar: LoadingBar
  constructor() {
    super('LevelLoaderScene')
  }

  init(config: LevelConfig) {
    this.config = config
  }

  preload() {
    this.loadingBar = new LoadingBar({ scene: this })

    this.load.on('progress', (e: number) => {
      this.loadingBar.setPer(e)
    })

    const { config } = this

    this.load.audio('BGM', config.MUSIC_FILE_PATH)
    console.log('loading')
    switch (config.CLASS) {
      case 'LevelEasy':
        this.levelToLoad = LevelEasy
        break
      case 'LevelNormal':
        this.levelToLoad = LevelEasy
        break
      case 'LevelHard':
        this.levelToLoad = LevelEasy
        break
    }

    this.game.scene.add(config.CLASS, this.levelToLoad)
  }

  create() {
    const { config } = this
    this.scene.start(config.CLASS)
  }
}