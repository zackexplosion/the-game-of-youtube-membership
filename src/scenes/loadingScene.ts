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

    this.load.pack("asset-pack", "src/assets/asset-pack.json")

    this.load.image('player', 'assets/zack2_80.png')
    this.load.image('playerBullet', 'assets/bullet.png')
    this.load.image('ebulletA', 'assets/ebullet_a.png')
    this.load.image('ebulletB', 'assets/ebullet_b.png')
    this.load.image('hand-click', 'assets/hand-click.png')

    this.load.audio('playerFireSFX', 'assets/sfx_laserfire.ogg')
    this.load.audio('playerDie', 'assets/player_die.mp3')
    this.load.audio('explosion', 'assets/player_hitten.mp3')
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
