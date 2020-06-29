const START_SCENE = 'menuScene'
// const START_SCENE = 'TestScene'
import LoadingBar from '@/objects/loadingBar'
import OrientationChecker from '@/helpers/OrientationChecker'

import CONSTS from '@/utils/Consts'

export default class LoadingScene extends Phaser.Scene {
  music
  private loadingBar: LoadingBar
  orientationChecker: OrientationChecker
  constructor() {
    super({ key: 'PreloadScene' })
  }

  init(config): void {
    // console.log(config)
  }

  preload(): void {
    this.loadingBar = new LoadingBar({ scene: this })

    this.load.on('progress', (e) => {
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


    for (let i in CONSTS.LEVEL_DIFFICULTS) {
      const _ = <LevelConfig>CONSTS.LEVEL_DIFFICULTS[i]
      this.load.audio(_.AUDIO_KEY, _.AUDIO_FILE_PATH)
    }

    // this.load.audio('playerFireSFX', 'assets/laser.ogg')
    // loading music
    const { key, showSponsorsAt, endShowSponsorAt } = window.model.currentMusic
    this.load.audio('music', 'assets/' + key, {
      showSponsorsAt,
      endShowSponsorAt,
    })

    this.sound.pauseOnBlur = false
  }

  create(): void {
    this.loadingBar.setVisible(false)
    this.scene.start(START_SCENE)


    // // check devise orientation on not desktop device
    // if (this.orientationChecker.isMobilePortrait()) {
    //   handClick.setVisible(false)
    // }

    // this.orientationChecker.onOrientationchange((isValid: boolean) => {
    //   handClick.setVisible(isValid)
    // })


  }
}
