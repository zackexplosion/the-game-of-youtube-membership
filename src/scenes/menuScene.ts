import _menuScene from '@/scenes-ui/menuScene'
import OrientationChecker from '@/helpers/OrientationChecker'
import levels from '@/gamedata/levels'

function findDiffucultByIndex(index: number) {
  var difficult!: LevelConfig
  Object.keys(levels).forEach(_ => {
    let d = <LevelConfig>levels[_]
    if (d.INDEX === index) {
      difficult = d
    }
  })
  return difficult
}

export default class menuScene extends _menuScene {

  private difficult_array: Array<Phaser.GameObjects.Text> = []
  private current_difficult_index: number = 0
  orientationChecker: OrientationChecker
  backgroundSound: Phaser.Sound.BaseSound

  private startLevel() {
    const _difficult = findDiffucultByIndex(this.current_difficult_index)
    const sound = this.sound.add(_difficult.AUDIO_KEY)
    sound.on(Phaser.Sound.Events.COMPLETE, () => {
      this.backgroundSound.pause()
    })
    sound.play()

    this.scene.start('LevelLoaderScene', _difficult)
  }

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
  }

  create() {
    this.orientationChecker = new OrientationChecker(this)

    // showing click hand if sound locked, otherwise start the menu
    if (this.sound.locked) {
      // start with this
      const handClick = this.add.image(
        <number>this.game.config.width / 2,
        <number>this.game.config.height / 2,
        'hand-click'
      )
        .setInteractive()

      this.tweens.add({
        targets: handClick,
        y: 500,
        duration: 300,
        loop: -1,
        yoyo: true
      })

      this.sound.once('unlocked', () => {
        handClick.destroy()
        this.start()
      })
    }
    else {
      this.start()
    }
  }

  start() {
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

    this.input.keyboard.on('keydown-SPACE', () => this.startLevel())
    this.input.keyboard.on('keydown-ENTER', () => this.startLevel())


    this.backgroundSound = this.sound.add('menu-bgm', {
      loop: true
    })
    if (!this.backgroundSound.isPlaying) {
      this.backgroundSound.play()
    }

    // this.game.events.addListener(Phaser.Core.Events.BLUR, () => {
    //   console.log('blur')
    // })

    // this.game.events.addListener(Phaser.Core.Events.FOCUS, () => {
    //   console.log('focus')
    // })

    this.orientationChecker = new OrientationChecker(this)

    this.tweens.add({
      targets: this.zackMark,
      angle: 5,
      duration: 2000,
      loop: -1,
      yoyo: true
    })

  }
}

