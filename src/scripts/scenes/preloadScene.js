import moment from 'moment'
import memeberList from '../../assets/memberlist.json'

export default class PreloadScene extends Phaser.Scene {
  music
  constructor () {
    super({ key: 'PreloadScene' })
  }

  async preload () {
    this.load.image('player', 'assets/player.png')
    this.load.audio('music', 'assets/music-en.mp3')
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
    // })
    this.model = this.sys.game.globals.model

    const joinDate = memeberList[0][3]
    this.model.FIRST_MEMBER_JOIN_DATE = joinDate
    this.model.virtualTime = moment(joinDate)
    this.scene.start('MainScene')

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
// var canvas = document.getElementById('c')
const imageSize = 40

function createRoundProfileImage (url) {
  var canvas = document.createElement('canvas')
  canvas.width = 40
  canvas.height = 40
  const ctx = canvas.getContext('2d')
  var i = new Image()
  i.src = url

  var img = document.createElement('img')
  img.setAttribute('crossOrigin', 'anonymous')
  return new Promise((resolve, reject) => {
    img.src = url
    img.onload = function () {
      ctx.beginPath()
      ctx.arc(imageSize / 2, imageSize / 2, imageSize / 2, 0, 6.28, false) // draw the circle
      ctx.clip()
      // call the clip method so the next render is clipped in last path
      //       ctx.stroke();
      ctx.closePath()
      ctx.drawImage(img, 0, 0, 40, 40)
      const base64Data = canvas.toDataURL()
      resolve(base64Data)
    }
  })
}
