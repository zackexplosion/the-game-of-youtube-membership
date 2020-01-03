import People from '../objects/People'
import FpsText from '../objects/fpsText'
import MusicManager from '../objects/musicManager'
import MessageBox from '../objects/messageBox'
import moment from 'moment'

export default class MainScene extends Phaser.Scene {
  fpsText
  music
  player
  activeSponsers = []
  group
  constructor () {
    super({ key: 'MainScene' })
  }

  create () {
    if (this.game.settings.DEBUG) {
      this.fpsText = new FpsText(this)
    }

    this.messageBox = new MessageBox(this)
    /**
     * Delete all the code below to start a fresh scene
     */
    this.music = new MusicManager(this)

    // this.group = this.physics.add.group({
    //   bounceX: 1,
    //   bounceY: 1,
    //   collideWorldBounds: true
    // })
    // this.physics.add.collider(this.group, this.group)

    this.player = new People(this, 0, 0, 'player')
    this.player.x = this.game.config.width / 2
    this.player.y = this.game.config.height / 2

    // this.player = this.impact.add.sprite(400, 200, 'player').setDepth(1)
    // this.player.setMaxVelocity(1000).setFriction(800, 600).setPassiveCollision()

    // Enables movement of player with WASD keys
    var chunk = 10
    this.input.keyboard.on('keydown_W', (event) => {
      // var a = this.player
      // this.player.setAccelerationY(200)
      // debugger

      this.player.y = this.player.y - chunk
    })
    this.input.keyboard.on('keydown_S', (event) => {
      this.player.setAccelerationY(200)
    })
    this.input.keyboard.on('keyup_S', (event) => {
      this.player.setAccelerationY(0)
    })
    this.input.keyboard.on('keydown_A', (event) => {
      this.player.setAccelerationX(-200)
    })
    this.input.keyboard.on('keyup_A', (event) => {
      this.player.setAccelerationX(0)
    })
    this.input.keyboard.on('keydown_D', (event) => {
      this.player.setAccelerationX(200)
    })

    // this.group.add(this.player)

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
      window.loadingText.destroy()
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

    // this.add
    //   .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
    //     color: '#000000',
    //     fontSize: 24
    //   })
    //   .setOrigin(1, 0)
  }

  update (time, delta) {
    if (this.game.settings.DEBUG) {
      this.fpsText.update()
    }

    this.music.update(time, delta)
  }
}
