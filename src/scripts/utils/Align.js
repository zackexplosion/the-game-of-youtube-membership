export default class Align {
  static scaleToGameW (obj, per) {
    obj.displayWidth = game.config.width * per
    obj.scaleY = obj.scaleX
  }

  static toCenter (obj) {
    obj.x = game.config.width / 2
    obj.y = game.config.height / 2
    // obj.setOrigin(0.5, 0.5)
  }
}
