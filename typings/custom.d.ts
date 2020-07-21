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
    gtag: any
  }
  interface ObjectConfig {
    scene: Phaser.Scene
  }
  interface Level {
    player: Player
  }
  interface LevelDiddicults {
    EASY: LevelConfig
    NORMAL: LevelConfig
    HARD: LevelConfig
  }
  interface LevelConfig {
    INDEX: number
    CLASS: string
    AUDIO_KEY: string
    AUDIO_FILE_PATH: string
    SCENE_NAME: string
    MUSIC_FILE_PATH: string
  }
}


