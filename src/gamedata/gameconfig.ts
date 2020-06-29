import MenuScene from '@/scenes/menuScene'
import MainScene from '@/scenes/mainScene'
import LoadingScene from '@/scenes/LoadingScene'
import EndScene from '@/scenes/endScene'
import TestScene from '@/scenes/TestScene'
import PauseScene from '@/scenes-ui/PauseScene'

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#333',
  // autoFocus: true,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    // mode: Phaser.DOM.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // width: DEFAULT_WIDTH,
    // height: DEFAULT_HEIGHT,
    width: 1920,
    height: 1080,
  },
  scene: [
    LoadingScene,
    PauseScene,
    MenuScene,
    MainScene,
    EndScene,
    TestScene
  ],
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
