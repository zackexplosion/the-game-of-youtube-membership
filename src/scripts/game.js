import 'phaser'
import '@babel/polyfill'

import Utils from './utils'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import EndScene from './scenes/endScene'
import moment from 'moment'

import settings from '../gamedata/settings'
// inject Utils to global
window.Utils = Utils
moment.defaultFormat = 'YYYY/MM/DD HH:mm:ss'

const DEFAULT_WIDTH = window.innerWidth
const DEFAULT_HEIGHT = window.innerHeight

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#333',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene, EndScene],
  physics: {
    default: 'arcade',
    // default: 'impact',
    impact: {
      setBounds: {
        x: 0,
        y: 0,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        thickness: 32
      }
    },
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  }
}

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
}

window.addEventListener('load', () => {
  window.game = new Phaser.Game(config)
})

window.settings = settings
window.model = new Model()
window.emitter = new Phaser.Events.EventEmitter()
