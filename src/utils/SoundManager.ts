import MainScene from "../scenes/mainScene"

export default class SoundManager {
  private scene: MainScene
  private bgm: Phaser.Sound.BaseSound
  constructor(config) {
    this.scene = config.scene
    window.emitter.on('PLAY_SOUND', this.playSound, this)
    // emitter.on(G.MUSIC_CHANGED, this.musicChanged, this)
  }

  // musicChanged () {
  //   if (this.background) {
  //     if (model.musicOn == false) {
  //       this.background.stop()
  //     } else {
  //       this.background.play()
  //     }
  //   }
  // }

  playSound(key: string, config = {}) {
    if (window.model.soundOn === true) {
      var sound = this.scene.sound.add(key)
      sound.play(config)
    }
  }

  setBackgroundMusic(key: string) {
    if (window.model.musicOn === true) {
      this.bgm = this.scene.sound.add(key, {
        volume: 0.5,
        loop: true
      })
      this.bgm.play()
    }
  }
}
