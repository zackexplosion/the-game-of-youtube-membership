import 'phaser'
// import '@babel/polyfill'

import Utils from './utils'
import moment from 'moment'

import settings from '@/gamedata/settings'
import gameConfig from '@/gamedata/gameconfig'

// inject Utils to global
window.Utils = Utils
moment.defaultFormat = 'YYYY/MM/DD HH:mm:ss'

class Model {
  private _currentMusic
  private _maxActiveSponsors
  constructor() {
    // random choose music
    const { AVAIABLE_MUSICS } = settings
    this.currentMusic = AVAIABLE_MUSICS[Phaser.Math.Between(0, AVAIABLE_MUSICS.length - 1)]

    // setup default
    this.maxActiveSponsors = 6
  }

  get soundOn() {
    return true
  }

  set currentMusic(val) {
    const [key, showSponsorsAt, endShowSponsorAt] = val
    this._currentMusic = {
      key,
      showSponsorsAt,
      endShowSponsorAt,
    }
  }

  get currentMusic() {
    return this._currentMusic
  }

  set maxActiveSponsors(val) {
    if (val >= 6) {
      val = 6
    }
    this._maxActiveSponsors = val - 1
  }

  get maxActiveSponsors() {
    return this._maxActiveSponsors
  }
}
window.emitter = new Phaser.Events.EventEmitter()
window.model = new Model()

window.addEventListener('load', () => {
  window.game = new Phaser.Game(gameConfig)
})

window.addEventListener('resize', () => {
  window.game.scale.resize(window.innerWidth, window.innerHeight)
})
