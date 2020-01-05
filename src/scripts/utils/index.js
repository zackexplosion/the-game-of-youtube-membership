import Align from './Align'
import AlignGrid from './AlignGrid'
import SoundManager from './SoundManager'

export default {
  Align,
  AlignGrid,
  SoundManager
}

function getDirFromAngle (angle) {
  var rads = angle * Math.PI / 180
  var tx = Math.cos(rads)
  var ty = Math.sin(rads)
  return { tx, ty }
}

Phaser.Math.getDirFromAngle = getDirFromAngle
