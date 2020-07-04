import LevelScene from "@/scenes/LevelScene"
import ENEMIES from '@/gamedata/enemies.json'
import Enemy from '@/objects/enemy'

// function eCreater(scene, x, y, text, size) {
//   // const e = new Enemy(scene, x, y, '', '')

//   return e
// }
export default function spawnEnermy (this: LevelScene, count:number) {
  if(!count) count = Phaser.Math.Between(0, 3)

  for(let i = 0; i < count; i++) {
    let eindex = Phaser.Math.Between(0, ENEMIES.length - 1)
    console.log('eindex', eindex)
    const edata = ENEMIES[eindex]
    
    console.log('edata', edata)
    const enermy = new Enemy(
      this,
      400,
      400,
      edata
    )

    // console.log(enermy.x, enermy.y)

    enermy.wakeUp()

    // enermy.x = 1920/ 2
    // enermy.y = 1080/ 2

    // this.tweens.add({
    //   targets: enermy,
    //   x: 400,
    //   y: 500,
    //   // x: Phaser.Math.Between(
    //   //   e.size,
    //   //   <number>this.game.config.width
    //   // ),
    //   // y: Phaser.Math.Between(
    //   //   e.size,
    //   //   <number>this.game.config.height / 2
    //   // ),
    //   duration: 2000,
    //   callbackScope: enermy,
    //   onComplete: (_) => {
    //     _.targets.forEach(__ => {
    //       let e: Enermy = <Enermy>__
    //       e.wakeUp()
    //     })
    //   }
    // })
  }

}
