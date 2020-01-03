import memeberList from '../../assets/memberlist.json'
import createRoundProfileImage from '../../lib/createRoundProfileImage'
import LoadingBar from '../objects/loadingBar'

export default class PreloadScene extends Phaser.Scene {
  music
  loadingBar
  constructor () {
    super({ key: 'PreloadScene' })
  }

  async preload () {
    // const { centerX, centerY } = this.cameras.main
    this.loadingBar = new LoadingBar({ scene: this })

    this.load.on('progress', e => {
      this.loadingBar.setPer(e)
    })

    // window.loadingText = this.add.text(centerX, centerY, 'Loading', { color: 'black', fontSize: '40px' })
    // window.loadingText.setOrigin(0.5)

    this.load.image('player', 'assets/zack2_80.png')

    const music = this.game.model.currentMusic
    this.load.audio({
      key: 'music',
      url: 'assets/' + music.key,
      config: {
        showStartAt: music.showStartAt,
        showEndAt: music.showEndAt
      }
    }, {
      stream: true
    })
    this.sound.pauseOnBlur = false
    const imageProcessers = []
    for (let i = 0; i < memeberList.length; i++) {
      // const [name, url, profileImageUrl, joinDate] = memeberList[i]
      const profileImageUrl = memeberList[i][2]
      imageProcessers.push(
        createRoundProfileImage.apply(this, [profileImageUrl])
      )
    }
    const images = await Promise.all(imageProcessers)
    images.forEach((data, i) => {
      const key = 'memberProfile_' + i
      // this.load.image(, data)
      this.textures.addBase64(key, data)
    })
  }

  create () {
    // this.music = this.sound.add('music')
    // this.music.play({
    //   seek: 2
    // }
    // this.scene.start('MainScene')
    // this.scene.start('EndScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
