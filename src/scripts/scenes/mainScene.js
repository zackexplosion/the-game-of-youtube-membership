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
    this.fpsText = new FpsText(this)
    this.messageBox = new MessageBox(this)
    /**
     * Delete all the code below to start a fresh scene
     */
    this.music = new MusicManager(this)

    this.group = this.physics.add.group({
      bounceX: 1,
      bounceY: 1,
      collideWorldBounds: true
    })
    this.physics.add.collider(this.group, this.group)

    this.player = new People(this, Phaser.Math.Between(0, this.cameras.main.width), 0, 'player')

    this.group.add(this.player)

    if (this.sound.locked) {
      var text = this.add.bitmapText(400, 50, 'atari-classic', 'Tap to start', 40)
      text.x -= Math.round(text.width / 2)
      text.y -= Math.round(text.height / 2)

      this.sound.once('unlocked', function (soundManager) {
        text.visible = false
        this.playMusic()
      }, this)
    } else {
      this.playMusic()
    }
  }

  playMusic () {
    this.music.on('play', e => {
      this.startGame()
    })

    this.music.on('sponsorJoin', e => {
      const [name, channelUrl, profileUrl, joinSince] = e

      const { width } = this.cameras.main
      // const s = sponsors[index]
      // TODO
      // to around main player
      const x = Phaser.Math.Between(0, width)
      const p = new People(this, x, 0, 'memberProfile_' + this.activeSponsers.length)
      this.activeSponsers.push(p)
      this.messageBox.add(`${moment(joinSince).format()} ${name} 加入了戰鬥`)
    })

    this.music.play()
  }

  startGame () {
    // new PhaserLogo(this, this.cameras.main.width / 2, 0)

    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24
      })
      .setOrigin(1, 0)
  }

  update (time, delta) {
    this.fpsText.update()
    this.music.update(time, delta)
  }
}
