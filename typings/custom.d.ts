import Player from "@/prefabs/Player";

export { }
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
  interface Level {
    player: Player
  }
  interface LevelConfig {
    INDEX: number
    AUDIO_KEY: string
    AUDIO_FILE_PATH: string
  }
}


