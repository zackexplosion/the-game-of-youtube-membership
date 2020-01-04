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
  group
  activeSponsorIndex = 0
  activeSponsors = 0
  startAngle = 0
  endAngle = Math.PI * 2
  constructor () {
    super({ key: 'MainScene' })
  }

  setupPlayer () {
    this.player = new People(this, 'player')
    this.playerControlerKeys = this.input.keyboard.addKeys({
      up: settings.PLAYER_CONTROL_KEYS.up,
      down: settings.PLAYER_CONTROL_KEYS.down,
      left: settings.PLAYER_CONTROL_KEYS.left,
      right: settings.PLAYER_CONTROL_KEYS.right,
      fire: 'space'
    })
    // Utils.Align.scaleToGameW(this.player, 0.075)
    // if (this.player.displayWidth > s) {
    //   this.player.displayWidth = s
    //   this.player.displayHeight = s
    // }

    this.grid.placeAtIndex(82, this.player)

    // roate player an sponsros
    this.input.on('pointermove', (pointer) => {
      const { player } = this
      const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y)
      // console.log(angle)
      // angle = Phaser.Math.RadToDeg(angle)
      // player.angle = angle
      player.rotation = angle
      this.sponsors.getChildren().forEach(c => {
        c.rotation = angle
      })

      // this.sponsorsContainer.getAll().forEach(c => {
      //   c.rotation = angle
      // })
    })
  }

  // setupEnemy () {

  // }

  playerFire () {
    var sound = this.sound.add('playerFireSFX')
    sound.play({
      volume: 0.4
    })
    this.makeBullet(this.player.x, this.player.y)
    this.sponsors.getChildren().forEach(c => {
      this.makeBullet(c.x, c.y)
    })
  }

  makeBullet (x, y) {
    const bullet = new PlayerBullet(this, x, y)
    this.bulletGroup.add(bullet)

    const { BULLET_SPEED } = settings
    const { tx, ty } = Phaser.Math.getDirFromAngle(this.player.angle)
    bullet.setVelocity(tx * BULLET_SPEED, ty * BULLET_SPEED)

    // if (model.soundOn == true) {

    // }
  }

  bulletHitEnemy (enemy, bullet) {
    bullet.destroy()
    enemy.gotHit()

    if (enemy.hp <= 0) {
      enemy.destroy()
      this.buildEnemy()
    }
  }

  buildEnemy () {
    const e = new Enemy(this)
    this.grid.placeAtIndex(Phaser.Math.Between(0, 32), e)
    this.enemy = e
    this.physics.add.collider(this.bulletGroup, this.enemy, this.bulletHitEnemy, null, this)
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

    this.bulletGroup = this.physics.add.group()
    this.buildEnemy()
    this.sponsors = this.add.group({
      removeCallback: (g) => {
        console.log('removed', g.name)
      }
    })
    this.startGame()
  }

  startGame () {
    this.music.play()
    this.music.on('play', e => {
      // window.loadingText.destroy()
    })

    this.music.on('sponsorJoin', e => {
      if (this.sponsors.getLength() > model.maxActiveSponsors) {
        this.sponsors.getChildren()[0].destroy()
      }
      const [name, channelUrl, profileUrl, joinSince, extra] = e

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
      this.messageBox.add(`${timestamp} ${name} 加入了戰鬥${note}`)

      const c = new People(this, 'memberProfile_' + this.activeSponsors)
      c.name = name

      this.sponsors.add(c)

      this.activeSponsors++
    })

    this.music.on('endShowSponsors', e => {
      this.cameras.main.once('camerafadeoutcomplete', (camera) => {
        this.scene.start('EndScene')
      })

      this.cameras.main.fadeOut(4000)
    })
  }

  rotateSponsors () {
    // rotate sponsors
    const { x, y } = this.player
    var circle = {
      x,
      y,
      radius: settings.SPONSORS_RADIUS
    }

    this.startAngle += settings.SPONSORS_ROTATE_SPEED
    this.endAngle += settings.SPONSORS_ROTATE_SPEED

    if (this.startAngle >= Math.PI * 2) {
      this.startAngle = 0
      this.endAngle = Math.PI * 2
    }

    Phaser.Actions.PlaceOnCircle(this.sponsors.getChildren(), circle, this.startAngle, this.endAngle)
  }

  update (time, delta) {
    if (settings.DEBUG) {
      this.fpsText.update()
    }

    this.music.update(time, delta)

    playerController.call(this, time, delta)
    this.rotateSponsors()
  }
}
