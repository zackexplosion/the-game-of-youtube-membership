// import Phaser from 'phaser'
import moment from 'moment'
import memeberList from './assets/memberlist.json'
const DEBUG = true
const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  audio: {
    disableWebAudio: true
  },
  scene: {
    preload,
    create,
    update,
    render
  }
}

const game = new Phaser.Game(config)
var music, helpText
const START_TIME = 24
const END_TIME = 340.68898
const MOMENT_FORMAT = 'YYYY/MM/DD HH:mm:ss'
var DATE_DURATION_PER_PERIOD_BY_SECONDS
var FIRST_MEMBER_JOIN_DATE
var NOW = moment()
var TIMECODES = []
var AUDIO_PLAY_PERCENTAGE = 0
var LAST_PLAY_TIME = 0
var virtualTime
var messageBox
const MEMBER_SIZE = {
  frameWidth: 10,
  frameHeight: 10
}
function preload () {
  // this.load.image('logo', logoImg)
  this.load.image('player', './assets/player.png')

  this.sound.pauseOnBlur = false
  this.load.audio('music', './assets/music-en.mp3')

  for (let i = 0; i < memeberList.length; i++) {
    const [name, url, profileImageUrl, joinDate] = memeberList[i]
    if (!FIRST_MEMBER_JOIN_DATE) {
      FIRST_MEMBER_JOIN_DATE = joinDate
      virtualTime = moment(FIRST_MEMBER_JOIN_DATE)
      // console.log(i, name, FIRST_MEMBER_JOIN_DATE)
    }
    // console.log(name, url, joinDate)
    this.load.image('memberProfile_' + i, profileImageUrl, {
      frameWidth: 10,
      frameHeight: 10
    })
  }
}

function playMusic () {
  console.log('music.isPlaying', music.isPlaying)
  // debugger
  if (music.isPlaying) return
  music.play({
    // currentTime: START_TIME,
    // loop: true
  })
  if (DEBUG) {
    try {
      music.audio.currentTime = START_TIME - 1
    } catch (error) {

    }
  }
  console.log(music)
  // music.on('play', e => {
  //   console.log('on play')
  //   if (DEBUG) music.audio.currentTime = START_TIME - 1
  // })
}

function create () {
  const logo = this.add.image(400, 150, 'player')
  music = this.sound.add('music')
  // playMusic()
  music.play({
    seek: START_TIME - 1
  })

  if (this.sound.locked) {
    // var text = this.add.bitmapText(400, 300, 'atari-classic', 'Tap to start', 40)

    var text = this.add.text(400, 300, 'Tap to Start', {
      fontSize: '40px'
    })
    text.x -= Math.round(text.width / 2)
    text.y -= Math.round(text.height / 2)

    this.sound.once('unlocked', function (soundManager) {
      text.visible = false
    }, this)
  }

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: 'Power2',
    yoyo: true,
    loop: -1
  })

  helpText = this.add.text(16, 16, getHelpMessage(), {
    fontSize: '18px',
    backgroundColor: '#000000',
    fill: '#ffffff'
  })

  messageBox = this.add.text(16, config.height - 50, 'waiting..', {
    fontSize: '18px',
    align: 'right',
    fill: '#ffffff',
    border: '1px solid #FFFFFF'
  })

  DATE_DURATION_PER_PERIOD_BY_SECONDS = moment(NOW).add(1, 'days').diff(FIRST_MEMBER_JOIN_DATE, 'seconds') / 1000
}

function update () {
  try {
    AUDIO_PLAY_PERCENTAGE = parseFloat((music.audio.currentTime / music.audio.duration * 100).toFixed(1))
  } catch (error) {

  }

  // going to show members
  if (LAST_PLAY_TIME !== AUDIO_PLAY_PERCENTAGE && music.audio.currentTime > START_TIME) {
    virtualTime = moment(virtualTime).add(DATE_DURATION_PER_PERIOD_BY_SECONDS, 'seconds')
    currentTimeChange.apply(this)
    // change flag
    LAST_PLAY_TIME = AUDIO_PLAY_PERCENTAGE
  }
  // console.log('update', music.audio.currentTime)
  helpText.setText(getHelpMessage())
}

function render () {
  this.debug.soundInfo(music, 20, 32)
}

let lastProfileIndex = 0
const activedMembers = []
function currentTimeChange () {
  const p = AUDIO_PLAY_PERCENTAGE
  // console.log('virtaul time start')

  if (!memeberList[lastProfileIndex]) return
  const [name, url, profileImageUrl, joinDate] = memeberList[lastProfileIndex]

  if (virtualTime > moment(joinDate)) {
    let x = 88 * (lastProfileIndex + 1)
    const y = 10 * lastProfileIndex
    const imageKey = 'memberProfile_' + lastProfileIndex
    if (x >= config.width) {
      x = 88 * Math.abs(lastProfileIndex - lastProfileIndex - 1)
    }
    activedMembers[lastProfileIndex] = this.add.image(x, y, imageKey)
    // var shape = this.make.graphics()

    //  Create a hash shape Graphics object
    // shape.fillStyle(0xffffff)

    // //  You have to begin a path for a Geometry mask to work
    // shape.beginPath()

    // shape.fillRect(50, 0, 50, 300)
    // shape.fillRect(175, 0, 50, 300)
    // shape.fillRect(0, 75, 275, 50)
    // shape.fillRect(0, 200, 275, 50)

    // var mask = shape.createGeometryMask()
    // activedMembers[lastProfileIndex].setMask(mask)
    // debugger
    // activedMembers[lastProfileIndex] = this.add.image(50 * lastProfileIndex, 10 * lastProfileIndex, 'memberProfile_' + lastProfileIndex)

    // activedMembers[lastProfileIndex] = this.add.graphics()「
    // // debugger
    // activedMembers[lastProfileIndex].fillStyle(0x00ff00, 1)
    // // activedMembers[lastProfileIndex].setTexture('memberProfile_' + lastProfileIndex)
    // activedMembers[lastProfileIndex].createBitmapMask('memberProfile_' + lastProfileIndex)
    // activedMembers[lastProfileIndex].fillCircle(x, y, 40)
    console.log(name, moment(joinDate).format(MOMENT_FORMAT), virtualTime.format(MOMENT_FORMAT))
    messageBox.setText(`${name} 一起加入了戰鬥`)
    // messageBox.events.onInputDown.add(e => {

    // })

    this.tweens.add({
      targets: activedMembers[lastProfileIndex],
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    })
    lastProfileIndex++
  }
}
function getHelpMessage () {
//   return `FMJD: ${moment(FIRST_MEMBER_JOIN_DATE).format(MOMENT_FORMAT)}, NOW : ${NOW.format(MOMENT_FORMAT)}
// DUR_D: ${NOW.diff(FIRST_MEMBER_JOIN_DATE, 'days')}, DUR_S: ${NOW.diff(FIRST_MEMBER_JOIN_DATE, 'seconds')} DUR_P ${DATE_DURATION_PER_PERIOD_BY_SECONDS}
// ct: ${music.audio.currentTime.toFixed(1)}, total: ${music.audio.duration.toFixed(1)}, p: ${AUDIO_PLAY_PERCENTAGE.toFixed(1)}
// vTime: ${virtualTime.format(MOMENT_FORMAT)}`

  return `vTime  : ${virtualTime.format(MOMENT_FORMAT)}
endVTime: ${NOW.format(MOMENT_FORMAT)}`
}
