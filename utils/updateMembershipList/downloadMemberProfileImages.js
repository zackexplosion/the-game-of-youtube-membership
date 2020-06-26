const odlerSponsors = require('./olderSponsors')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const downloadImage = require('image-downloader')
const path = require('path')
const main = async function () {
  const members = db.get('members').value()
  console.log('members', members.length)
  console.log('old members', odlerSponsors.length)
  var downloaded = 0

  function download(_) {
    const options = {
      url: _.profileImageUrl,
      dest: path.resolve('./', 'src', 'assets', 'member-profile-images', `${_.channelId}.jpg`),
    }
    return downloadImage
      .image(options)
      .then(({ filename }) => {
        console.log('Saved to', filename) // saved to /path/to/dest/image.jpg
        downloaded++
      })
      .catch((err) => console.error(err))
  }

  await Promise.all(
    odlerSponsors.map((_) => {
      let channelId = _.channelUrl.split('/')
      _.channelId = channelId[channelId.length - 1]
      return download(_)
    })
  )

  await Promise.all(members.map(download))

  console.log(`${downloaded} files downloaded`)
}

module.exports = main

// for test
main()
