import Align from './Align'
import AlignGrid from './AlignGrid'
import SoundManager from './SoundManager'

function getDirFromAngle(angle: number) {
  var rads = (angle * Math.PI) / 180
  var tx = Math.cos(rads)
  var ty = Math.sin(rads)
  return { tx, ty }
}

export default {
  Align,
  AlignGrid,
  SoundManager,
  getDirFromAngle,
}
