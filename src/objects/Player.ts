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

function buttonCreater(scene: Phaser.Scene, keys = <any>[] ): Button {
  keys = keys.map(k => {
    if (typeof k === 'string') {
      return scene.input.keyboard.addKey(k)
    }

    return k
  })
  return new Button(keys)
}
interface ActionKeys {
  moveUp: Button
  moveDown: Button
  moveLeft: Button
  moveRight: Button
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
  actionKeys: ActionKeys
  constructor(
    scene: LevelScene,
    x: number,
    y: number,
    texture?
  ) {
    super(scene, 'player', x, y)
    this.fireButton = buttonCreater(scene, [
      scene.input.activePointer,
      'SPACE'
    ])

    // @ts-ignore
    this.actionKeys = {}
    Object.keys(settings.PLAYER_CONTROL_KEYS).forEach(k => {
      this.actionKeys[k] = buttonCreater(scene, settings.PLAYER_CONTROL_KEYS[k])
    })

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
    var aKeys = this.actionKeys
    var moveDirection: number = -1
    // movement control
    if (aKeys.moveUp.isDown()) {
      moveDirection = 270
    } else if (aKeys.moveDown.isDown()) {
      moveDirection = 90
    } else if (aKeys.moveLeft.isDown()) {
      moveDirection = 180
    } else if (aKeys.moveRight.isDown()) {
      moveDirection = 0
    }

    if (aKeys.moveRight.isDown() && aKeys.moveUp.isDown()) {
      moveDirection = 315
    } else if(aKeys.moveRight.isDown() && aKeys.moveDown.isDown()) {
      moveDirection = 45
    } else if(aKeys.moveLeft.isDown() && aKeys.moveUp.isDown()) {
      moveDirection = 225
    } else if(aKeys.moveLeft.isDown() && aKeys.moveDown.isDown()) {
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