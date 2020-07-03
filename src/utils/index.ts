import Align from './Align'
import AlignGrid from './AlignGrid'
import SoundManager from './SoundManager'

export function getDirFromAngle(angle: number) {
  const rads = (angle * Math.PI) / 180
  const tx = Math.cos(rads)
  const ty = Math.sin(rads)
  return { tx, ty }
}

export default {
  Align,
  AlignGrid,
  SoundManager,
}
