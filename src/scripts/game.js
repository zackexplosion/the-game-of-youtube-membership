import 'phaser'
import '@babel/polyfill'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import EndScene from './scenes/endScene'
import moment from 'moment'
moment.defaultFormat = 'YYYY/MM/DD HH:mm:ss'
const DEFAULT_WIDTH = 720
const DEFAULT_HEIGHT = 1280

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
  scene: [PreloadScene, MainScene, EndScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}
const avaiableMusics = [
  ['music-end.mp3', 81.3, 317],
  ['music-en.mp3', 27.1, 270],
  ['music-jp.mp3', 26, 280]
]
const settings = {
  DEBUG: process.env.DEBUG || false,
  avaiableMusics,
  currentMusic: avaiableMusics[Phaser.Math.Between(0, avaiableMusics.length - 1)]
  // currentMusic: avaiableMusics[2]
}

// console.log(settings)

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
  game.settings = settings
})
