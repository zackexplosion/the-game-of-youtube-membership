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

    // this.cameras.add(0, 0, GAME_WIDTH, GAME_HEIGHT)


  }
  init(config: LevelConfig) {
    this.playerBulletGroup = this.physics.add.group({
      removeCallback: (g) => {
        // console.log(g, 'removed')
      },
    })
    console.log(TAG, config)

    this.cameras.main.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT)
    this.bgm = this.sound.add('BGM')
    this.bgm.play()
    new SoundManager(this)
  }
  // run after level create
  create() {

  }

  update(time: number, delta: number) {
    this.player.update(time, delta)
  }
}