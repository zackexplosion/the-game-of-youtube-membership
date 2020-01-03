import 'phaser'
import '@babel/polyfill'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import EndScene from './scenes/endScene'
import moment from 'moment'
moment.defaultFormat = 'YYYY/MM/DD HH:mm:ss'
// const DEFAULT_WIDTH = 720
// const DEFAULT_HEIGHT = 1280

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
const avaiableMusics = [
  ['music-end.mp3', 81.3, 317],
  ['music-en.mp3', 27.1, 300],
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
