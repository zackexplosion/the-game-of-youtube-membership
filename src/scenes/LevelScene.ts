import SoundManager from "@/utils/SoundManager"
import {
  GAME_WIDTH,
  GAME_HEIGHT
} from '@/gamedata/consts'
import Player from "../objects/Player"
const TAG = 'DebugObjsLevel'
export default class Level extends Phaser.Scene {
  bgm
  player: Player
  playerBulletGroup

  constructor(key: string) {
    super(key)
  }

  init(config: LevelConfig) {
    this.playerBulletGroup = this.physics.add.group({
      removeCallback: (g) => {
        // console.log(g, 'removed')
      },
    })
    console.log(TAG, config)
    const soundManager = new SoundManager(this)
    soundManager.setMainMusic(this.sound.add('main-music'))
    soundManager.playMainMusic()
  }

  // run after level create
  create() {
    // this.cameras.main.startFollow(this.player)
  }

  update(time: number, delta: number) {
    this.player.update(time, delta)

    // this.game.debug.cameraInfo(this.game.camera, 32, 32);
    // this.cameras.main.y = this.cameras.main.y + 1
  }
}