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
    this.makeBullet(this.player.x, this.player.y)
    this.sponsors.getChildren().forEach(c => {
      console.log(c)
      this.makeBullet(c.x, c.y)
    })
    // this.sponsorsContainer.getAll().forEach(_ => {
    //   // this.makeBullet(c.x, c.y)
    // })
  }

  makeBullet (x, y) {
    const bullet = new PlayerBullet(this, x, y)
    this.bulletGroup.add(bullet)

    const { BULLET_SPEED } = settings
    const { tx, ty } = Phaser.Math.getDirFromAngle(this.player.angle)
    bullet.setVelocity(tx * BULLET_SPEED, ty * BULLET_SPEED)
  }

  bulletHitEnemy (enemy, bullet) {
    enemy.gotHit()
    if (enemy.hp === 0) {
      enemy.destroy()
      this.buildEnemy()
    }
    bullet.destroy()
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
    this.sponsors = this.add.group()
    this.sponsorsContainer = this.add.container(0, 0)

    for (let i = 0; i < 6; i++) {
      const c = this.add.container(0, 0)
      const p = this.add.image(0, 0, 'memberProfile_' + i)
      p.angle = 90
      c.add(p)
      // this.sponsorsContainer.add(c)
      this.sponsors.add(c)
    }

    // this.startGame()

    // Phaser.Actions.PlaceOnCircle(this.sponsorsContainer.getAll(), this.circle1)
    this.startGame()

    // this.sponsorsContainer.add(this.circle1)
  }

  startGame () {
    this.music.play()
    this.music.on('play', e => {
      // window.loadingText.destroy()
    })

    this.music.on('sponsorJoin', e => {
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
      // const s = sponsors[index]
      // TODO
      // to around main player
      const sIndex = this.activeSponsers.length
      // const p = new People(this, sIndex * 45, sIndex * 45, 'memberProfile_' + this.activeSponsers.length)
      // const p = this.add.image(90, 0, 'memberProfile_' + this.activeSponsers.length)
      // p.angle = 90
      // this.sponsors.add(p)
      // this.activeSponsers.push(p)
      this.messageBox.add(`${timestamp} ${name} 加入了戰鬥${note}`)
    })

    this.music.on('endShowSponsors', e => {
      this.cameras.main.once('camerafadeoutcomplete', (camera) => {
        this.scene.start('EndScene')
      })

      this.cameras.main.fadeOut(4000)
    })

    // this.music.play()
    this.startAngle = 0
    this.endAngle = 6.28
  }

  update (time, delta) {
    if (settings.DEBUG) {
      this.fpsText.update()
    }

    this.music.update(time, delta)

    playerController.call(this, time, delta)

    // rotate sponsors
    var circle = {
      x: this.player.x,
      y: this.player.y,
      radius: 90
    }

    this.startAngle += settings.SPONSORS_ROTATE_SPEED
    this.endAngle += settings.SPONSORS_ROTATE_SPEED

    if (this.startAngle >= 6.28) {
      this.startAngle = 0
      this.endAngle = 6.28
    }

    Phaser.Actions.PlaceOnCircle(this.sponsors.getChildren(), circle, this.startAngle, this.endAngle)
  }
}
