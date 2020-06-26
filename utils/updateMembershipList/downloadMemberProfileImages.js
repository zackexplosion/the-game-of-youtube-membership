const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const download = require('image-downloader')
const path = require('path')
const main = async function () {
  const members = db.get('members').value()
  console.log('members', members.length)
  var downloaded = 0
  await Promise.all(
    members.map((_) => {
      const options = {
        url: _.profileImageUrl,
        dest: path.resolve('./', 'src', 'assets', 'member-profile-images', `${_.channelId}.jpg`),
      }

      return download
        .image(options)
        .then(({ filename }) => {
          console.log('Saved to', filename) // saved to /path/to/dest/image.jpg
          downloaded++
        })
        .catch((err) => console.error(err))
    })
  )
}
module.exports = main

// for test
// main()
