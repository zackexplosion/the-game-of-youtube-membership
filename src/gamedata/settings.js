import MainScene from 'scripts/scenes/mainScene'
import PreloadScene from 'scripts/scenes/preloadScene'
import EndScene from 'scripts/scenes/endScene'
// const DEFAULT_WIDTH = window.innerWidth
// const DEFAULT_HEIGHT = window.innerHeight

const DEFAULT_WIDTH = 1024
const DEFAULT_HEIGHT = 768

const settings = {
  gameConfig: {
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
        debug: process.env.PHYSIC_DEBUG || false,
        gravity: { y: 0 }
      }
    },
    plugins: {
      // global: [{
      //   key: 'rexShake',
      //   plugin: ShakePlugin,
      //   start: true
      // }
      // // ...
      // ]
    }
  },
  DEBUG: process.env.DEBUG || false,
  // DEBUG: false,
  AVAIABLE_MUSICS: [
    ['music-end.mp3', 81.3, 317],
    ['music-en.mp3', 27.1, 300],
    ['music-jp.mp3', 26, 280]
  ],
  PLAYER_CONTROL_KEYS: {
    up: 'W',
    down: 'S',
    left: 'A',
    right: 'D'
  },
  BULLET_SPEED: 350,
  PLAYER_FIRE_DELAY: 150,
  PLAYER_MOVE_SPEED: 250,
  SPONSORS_ROTATE_SPEED: -0.05,
  PEOPLE_SIZE: 30,
  SPONSORS_RADIUS: 40
}

window.STYLES = {
  DEFAULT_TEXT_COLOR: '#FFFFFF'
}

export default settings
