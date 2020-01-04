import memeberList from 'gamedata/memberlist.json'
import createRoundProfileImage from '../../lib/createRoundProfileImage'
import LoadingBar from '../objects/loadingBar'

export default class PreloadScene extends Phaser.Scene {
  music
  loadingBar
  constructor () {
    super({ key: 'PreloadScene' })
  }

  async preload () {
    this.loadingBar = new LoadingBar({ scene: this })

    this.load.on('progress', e => {
      this.loadingBar.setPer(e)
    })

    this.load.image('player', 'assets/zack2_80.png')
    this.load.image('playerBullet', 'assets/bullet.png')
    this.load.image('ebulletA', 'assets/ebullet_a.png')
    this.load.image('ebulletB', 'assets/ebullet_b.png')

    this.load.audio('playerFireSFX', 'assets/sfx_laserfire.ogg')
    this.load.audio('explosion', 'assets/explosion.wav')
    // this.load.audio('playerFireSFX', 'assets/laser.ogg')
    // loading music
    const {
      key,
      showSponsorsAt,
      endShowSponsorAt
    } = model.currentMusic

    this.load.audio({
      key: 'music',
      url: 'assets/' + key,
      config: {
        showSponsorsAt,
        endShowSponsorAt
      }
    }, {
      stream: true
    })

    this.sound.pauseOnBlur = false

    // create rounded profile images
    const imageProcessers = []
    for (let i = 0; i < memeberList.length; i++) {
      // const [name, url, profileImageUrl, joinDate] = memeberList[i]
      const profileImageUrl = memeberList[i][2]
      // const p = createRoundProfileImage.apply(this, [profileImageUrl])
      const p = createRoundProfileImage(profileImageUrl)
      imageProcessers.push(p)
    }

    const images = await Promise.all(imageProcessers)
    images.forEach((data, i) => {
      const key = 'memberProfile_' + i
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
