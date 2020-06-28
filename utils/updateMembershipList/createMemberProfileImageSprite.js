const fs = require('fs')
const path = require('path')
const image_path = path.resolve('./', 'src', 'assets', 'member-profile-images')
const Spritesmith = require('spritesmith')

const sprites = fs.readdirSync(image_path)
  .filter(_ => {
    return _.indexOf('.jpg') > 0
  })
  .map(_ => {
    return path.resolve(image_path, _)
  })
// console.log(sprites)

Spritesmith.run({ src: sprites }, function handleResult(err, result) {
  if (err) {
    return console.error(err)
  }
  result.image; // Buffer representation of image
  result.coordinates; // Object mapping filename to {x, y, width, height} of image
  result.properties; // Object with metadata about spritesheet {width, height}

  // save processed image
  fs.writeFileSync(path.resolve(image_path, '../members-profile-sprite.jpg'), result.image);
  result.coordinates

  // remove full path of coordinates
  const spriteData = {}
  Object.keys(result.coordinates).map(_ => {
    const key = path.parse(_).name
    spriteData[key] = result.coordinates[_]
  })
  fs.writeFileSync(path.resolve(image_path, '../members-profile-sprite.json'), JSON.stringify(spriteData))
});

