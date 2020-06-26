export {}
declare global {
  interface Window {
    Utils: Utils
    game: Phaser.Game
    model: Model
    settings: settings
    emitter: Phaser.Events.EventEmitter
    STYLES: any
  }
  interface ObjectConfig {
    scene: Phaser.Scene
  }
}
