import 'phaser'
import '@babel/polyfill'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import moment from 'moment'
moment.defaultFormat = 'YYYY/MM/DD HH:mm:ss'
const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720
window.DEBUG = true

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

class Model {
  FIRST_MEMBER_JOIN_DATE = ''
}
const model = new Model()

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
  game.yee = 'hello'
  game.globals = { model }
})
