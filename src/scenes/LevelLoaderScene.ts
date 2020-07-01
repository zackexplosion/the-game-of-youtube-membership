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

    this.load.image('player', 'assets/zack2_80.png')
    this.load.image('playerBullet', 'assets/bullet.png')
    this.load.image('ebulletA', 'assets/ebullet_a.png')
    this.load.image('ebulletB', 'assets/ebullet_b.png')
    this.load.audio('playerFireSFX', 'assets/sfx_laserfire.ogg')
    this.load.audio('playerDie', 'assets/player_die.mp3')
    this.load.audio('player-hitten', 'assets/audios/player-hitten.mp3')
    this.load.audio('e_destroy', 'assets/audios/e-destroy.wav')



    const { config } = this

    this.load.audio('main-music', config.MUSIC_FILE_PATH)
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
    this.cameras.main.once('camerafadeoutcomplete', (camera) => {
      this.scene.start(config.CLASS, config)
    })

    this.cameras.main.fadeOut(1000, 51, 51, 51)
  }
}