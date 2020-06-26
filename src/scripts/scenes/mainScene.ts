import moment from 'moment'
import People from '@/scripts/objects/People'
import FpsText from '@/scripts/objects/fpsText'
import MusicManager from '@/scripts/objects/musicManager'
import MessageBox from '@/scripts/objects/messageBox'
import playerController from '@/scripts/helpers/playerController'
import rotateSponsors from '@/scripts/helpers/rotateSponsors'
import removeOutOfBoundsBullets from '@/scripts/helpers/removeOutOfBoundsBullets'
import Enemy from '@/scripts/objects/enemy'
// import enemy
const { settings, model, Utils } = window
export default class MainScene extends Phaser.Scene {
  fpsText
  music
  player
  sponsors
  grid
  activeSponsors = 0
  maxActiveEnemies = 2
  playerControlerKeys
  enemyGropup
  enemy
  ebullet_group_b
  ebullet_group_a
  bulletGroup
  soundManager
  messageBox

  constructor() {
    super({ key: 'MainScene' })
  }

  setupPlayer() {
    const { settings } = window
    this.player = new People(this, 'player')
    this.playerControlerKeys = this.input.keyboard.addKeys({
      up: settings.PLAYER_CONTROL_KEYS.up,
      down: settings.PLAYER_CONTROL_KEYS.down,
      left: settings.PLAYER_CONTROL_KEYS.left,
      right: settings.PLAYER_CONTROL_KEYS.right,
      fire: 'space',
    })
    this.player.hp = settings.PLAYER_MAX_HP

    this.grid.placeAtIndex(settings.PLYAER_INIT_POSITION, this.player)

    // tracking pointer position and roate player and sponsors
    this.input.on('pointermove', (pointer) => {
      const { player } = this
      const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y)
      player.rotation = angle
      this.sponsors.getChildren().forEach((c) => {
        c.rotation = angle
      })
    })
  }

  playerFire() {
    this.player.fire()
    this.sponsors.getChildren().forEach((c) => {
      c.fire()
    })
  }

  bulletHitEnemy(enemy, bullet) {
    bullet.destroy()
    enemy.gotHit()

    if (enemy.hp <= 0) {
      enemy.destroy()
    }

    // TODO
    // change enemy showing logic
    if (enemy.hpPercent <= 0.2 && this.enemyGropup.getLength() < 2) {
      this.buildEnemy()
    }
  }

  // e bullet a can be destory, b yet
  bulletHitEnemyBulletA(ebulletA, bullet) {
    ebulletA.destroy()
    bullet.destroy()
  }

  ebulletHitPlayer(player: People, ebullet) {
    ebullet.destroy()
    player.gotHit()
    if (player.hp <= 0) {
      this.scene.start('EndScene')
    }
  }

  buildEnemy() {
    const e = new Enemy(this)
    const index = Phaser.Math.Between(11, 76)
    this.grid.placeAtIndex(index, e)
    this.enemy = e
    this.physics.add.collider(this.bulletGroup, this.enemy, this.bulletHitEnemy, undefined, this)
    this.ebullet_group_a = this.physics.add.group({
      key: 'ebulletA',
      frameQuantity: 200,
    })
    const { E_BULLET_SPEED } = window.settings
    this.ebullet_group_a.children.iterate((c) => {
      c.x = e.x
      c.y = e.y
      c.scale = 0.3
      var vx = Phaser.Math.Between(-E_BULLET_SPEED, E_BULLET_SPEED)
      var vy = Phaser.Math.Between(-E_BULLET_SPEED, E_BULLET_SPEED)
      c.body.setVelocity(vx, vy)
    })
    this.physics.add.collider(this.bulletGroup, this.ebullet_group_a, this.bulletHitEnemyBulletA, undefined, this)

    this.ebullet_group_b = this.physics.add.group({
      key: 'ebulletB',
      frameQuantity: 200,
    })
    this.ebullet_group_b.children.iterate((c) => {
      c.x = e.x
      c.y = e.y
      c.scale = 0.3
      var vx = Phaser.Math.Between(-E_BULLET_SPEED, E_BULLET_SPEED)
      var vy = Phaser.Math.Between(-E_BULLET_SPEED, E_BULLET_SPEED)
      c.body.setVelocity(vx, vy)
    })

    this.physics.add.collider(this.player, this.ebullet_group_a, this.ebulletHitPlayer, undefined, this)
    this.physics.add.collider(this.player, this.ebullet_group_b, this.ebulletHitPlayer, undefined, this)
    this.enemyGropup.add(e)
  }

  startGame() {
    const { settings } = window
    this.music.play()
    this.music.on('play', (e) => {
      // window.loadingText.destroy()
    })

    this.music.on('sponsorJoin', (e) => {
      this.player.hp = settings.PLAYER_MAX_HP
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

    this.music.on('endShowSponsors', (e) => {
      this.cameras.main.once('camerafadeoutcomplete', (camera) => {
        this.scene.start('EndScene')
      })

      this.cameras.main.fadeOut(4000)
    })
  }

  create() {
    this.soundManager = new window.Utils.SoundManager({ scene: this })
    const grid = new window.Utils.AlignGrid({ scene: this })
    if (window.settings.DEBUG) {
      grid.showNumbers()
      this.fpsText = new FpsText(this)
    }
    this.grid = grid

    this.messageBox = new MessageBox(this)
    this.music = new MusicManager(this)
    this.setupPlayer()

    this.bulletGroup = this.physics.add.group({
      removeCallback: (g) => {
        console.log(g, 'removed')
      },
    })

    this.enemyGropup = this.add.group()
    this.buildEnemy()
    this.sponsors = this.add.group({
      removeCallback: (g) => {
        console.log('removed', g.name)
      },
    })
    this.startGame()

    // check bullets
    this.time.addEvent({
      delay: 1000, // ms
      callback: removeOutOfBoundsBullets,
      callbackScope: this,
      loop: true,
    })
  }

  update(time, delta) {
    if (window.settings.DEBUG) {
      this.fpsText.update()
    }

    this.music.update(time, delta)

    playerController.call(this, time, delta)
    rotateSponsors.call(this, time, delta)
  }
}
