export default class Level extends Phaser.Scene {
  bgm
  create() {
    this.bgm = this.sound.add('BGM')
    this.bgm.play()
  }
}