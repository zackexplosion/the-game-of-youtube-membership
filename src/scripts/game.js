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
    this._maxActiveSponsors = val
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
