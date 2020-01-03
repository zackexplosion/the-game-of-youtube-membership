import People from '../objects/People'
import FpsText from '../objects/fpsText'
import MusicManager from '../objects/musicManager'
import MessageBox from '../objects/messageBox'
import moment from 'moment'
import playerController from '../helpers/playerController'
import Enemy from '../objects/enemy'
import PlayerBullet from '../objects/playerBullet'
// import enemy

export default class MainScene extends Phaser.Scene {
  fpsText
  music
  player
  activeSponsers = []
  group
  constructor () {
    super({ key: 'MainScene' })
  }

  setupPlayer () {
    this.player = new People(this, 0, 0, 'player')
    this.playerControlerKeys = this.input.keyboard.addKeys({
      up: settings.PLAYER_CONTROL_KEYS.up,
      down: settings.PLAYER_CONTROL_KEYS.down,
      left: settings.PLAYER_CONTROL_KEYS.left,
      right: settings.PLAYER_CONTROL_KEYS.right,
      fire: 'space'
    })

    Utils.Align.scaleToGameW(this.player, 0.125)
    if (this.player.displayWidth > 40) {
      this.player.displayWidth = 40
      this.player.displayHeight = 40
    }

    this.grid.placeAtIndex(82, this.player)

    this.input.on('pointermove', (pointer) => {
      const { player } = this
      const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y)
      // console.log(angle)
      // angle = Phaser.Math.RadToDeg(angle)
      // player.angle = angle
      player.rotation = angle
    })
  }

  // setupEnemy () {

  // }

  playerFire () {
    const bullet = new PlayerBullet(this)
    this.bulletGroup.add(bullet)
    const BULLET_SPEED = 100
    const { tx, ty } = Phaser.Math.getDirFromAngle(this.player.angle)
    bullet.setVelocity(tx * BULLET_SPEED, ty * BULLET_SPEED)
  }

  bulletHitEnemy (enemy, bullet) {
    enemy.gotHit()
    bullet.destroy()
  }

  create () {
    const grid = new Utils.AlignGrid({ scene: this })
    if (settings.DEBUG) {
      grid.showNumbers()
      this.fpsText = new FpsText(this)
    }
    this.grid = grid

    this.messageBox = new MessageBox(this)
    this.music = new MusicManager(this)
    this.setupPlayer()
    // this.setupEnemy()
    const e = new Enemy(this)

    this.grid.placeAtIndex(16, e)
    this.bulletGroup = this.physics.add.group()

    this.physics.add.collider(this.bulletGroup, e, this.bulletHitEnemy)
    // this.physics.set

    if (this.sound.locked) {
      var text = this.add.text(400, 50, 'Tap to start', 40)
      text.x -= Math.round(text.width / 2)
      text.y -= Math.round(text.height / 2)

      this.sound.once('unlocked', function (soundManager) {
        text.visible = false
        this.startGame()
      }, this)
    } else {
      this.startGame()
    }
  }

  startGame () {
    this.music.on('play', e => {
      // window.loadingText.destroy()
    })

    this.music.on('sponsorJoin', e => {
      const [name, channelUrl, profileUrl, joinSince, extra] = e

      const { width } = this.cameras.main
      var timestamp = moment(joinSince).format()
      var note = ''
      if (extra) {
        if (extra.older === true) {
          // timestamp = '????/??/?? ??:??:??'
          timestamp = '-- 以前加入的乾爹娘 --'
        }

        if (extra.note) {
          note = ', ' + extra.note
        }
      }
      // const s = sponsors[index]
      // TODO
      // to around main player
      const x = Phaser.Math.Between(0, width)
      const p = new People(this, x, 0, 'memberProfile_' + this.activeSponsers.length)
      this.activeSponsers.push(p)
      this.messageBox.add(`${timestamp} ${name} 加入了戰鬥${note}`)
    })

    this.music.on('endShowSponsors', e => {
      this.cameras.main.once('camerafadeoutcomplete', (camera) => {
        this.scene.start('EndScene')
      })

      this.cameras.main.fadeOut(4000)
    })

    // this.music.play()
  }

  update (time, delta) {
    if (settings.DEBUG) {
      this.fpsText.update()
    }

    this.music.update(time, delta)

    playerController.call(this, time, delta)
  }
}
