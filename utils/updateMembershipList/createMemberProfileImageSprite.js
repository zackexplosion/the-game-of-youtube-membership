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

function texturePackerTemplate({ coordinates, properties }) {


  var items = []


  var frames = Object.keys(coordinates).map(_ => {
    const filename = path.parse(_).name
    let item = coordinates[_]

    return {
      filename,
      "rotated": false,
      "trimmed": false,
      "sourceSize": {
        "w": item.width,
        "h": item.height
      },
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": item.width,
        "h": item.height
      },
      "frame": {
        "x": item.x,
        "y": item.y,
        "w": item.width,
        "h": item.height
      }
    }
  })


  var itemObj = {
    textures: [
      {
        "image": "members-profile-sprite.png",
        "format": "RGBA8888",
        "size": {
          "w": properties.width,
          "h": properties.height
        },
        "scale": 1,
        "frames": frames || []
      }
    ],
    meta: {}
  }

  // return JSON.stringify(itemObj, null, 4);
  return itemObj
}

function toCircleImage(img_path) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(img_path)
      .pipe(new PNG({ filterType: 4 }))
      .on('parsed', async function () {
        let radius = this.width / 2
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            if (Math.pow(x - radius, 2) + Math.pow(y - radius, 2) > Math.pow(radius, 2)) {
              this.data[idx + 3] = 0;
            }
          }
        }
        var stream = this.pack().pipe(fs.createWriteStream(img_path))

        stream.on('finish', () => {
          return resolve(img_path)
        })
      })
  })
}

const main = async function () {
  var profileImages = fs.readdirSync(profile_images_path)
    .filter(_ => {
      return _.indexOf('.jpg') > 0
    })
    .map(_ => {
      return new Promise(async (resolve, reject) => {
        var file = path.resolve(profile_images_path, _)
        file = await toPNG(file)
        file = await toCircleImage(file)
        resolve(file)
      })
    })
  profileImages = await Promise.all(profileImages)
  // console.log(profileImages)
  // return
  Spritesmith.run({ src: profileImages }, function handleResult(err, result) {
    if (err) {
      return console.error('Spritesmith', err)
    }
    result.image; // Buffer representation of image
    result.coordinates; // Object mapping filename to {x, y, width, height} of image
    result.properties; // Object with metadata about spritesheet {width, height}

    // save processed image
    fs.writeFileSync(path.resolve(profile_images_path, '../members-profile-sprite.png'), result.image);
    // result.coordinates


    // remove full path of coordinates
    const spriteData = texturePackerTemplate(result)
    fs.writeFileSync(path.resolve(profile_images_path, '../members-profile-sprite.json'), JSON.stringify(spriteData))
  })
}

module.exports = main


// run main function is not load by index.js
if (process.argv[1].indexOf('index') <= 0) {
  main()
}



