

import _UIScene from '@/scenes-editor/UIScene'
export default class UIScene extends _UIScene {
  seekbar: HTMLInputElement
  create() {
    super.create()
    this.soundButton
      .setInteractive()
      .on('pointerup', (e) => {
        window.model.soundOn = !window.model.soundOn
        this.soundButton.setFrame(window.model.soundOn? 1 : 0)
      })

    this.seekbar = document.createElement('input')
  }

  destroy(){
    this.seekbar.remove()
  }
}