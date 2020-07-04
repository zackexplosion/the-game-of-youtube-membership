import MenuScene from '@/scenes/menuScene'
// import MainScene from '@/scenes/mainScene'
import LoadingScene from '@/scenes/LoadingScene'
import EndScene from '@/scenes/endScene'
import LevelLoaderScene from '@/scenes/LevelLoaderScene'
// import LevelScene from '@/scenes/LevelScene'
import UIScene from '@/scenes/UIScene'
import TestScene from '@/scenes/TestScene'
import { GAME_WIDTH, GAME_HEIGHT } from '@/gamedata/consts'
const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#333',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  scene: [
    LoadingScene,
    MenuScene,
    UIScene,
    LevelLoaderScene,
    // LevelScene,
    EndScene,
    TestScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      // debug: new Boolean(process.env.PHYSIC_DEBUG) || false,
      // debug: true,
      debug: true,
      debugShowBody: true,
      debugShowStaticBody: true,
      debugShowVelocity: true,
      debugVelocityColor: 0xffff00,
      debugBodyColor: 0x0000ff,
      debugStaticBodyColor: 0xffffff,
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
