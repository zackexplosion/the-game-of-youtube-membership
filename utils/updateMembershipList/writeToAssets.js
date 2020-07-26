const fs = require('fs')
const path = require('path')
const odlerSponsors = require('./olderSponsors')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
async function writeToAssets() {
  results = []
  odlerSponsors.forEach((o) => {
    const { displayName, channelUrl, profileImageUrl, sponserSince } = o

    let channelId = channelUrl.split('/')
    channelId = channelId[channelId.length - 1]

    results.push([channelId, displayName, sponserSince])
  })

  const members = db.get('members').value()

  members.map((_) => {
    const { channelId, displayName, memberSince } = _
    results.push([channelId, displayName, memberSince])
  })

  const data = JSON.stringify(results)
  console.log(results.length, 'members written to gamedata')
  fs.writeFileSync(path.join(__dirname, '../../src/gamedata/memberlist.json'), data)
}
module.exports = writeToAssets

// writeToAssets()
