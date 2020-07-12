import LevelScene from "@/scenes/LevelScene"

export default class MusicSeeker {
  displayer: any
  seeker: HTMLInputElement
  constructor(scene: LevelScene) {
    let conatiner = document.createElement('div')
    conatiner.id = 'musicseeker'
    let valueDisplay = document.createElement('span')
    valueDisplay.innerHTML = '0'

    let seeker = <HTMLInputElement>document.createElement('input')
    seeker.type = 'range'
    seeker.min = '0'
    seeker.value = '0'
    seeker.max = scene.soundManager.mainMusic.duration.toString()
    seeker.addEventListener('change', e => {
      //@ts-ignore
      var { value } = e.target
      valueDisplay.innerHTML = value
      //@ts-ignore
      scene.soundManager.mainMusic.seek = value
    })

    seeker.addEventListener('input', e => {
      //@ts-ignore
      var { value } = e.target
      valueDisplay.innerHTML = value
    })

    conatiner.append(seeker)
    conatiner.append(valueDisplay)
    document.body.appendChild(conatiner)

    this.seeker = seeker
    this.displayer = valueDisplay
  }

  set(value: string) {
    this.displayer.innerHTML = value
  }

  destory() {

  }
}