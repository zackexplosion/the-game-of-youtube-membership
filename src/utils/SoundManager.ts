export default class SoundManager {
  private scene: Phaser.Scene
  bgm: Phaser.Sound.BaseSound
  mainMusic: Phaser.Sound.BaseSound
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    const { emitter } = window

    emitter.on('PLAY_SOUND', this.playSound, this)

    emitter.on('PLAYER_FIRE_SFX', () => {
      this.playSound('playerFireSFX', {
        volume: 0.5
      })
    })

    emitter.on('PLAYER_HITTEN', () => {
      this.playSound('player-hitten', {
        volume: 0.1
      })
    })

    emitter.on('PLAYER_DIE', () => {
      this.playSound('playerDie', {
        volume: 0.1
      })
    })

    emitter.on('E_DESTROY', () => {
      this.playSound('e_destroy', {
        volume: 0.2
      })
    })

    emitter.on('SOUND_ON_CHANGE', _ => {
      this.scene.sound.mute = !_
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

  setMainMusic(sound: Phaser.Sound.BaseSound) {
    this.mainMusic = sound
  }

  playMainMusic() {
    this.mainMusic.play({
      mute: !window.model.soundOn
    })
  }

  playSound(key: string, config = {}) {
    if (!window.model.soundOn) return
    var sound = this.scene.sound.add(key)
    sound.play(config)
  }

  setBackgroundMusic(key: string) {
    this.bgm = this.scene.sound.add(key, {
      // volume: 0.5,
      loop: true,
      mute: !window.model.soundOn
    })
    this.bgm.play()
  }
}
