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
  bulletGroup
  init(config: LevelConfig) {
    console.log(TAG, config)

    this.cameras.main.setBounds(0, 0, GAME_WIDTH * 100, GAME_HEIGHT)
  }
  create() {
    this.bgm = this.sound.add('BGM')
    this.bgm.play()
    new SoundManager(this)

    this.cameras.add(0, 0, GAME_WIDTH, GAME_HEIGHT)
  }

  update(time: number, delta: number) {
    this.player.update(time, delta)
  }
}