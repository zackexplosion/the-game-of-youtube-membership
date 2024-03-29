export default class AlignGrid {
  config: any
  scene: Phaser.Scene
  cw: number
  ch: number
  graphics: Phaser.GameObjects.Graphics
  constructor(config) {
    this.config = config
    const { game } = window
    if (!config.scene) {
      console.log('missing scene')
      return
    }
    if (!config.rows) {
      config.rows = 11
    }
    if (!config.cols) {
      config.cols = 11
    }
    if (!config.height) {
      config.height = game.config.height
    }
    if (!config.width) {
      config.width = game.config.width
    }

    this.scene = config.scene

    // cell width
    this.cw = config.width / config.cols
    // cell height
    this.ch = config.height / config.rows
  }

  show() {
    this.graphics = this.scene.add.graphics()
    this.graphics.lineStyle(2, 0x3300ff)

    for (let i = 0; i < this.config.width; i += this.cw) {
      this.graphics.moveTo(i, 0)
      this.graphics.lineTo(i, this.config.height)
    }

    for (let i = 0; i < this.config.height; i += this.ch) {
      this.graphics.moveTo(0, i)
      this.graphics.lineTo(this.config.width, i)
    }

    this.graphics.strokePath()
  }

  placeAt(xx, yy, obj) {
    // calc position based upon the cellwidth and cellheight
    const x2 = this.cw * xx + this.cw / 2
    const y2 = this.ch * yy + this.ch / 2

    obj.x = x2
    obj.y = y2
  }

  placeAtIndex(index, obj) {
    const yy = Math.floor(index / this.config.cols)
    const xx = index - (yy * this.config.cols)

    this.placeAt(xx, yy, obj)
  }

  showNumbers() {
    this.show()
    let count = 0
    for (let i = 0; i < this.config.rows; i++) {
      for (let j = 0; j < this.config.cols; j++) {
        const numText = this.scene.add.text(0, 0, count.toString(), { color: '#3300ff' })
        numText.setOrigin(0.5, 0.5)
        this.placeAtIndex(count, numText)

        count++
      }
    }
  }
}
