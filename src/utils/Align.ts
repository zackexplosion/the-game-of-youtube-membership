export default class Align {
  static scaleToGameW(obj: any, per: number) {
    obj.displayWidth = <number>window.game.config.width * per
    obj.scaleY = obj.scaleX
  }

  static toCenter(obj: any) {
    obj.x = <number>window.game.config.width / 2
    obj.y = <number>window.game.config.height / 2
    // obj.setOrigin(0.5, 0.5)
  }
}


