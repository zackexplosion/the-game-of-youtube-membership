import SoundManager from '@/utils/SoundManager'
import removeOutOfBoundsBullets from '@/helpers/removeOutOfBoundsBullets'
import Player from '../objects/Player'
import Enemy from '@/objects/Enemy'
import { GAME_WIDTH, GAME_HEIGHT } from '@/gamedata/consts'
import PlayerBullet from '@/objects/playerBullet'
const TAG = 'DebugObjsLevel'
export default class LevelScene extends Phaser.Scene {
  bgm
  player: Player
  playerBulletGroup: Phaser.Physics.Arcade.Group
  ebulletGroupA: Phaser.Physics.Arcade.Group
  ebullet_group_b: Phaser.Physics.Arcade.Group
  enemies: Array<Enemy>
  config: LevelConfig
  keys
  constructor(key: string) {
    super('LevelScene')
    // this.game.config.physics.arcade?.debug = false
  }

  init(config: LevelConfig) {
    this.config = config
    this.playerBulletGroup = this.physics.add.group({
      removeCallback: (g) => {
        // console.log(g, 'removed')
      },
    })
    this.ebulletGroupA = this.physics.add.group()
    console.log(TAG, config)
    const soundManager = new SoundManager(this)
    soundManager.setMainMusic(this.sound.add('main-music'))
    soundManager.playMainMusic()
  }

  // run after level create
  create() {
    // this.cameras.main.startFollow(this.player)
    this.player = new Player(this, GAME_WIDTH / 2, GAME_HEIGHT / 2)
    const {x ,y } = this.player
    new PlayerBullet(this, x, y)
    this.time.addEvent({
      delay: 1000, // ms
      callback: removeOutOfBoundsBullets,
      callbackScope: <LevelScene>this,
      loop: true,
    })

    window.emitter.on('PLAYER_DIE', () => {
      this.scene.start('EndScene')
    })

    // this.enemies.forEach((e) => {
    //   if (e.y > 0) {
    //     e.wakeUp()
    //   }
    // })
    this.keys = this.input.keyboard.createCursorKeys()
  }

  update(time: number, delta: number) {
    // console.log(time)
    if(this.player) {
      this.player.update(time, delta)
      // this.player.fire()
      // this.player.cc.bind(this.player)
    }
    // if(this.keys && this.keys.space.isDown) {
    //   const {x ,y } = this.player
    //   new PlayerBullet(this, x, y)
    // }
  }


  //   // this.game.debug.cameraInfo(this.game.camera, 32, 32);
  //   // this.cameras.main.y = this.cameras.main.y + 1
  // }
}
