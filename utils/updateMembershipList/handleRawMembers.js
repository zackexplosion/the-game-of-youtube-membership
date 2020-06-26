const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const firebase = require('firebase')
const { ADMIN_USER, ADMIN_PASS, FIREBASE_APIKEY } = process.env

var firebaseDB = firebase
  .initializeApp({
    apiKey: FIREBASE_APIKEY,
    databaseURL: 'https://zackexplosion-members.firebaseio.com/',
  })
  .database()

module.exports = async function () {
  const rawMembers = db.get('raw_members').value()
  var result = []
  rawMembers.forEach((l, index) => {
    const i = l.snippet.memberDetails
    const { channelId, displayName, channelUrl } = i

    // this is myself
    if (channelId === 'UCnT7Ujp9CKmfDTl2v4XtLDw') {
      return false
    } else {
      // For performance, use .value() instead of .write() if you're only reading from db

      const exsit = db.get('members').find({ channelId }).value()
      // add new member
      if (!exsit) {
        const m = {
          channelId,
          displayName,
          channelUrl,
          profileImageUrl: i.profileImageUrl.replace('s88-', 's80-'),
          memberSince: l.snippet.membershipsDetails.membershipsDuration.memberSince,
        }
        db.get('members').push(m).write()
        console.log('add member', displayName)
      }
    }
  })

  try {
    await firebase.auth().signInWithEmailAndPassword(ADMIN_USER, ADMIN_PASS)
    await firebaseDB.ref('/members').set(result)
  } catch (error) {
    console.error(error)
  }
  console.log(`${result.length} members writen`)
  return result
}
