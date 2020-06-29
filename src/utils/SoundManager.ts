export default class SoundManager {
  private scene: Phaser.Scene
  private bgm: Phaser.Sound.BaseSound
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    const { emitter } = window
    emitter.on('PLAY_SOUND', this.playSound, this)
    // emitter.on(G.MUSIC_CHANGED, this.musicChanged, this)

    emitter.on('PLAYER_FIRE_SFX', () => {
      this.playSound('playerFireSFX', {
        volume: 0.5
      })
    })
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
