import People from "./People"
import settings from "@/gamedata/settings"
import LevelScene from '@/scenes/LevelScene'

class Button {
  keys
  constructor(keys = <any>[]){
    this.keys = keys
  }

  isDown() {
    var isDown = false
    this.keys.forEach(k => {
      if(k.isDown === true) isDown = true
    })
    return isDown
  }
}
export default class Player extends People {
  hp: number = settings.PLAYER_MAX_HP
  lastTimeFired: number
  private controllerKeys: any
  fireInterval: Phaser.Time.TimerEvent
  fireButton: Button
  moveUpButton: Button
  moveDownButton: Button
  moveLeftButton: Button
  moveRightButton: Button
  constructor(
    scene: LevelScene,
    x: number,
    y: number,
    texture?
  ) {
    super(scene, 'player', x, y)
    this.fireButton = new Button([
      scene.input.activePointer,
      scene.input.keyboard.addKey('SPACE')
    ])

    this.moveUpButton = new Button([
      scene.input.keyboard.addKey('W'),
      scene.input.keyboard.addKey('UP')
    ])

    this.moveDownButton = new Button([
      scene.input.keyboard.addKey('S'),
      scene.input.keyboard.addKey('DOWN')
    ])

    this.moveLeftButton = new Button([
      scene.input.keyboard.addKey('A'),
      scene.input.keyboard.addKey('LEFT')
    ])

    this.moveRightButton = new Button([
      scene.input.keyboard.addKey('D'),
      scene.input.keyboard.addKey('RIGHT')
    ])

    this.scene.physics.add.existing(this)
    this.body.setCollideWorldBounds(true)

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

  controlMovement(){
    const player = this

    var moveDirection: number = -1
    // movement control
    if (this.moveUpButton.isDown()) {
      moveDirection = 270
    } else if (this.moveDownButton.isDown()) {
      moveDirection = 90
    } else if (this.moveLeftButton.isDown()) {
      moveDirection = 180
    } else if (this.moveRightButton.isDown()) {
      moveDirection = 0
    }

    if (this.moveRightButton.isDown() && this.moveUpButton.isDown()) {
      moveDirection = 315
    } else if(this.moveRightButton.isDown() && this.moveDownButton.isDown()) {
      moveDirection = 45
    } else if(this.moveLeftButton.isDown() && this.moveUpButton.isDown()) {
      moveDirection = 225
    } else if(this.moveLeftButton.isDown() && this.moveDownButton.isDown()) {
      moveDirection = 135
    }

    if(moveDirection !== -1) {
      var rad = Phaser.Math.DegToRad(moveDirection)
      const v = this.scene.physics.velocityFromRotation(rad, settings.PLAYER_MOVE_SPEED)
      player.setVelocity(v.x, v.y)
    } else {
      player.setVelocity(0, 0)
    }

  }

  update(time: number, delta: number) {
    super.update(time, delta)
    const key = this.controllerKeys
    // fire control
    // var pointer = this.scene.input.activePointer
    if (this.fireButton.isDown()) {
      if (time - this.lastTimeFired < settings.PLAYER_FIRE_DELAY) return
      this.fire()
      this.lastTimeFired = time
    }

    this.controlMovement()

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