const fs = require('fs')
const path = require('path')
const { profile_images_path } = require('./config')
const Spritesmith = require('spritesmith')
//uniqueId param is used to identify a user
//so use the primary key or something guaranteed to be unique
const PNG = require("pngjs").PNG
const sharp = require('sharp')
async function toPNG(input) {
  const filename = path.parse(input).name
  const newfile = path.resolve(profile_images_path, filename + '.png')
  await sharp(input).toFile(newfile)

  return newfile
}

function toCircleImage(img_path) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(img_path)
      .pipe(new PNG({ filterType: 4 }))
      .on('parsed', function () {
        let radius = this.width / 2
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            if (Math.pow(x - radius, 2) + Math.pow(y - radius, 2) > Math.pow(radius, 2)) {
              this.data[idx + 3] = 0;
            }
          }
        }
        this.pack().pipe(fs.createWriteStream(img_path))

        return resolve()
      })
  })
}

const main = async function () {
  const profileImages = fs.readdirSync(profile_images_path)
    .filter(_ => {
      return _.indexOf('.jpg') > 0
    })
    .map(async _ => {
      const file = path.resolve(profile_images_path, _)
      const f = await toPNG(file)
      await toCircleImage(f)
      return file
    })

  Spritesmith.run({ src: profileImages }, function handleResult(err, result) {
    if (err) {
      return console.error(err)
    }
    result.image; // Buffer representation of image
    result.coordinates; // Object mapping filename to {x, y, width, height} of image
    result.properties; // Object with metadata about spritesheet {width, height}

    // save processed image
    fs.writeFileSync(path.resolve(profile_images_path, '../members-profile-sprite.jpg'), result.image);
    result.coordinates

    // remove full path of coordinates
    const spriteData = {}
    Object.keys(result.coordinates).map(_ => {
      const key = path.parse(_).name
      spriteData[key] = result.coordinates[_]
    })
    fs.writeFileSync(path.resolve(profile_images_path, '../members-profile-sprite.json'), JSON.stringify(spriteData))
  })
}

module.exports = main


// run main function is not load by index.js
if (process.argv[1].indexOf('index') <= 0) {
  main()
}



