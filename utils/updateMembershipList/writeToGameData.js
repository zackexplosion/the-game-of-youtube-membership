const fs = require('fs')
const path = require('path')
const odlerSponsors = require('./olderSponsors')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const rawMembers = db.get('raw_members').value()
// var d = JSON.stringify(members, null, 4)
// console.log(d)
// return false

module.exports = function () {
  var result = []
  rawMembers.forEach((l, index) => {
    const i = l.snippet.memberDetails
    const {
      channelId,
      displayName,
      channelUrl
    } = i

    // this is myself
    if (channelId === 'UCnT7Ujp9CKmfDTl2v4XtLDw') {
      return false
    } else {
      // For performance, use .value() instead of .write() if you're only reading from db

      const exsit = db.get('members')
        .find({ channelId })
        .value()
      // add new member
      if (!exsit) {
        const m = {
          channelId,
          displayName,
          channelUrl,
          profileImageUrl: i.profileImageUrl.replace('s88-', 's80-'),
          memberSince: l.snippet.membershipsDetails.membershipsDuration.memberSince
        }
        db.get('members').push(m).write()
        console.log('add member', displayName)
      }
    }
  })

  db.get('members').value().forEach(_ => {
    const m = [
      _.displayName,
      _.channelUrl,
      _.profileImageUrl,
      _.memberSince
    ]
    result.push(m)
  })

  result = result.reverse()
  odlerSponsors.forEach(o => {
    const {
      displayName,
      channelUrl,
      profileImageUrl,
      sponserSince
    } = o

    delete o.displayName
    delete o.channelUrl
    delete o.profileImageUrl
    delete o.sponserSince

    result.splice(2, 0, [
      displayName,
      channelUrl,
      profileImageUrl,
      sponserSince,
      {
        older: true,
        ...o
      }
    ])
  })
  const data = JSON.stringify(result)
  fs.writeFileSync(path.join(__dirname, '../../src/gamedata/memberlist.json'), data)

  console.log(`${result.length} members writen into memberlist.json`)
}
