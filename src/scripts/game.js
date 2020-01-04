import 'phaser'
import '@babel/polyfill'

import Utils from './utils'
import moment from 'moment'

import settings from '../gamedata/settings'
// inject Utils to global
window.Utils = Utils
moment.defaultFormat = 'YYYY/MM/DD HH:mm:ss'

class Model {
  constructor () {
    const { AVAIABLE_MUSICS } = settings
    this.currentMusic = AVAIABLE_MUSICS[Phaser.Math.Between(0, AVAIABLE_MUSICS.length - 1)]
    this._maxActiveSponsors = 6
  }

  set currentMusic (val) {
    const [key, showSponsorsAt, endShowSponsorAt] = val
    this._currentMusic = {
      key, showSponsorsAt, endShowSponsorAt
    }
  }

  get currentMusic () {
    return this._currentMusic
  }

  set maxActiveSponsors (val) {
    if (val >= 6) { val = 6 }
    this._maxActiveSponsors = val - 1
    window.emitter('maxActiveSponsorsChange', val)
  }

  get maxActiveSponsors () {
    return this._maxActiveSponsors
  }
}

window.addEventListener('load', () => {
  window.game = new Phaser.Game(settings.gameConfig)
})

window.settings = settings
window.model = new Model()
window.emitter = new Phaser.Events.EventEmitter()
