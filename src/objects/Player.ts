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


    var moveDirection
    // movement control
    if (key.up.isDown) {
      moveDirection = 270
    } else if (key.down.isDown) {
      moveDirection = 90
    } else if (key.left.isDown) {
      moveDirection = 180
    } else if (key.right.isDown) {
      moveDirection = 0
    }

    if (key.right.isDown && key.up.isDown) {
      moveDirection = 315
    } else if(key.right.isDown && key.down.isDown) {
      moveDirection = 45
    } else if(key.left.isDown && key.up.isDown) {
      moveDirection = 225
    } else if(key.left.isDown && key.down.isDown) {
      moveDirection = 135
    }

    if(typeof moveDirection !== 'undefined') {
      var rad = Phaser.Math.DegToRad(moveDirection)
      const v = this.scene.physics.velocityFromRotation(rad, settings.PLAYER_MOVE_SPEED)
      player.setVelocity(v.x, v.y)
    } else {
      player.setVelocity(0, 0)
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

  hitten() {
    this.hp--
    console.log('player hitten', this.hp)
    const { emitter } = window
    if (this.hp > 0) {
      emitter.emit('PLAYER_HITTEN')
    } else {
      emitter.emit('PLAYER_DIE')
    }
  }
}