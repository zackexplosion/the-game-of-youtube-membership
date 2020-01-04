import Align from './Align'
import AlignGrid from './AlignGrid'

export default {
  Align,
  AlignGrid
}

function getDirFromAngle (angle) {
  var rads = angle * Math.PI / 180
  var tx = Math.cos(rads)
  var ty = Math.sin(rads)
  return { tx, ty }
}

Phaser.Math.getDirFromAngle = getDirFromAngle
