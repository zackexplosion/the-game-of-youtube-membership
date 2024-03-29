import SoundManager from '@/utils/SoundManager'
import removeOutOfBoundsBullets from '@/helpers/removeOutOfBoundsBullets'
import spawnEnermy from '@/helpers/spawnEnermy'
import Player from '../objects/Player'
import Enemy from '@/objects/Enemy'
import MusicSeeker from '@/utils/MusicSeeker'
const TAG = 'DebugObjsLevel'


export default class LevelScene extends Phaser.Scene {
  bgm
  player: Player
  playerBulletGroup: Phaser.Physics.Arcade.Group
  ebulletGroupA: Phaser.Physics.Arcade.Group
  ebullet_group_b: Phaser.Physics.Arcade.Group
  enemies: Array<Enemy>
  config: LevelConfig
  soundManager: SoundManager
  spawaning: boolean = false
  seeker
  constructor(key: string) {
    super('LevelScene')
  }

  init(config: LevelConfig) {
    this.config = config
    this.playerBulletGroup = this.physics.add.group({
      removeCallback: (g) => {
        // console.log(g, 'removed')
      },
    })
    this.ebulletGroupA = this.physics.add.group()

  }

  // run after level create
  create() {
    this.player = new Player(this,
      <number>this.game.config.width / 2,
      <number>this.game.config.height / 2,
    )
    // bullet colloctor
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
    // console.log(TAG, config)
    const soundManager = new SoundManager(this)
    soundManager.setMainMusic(this.sound.add('main-music'))

    soundManager.mainMusic.on('complete', () => {
      this.scene.start('ThanksScene')
      // console.log('finish :)')
    })
    this.soundManager = soundManager
    soundManager.playMainMusic()

    spawnEnermy.call(this, 1)
    // console.log('config', this.config)

    let E_SPAWN_INTERVAL = 5000
    switch(this.config.CLASS) {
      case 'LevelEasy':
        E_SPAWN_INTERVAL = 3000
      break
      case 'LevelNormal':
        E_SPAWN_INTERVAL = 2000
      break
      case 'LevelHard':
        E_SPAWN_INTERVAL = 1000
      break
    }
    this.time.addEvent({
      delay: E_SPAWN_INTERVAL, // ms
      callback: spawnEnermy,
      callbackScope: <LevelScene>this,
      loop: true,
    })


    // this.soundManager.mainMusic.addListener('timeupdate', e => {
    //   console.log(e)
    // })

    // this.createMusicSeeker()
  }

  createMusicSeeker() {
    this.time.addEvent({
      delay: 1000, // ms
      callback: () => {
        // @ts-ignore
        const seek = Math.round(soundManager.mainMusic.seek)

        switch(seek) {
          case 140:
            // @ts-ignore
            soundManager.changeMainMusic(this.sound.add('main-music2'), soundManager.mainMusic.seek)
            break
        }

        if(this.seeker) {
          this.seeker.set(seek)
        }
      },
      loop: true,
    })
    this.seeker = new MusicSeeker(this)
  }

  update(time: number, delta: number) {
    this.player.update(time, delta)
    const music = this.soundManager.mainMusic
    //@ts-ignore
    // this.seeker.value = music.seek
    // const seek = music.seek.toFixed(1)
    // // console.log('music.seek', seek)
    // //@ts-ignore
    // const spawan = (parseInt(seek) % 5) === 0 && seek > 5
    // console.log(parseInt(seek))
    // if(spawan) {
    //   this.spawaning = true
    //   console.log('spwan enermy')
    // }
    // // this.enemies.forEach((e) => {
    // //   if (seek * 100 > Math.abs(e.y) && !e.waken) {
    // //     e.wakeUp()
    // //   }
    // // })
  }
}
