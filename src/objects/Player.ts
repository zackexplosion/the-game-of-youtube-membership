import People from "./People"
import settings from "@/gamedata/settings"
import LevelScene from '@/scenes/LevelScene'
export default class Player extends People {
  hp: number = settings.PLAYER_MAX_HP
  lastTimeFired: number
  private controllerKeys: any
  constructor(
    scene: LevelScene,
    x: number,
    y: number,
    texture?
  ) {
    super(scene, 'player')
    console.log('player created')
    this.scene.physics.add.existing(this)
    this.body.setCollideWorldBounds(true)
    const { up, down, left, right } = settings.PLAYER_CONTROL_KEYS
    this.controllerKeys = scene.input.keyboard.addKeys({
      up,
      down,
      left,
      right,
      fire: 'space',
    })

    this.x = x
    this.y = y


    // tracking pointer position and roate player and sponsors
    scene.input.on('pointermove', (pointer) => {
      // const { player } = this
      const player = this
      const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y)
      player.rotation = angle
      // this.sponsors.getChildren().forEach((c) => {
      //   c.rotation = angle
      // })
    })
  }

  update(time: number, delta: number): void {
    const player = this
    const key = this.controllerKeys
    player.setVelocity(0, 0)

    // movement control
    if (key.up.isDown) {
      player.setVelocityY(-settings.PLAYER_MOVE_SPEED)
    }
    if (key.down.isDown) {
      player.setVelocityY(settings.PLAYER_MOVE_SPEED)
    }
    if (key.left.isDown) {
      player.setVelocityX(-settings.PLAYER_MOVE_SPEED)
    }
    if (key.right.isDown) {
      player.setVelocityX(settings.PLAYER_MOVE_SPEED)
    }

    // fire control
    var pointer = this.scene.input.activePointer
    if (pointer.isDown || key.fire.isDown) {
      if (time - this.lastTimeFired < settings.PLAYER_FIRE_DELAY) return
      player.fire()
      this.lastTimeFired = time
    }
  }

  fire() {
    super.fire()
    window.emitter.emit('PLAYER_FIRE_SFX')
  }

  gotHit() {
    this.hp--
    const volume = 0.2
    if (this.hp > 0) {
      window.emitter.emit('PLAY_SOUND', 'explosion', { volume })
    } else {
      window.emitter.emit('PLAY_SOUND', 'playerDie', { volume })
    }
  }
}