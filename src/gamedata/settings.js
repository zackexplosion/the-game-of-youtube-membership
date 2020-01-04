import MainScene from 'scripts/scenes/mainScene'
import PreloadScene from 'scripts/scenes/preloadScene'
import EndScene from 'scripts/scenes/endScene'
const DEFAULT_WIDTH = window.innerWidth
const DEFAULT_HEIGHT = window.innerHeight
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
        debug: true,
        gravity: { y: 0 }
      }
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
  PLAYER_FIRE_DELAY: 200,
  PLAYER_MOVE_SPEED: 150,
  SPONSORS_ROTATE_SPEED: -0.05,
  PEOPLE_SIZE: 40,
  SPONSORS_RADIUS: 50
}

window.STYLES = {
  DEFAULT_TEXT_COLOR: '#FFFFFF'
}

export default settings