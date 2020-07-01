import LevelScene from "@/scenes/LevelScene"

import { GAME_WIDTH, GAME_HEIGHT } from '@/gamedata/consts'

// Destroy bullet if it's out of bound
const removeCallback = function (c) {
  if (c.x <= 0 || c.x >= GAME_WIDTH || c.y > GAME_HEIGHT || c.y <= 0) {
    c.destroy()
  }
}
export default function removeOutOfBoundsBullets (this: LevelScene) {
  if (this.playerBulletGroup) {
    this.playerBulletGroup.getChildren().forEach(removeCallback)
  }

  if (this.ebulletGroupA) {
    this.ebulletGroupA.getChildren().forEach(removeCallback)
  }

  if (this.ebullet_group_b) {
    this.ebullet_group_b.getChildren().forEach(removeCallback)
  }
}
