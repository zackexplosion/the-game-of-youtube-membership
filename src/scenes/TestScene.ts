import Enemy from '../objects/enemy'
import settings from '@/gamedata/settings'

const createBullet = (scene, e) => {
  const _createBullet = (direction: number, key = 'ebulletA') => {
    const fireBullet = (delay = 700) => {
      const b = scene.physics.add.sprite(0, 0, key)
      b.x = e.x
      b.y = e.y
      b.scacle = 0.1

      const { E_BULLET_SPEED } = settings

      var p: number = 0
      const SPEED_SHIFTER: number = 1.5
      setInterval(function () {
        var vx: number, vy: number
        switch (direction) {
          case 0: // right top
            vx = E_BULLET_SPEED + p * SPEED_SHIFTER
            vy = -E_BULLET_SPEED
            break
          case 1: // right bottom
            vx = E_BULLET_SPEED
            vy = E_BULLET_SPEED + p * SPEED_SHIFTER
            break
          case 2: // left bottom
            vx = -E_BULLET_SPEED - p * SPEED_SHIFTER
            vy = E_BULLET_SPEED
            break
          case 3: // left top
            vx = -E_BULLET_SPEED
            vy = -E_BULLET_SPEED - p * SPEED_SHIFTER
            break
          default:
            vx = E_BULLET_SPEED
            vy = E_BULLET_SPEED
            break
        }

        b.setVelocity(vx, vy)
        p = p + 2
      }, 50)
      // grid.placeAtIndex(60, b)
      // scene.time.
    }

    fireBullet()
  }

  _createBullet(0, 'ebulletA')
  _createBullet(1, 'ebulletB')
  _createBullet(2, 'ebulletA')
  _createBullet(3, 'ebulletB')
}

export default class TestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene' })
  }

  create(): void {
    const grid = new window.Utils.AlignGrid({ scene: this })
    if (settings.DEBUG) {
      grid.showNumbers()
    }

    const e = new Enemy(this)
    createBullet(this, e)
    grid.placeAtIndex(61, e)

    // for (let i = 0; i < 4; i++) {
    //   const b = this.physics.add.sprite(0, 0, 'ebulletA')
    //   b.scacle = 0.2
    //   b.x = e.x
    //   b.y = e.y

    //   const { E_BULLET_SPEED } = settings

    //   var p = 0
    //   setInterval(function () {
    //     const vx = E_BULLET_SPEED * 1 + p
    //     const vy = E_BULLET_SPEED * 1 + p
    //     b.body.setVelocity(vx, vy)
    //     p++
    //   }, 100)
    //   grid.placeAtIndex(60, b)
    // }

    //   this.ebullet_group_a = this.physics.add.group({
    //     key: 'ebulletA',
    //     frameQuantity: 20
    //   })

    //   const { E_BULLET_SPEED } = settings
    //   this.ebullet_group_a.children.iterate(c => {
    //     c.x = e.x
    //     c.y = e.y
    //     c.scale = 0.3
    //     var vx = Phaser.Math.Between(-E_BULLET_SPEED, E_BULLET_SPEED)
    //     var vy = Phaser.Math.Between(-E_BULLET_SPEED, E_BULLET_SPEED)
    //     c.body.setVelocity(vx, vy)
    //   })
  }

  update(time, delta): void {}
}
