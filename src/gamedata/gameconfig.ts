import MainScene from '@/scenes/mainScene'
import PreloadScene from '@/scenes/preloadScene'
import EndScene from '@/scenes/endScene'
import TestScene from '@/scenes/TestScene'
const DEFAULT_WIDTH = window.innerWidth
const DEFAULT_HEIGHT = window.innerHeight

// const DEFAULT_WIDTH = 1024
// const DEFAULT_HEIGHT = 768
const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#333',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [PreloadScene, MainScene, EndScene, TestScene],
  physics: {
    default: 'arcade',
    arcade: {
      // debug: new Boolean(process.env.PHYSIC_DEBUG) || false,
      gravity: { y: 0 },
    },
  },
  plugins: {
    // global: [{
    //   key: 'rexShake',
    //   plugin: ShakePlugin,
    //   start: true
    // }
    // // ...
    // ]
  },
}

export default gameConfig
