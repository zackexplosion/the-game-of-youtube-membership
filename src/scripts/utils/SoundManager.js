export default class SoundManager {
  constructor (config) {
    this.scene = config.scene
    emitter.on('PLAY_SOUND', this.playSound, this)
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

  playSound (key, config = {}) {
    if (model.soundOn === true) {
      var sound = this.scene.sound.add(key)
      sound.play(config)
    }
  }

  setBackgroundMusic (key) {
    if (model.musicOn === true) {
      this.background = this.scene.sound.add(key, {
        volume: 0.5,
        loop: true
      })
      this.background.play()
    }
  }
}