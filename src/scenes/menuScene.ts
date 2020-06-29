import _menuScene from '@/scenes-ui/menuScene'
import OrientationChecker from '@/helpers/OrientationChecker'
export default class menuScene extends _menuScene {
  // private controlerKeys
  private difficult_array: Array<Phaser.GameObjects.Text> = []
  private current_difficult_index: number = 0
  orientationChecker: OrientationChecker
  // private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys
  create() {
    super.create()

    this.difficult_array.push(this._difficults_easy)
    this.difficult_array.push(this._difficults_normal)
    this.difficult_array.push(this._difficults_hard)

    this.difficult_array.forEach(_ => {
      _
        .setInteractive()
        .on('pointerup', (e) => {
          this.menuChange(_)
        })
    })

    this.input.keyboard.on('keydown-W', () => this.preMenu())
    this.input.keyboard.on('keydown-UP', () => this.preMenu())


    this.input.keyboard.on('keydown-S', () => this.nextMenu())
    this.input.keyboard.on('keydown-DOWN', () => this.nextMenu())

    this.input.keyboard.on('keydown-SPACE', () => this.startGame())
    this.input.keyboard.on('keydown-ENTER', () => this.startGame())


    const backgroundSound = this.sound.add('menu-bgm', {
      loop: true
    })
    if (!backgroundSound.isPlaying) {
      backgroundSound.play()
    }

    this.game.events.addListener(Phaser.Core.Events.BLUR, () => {
      console.log('blur')
    })

    this.game.events.addListener(Phaser.Core.Events.FOCUS, () => {
      console.log('focus')
    })

    this.orientationChecker = new OrientationChecker(this)



  }
  private startGame() {
    console.log('start level', this.current_difficult_index)
  }


  // private setCursorY(y: number) {
  //   this.cursor.y = y
  // }

  private preMenu() {
    let pre_index = --this.current_difficult_index
    if (pre_index < 0) {
      this.current_difficult_index = pre_index = this.difficult_array.length - 1
    }
    this.menuChange(this.difficult_array[pre_index])
  }

  private nextMenu() {
    let next_index = ++this.current_difficult_index
    if (next_index >= this.difficult_array.length) {
      this.current_difficult_index = next_index = 0
    }

    this.menuChange(this.difficult_array[next_index])
  }

  private menuChange(difficult: Phaser.GameObjects.Text) {
    this.cursor.y = difficult.y
    this.sound.add('menu-selection').play()
    // sound.play(config)
    // window.emitter.emit('PLAY_SOUND', 'menu-selection')
  }
}

