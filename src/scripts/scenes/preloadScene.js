import memeberList from '../../assets/memberlist.json'
import createRoundProfileImage from '../../lib/createRoundProfileImage'

export default class PreloadScene extends Phaser.Scene {
  music
  constructor () {
    super({ key: 'PreloadScene' })
  }

  async preload () {
    const { centerX, centerY } = this.cameras.main
    window.loadingText = this.add.text(centerX, centerY, 'Loading', { color: 'black', fontSize: '40px' })
    window.loadingText.setOrigin(0.5)
    this.load.image('player', 'assets/zack2_80.png')

    const music = this.game.settings.currentMusic
    this.load.audio({
      key: 'music',
      url: 'assets/' + music[0],
      config: {
        showStartAt: music[1],
        showEndAt: music[2]
      }
    }, {
      stream: true
    })
    this.sound.pauseOnBlur = false
    const imageProcessers = []
    for (let i = 0; i < memeberList.length; i++) {
      const [name, url, profileImageUrl, joinDate] = memeberList[i]
      imageProcessers.push(
        createRoundProfileImage.apply(this, [profileImageUrl])
      )
      // // console.log(name, url, joinDate)
      // this.load.image('memberProfile_' + i, data)
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
    this.scene.start('MainScene')
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
