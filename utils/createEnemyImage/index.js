var fs = require('fs')
var path = require('path')
var text2png = require('text2png')


const dist = path.join('./', 'src', 'assets', 'enemies_img')
var enemies = path.join('./', 'src', 'gamedata', 'enemies.json')

enemies = fs.readFileSync(enemies)
enemies = JSON.parse(enemies)


enemies.forEach((_, index) => {
  var image = text2png(_.text, {
    color: '#FFFFFF',
    font: _.hp + 'px LiHei Pro'
  })
  fs.writeFileSync(path.join(dist, index + '.png'), image)
})
