import _menuScene from '@/scenes-ui/menuScene'
import settings from '@/gamedata/settings'

export default class menuScene extends _menuScene {
  private controlerKeys
  private difficult_array: Array<Phaser.GameObjects.Text> = []
  private current_difficult_index: number = 0
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys
  create() {
    super.create()

    const { up, down } = settings.PLAYER_CONTROL_KEYS
    this.controlerKeys = this.input.keyboard.addKeys({
      up,
      down,
    })

    this.difficult_array.push(this._difficults_easy)
    this.difficult_array.push(this._difficults_normal)
    this.difficult_array.push(this._difficults_hard)
    this.cursorKeys = this.input.keyboard.createCursorKeys()

    this.input.keyboard.on('keydown-W', () => this.preMenu())
    this.input.keyboard.on('keydown-UP', () => this.preMenu())


    this.input.keyboard.on('keydown-S', () => this.nextMenu())
    this.input.keyboard.on('keydown-DOWN', () => this.nextMenu())

    // align cursor
    this.cursor.y = this.difficult_array[0].y
  }



  // private setCursorY(y: number) {
  //   this.cursor.y = y
  // }

  private preMenu() {
    let pre_index = --this.current_difficult_index
    if (pre_index < 0) {
      this.current_difficult_index = pre_index = this.difficult_array.length - 1
    }
    this.cursor.y = this.difficult_array[pre_index].y
  }

  private nextMenu() {
    let next_index = ++this.current_difficult_index
    if (next_index >= this.difficult_array.length) {
      this.current_difficult_index = next_index = 0
    }
    this.cursor.y = this.difficult_array[next_index].y
  }

  update(time: number, delta: number) {
    // if (this.cursorKeys.down?.isDown) {
    //   this.cursor.y = this.getNextMenu().y
    // }

    // if (this.cursorKeys.up?.isDown) {
    //   this.cursor.y = this.getPreMenu().y
    // }
  }
}

