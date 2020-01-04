const fs = require('fs')
const path = require('path')
// const readline = require('readline');
// const {google} = require('googleapis');

// // If modifying these scopes, delete token.json.
// const SCOPES = [
//   'https://www.googleapis.com/auth/youtube.readonly'
// ]
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.join(__dirname, 'token.json')

// // Load client secrets from a local file.
// fs.readFile(path.join(__dirname, 'credentials.json'), (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Tasks API.
//   authorize(JSON.parse(content), main)
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//   const {client_secret, client_id, redirect_uris} = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//       client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getNewToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getNewToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error retrieving access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }

// async function main(client) {
//   const url = 'https://www.googleapis.com/youtube/v3/sponsors?part=snippet&filter=all'
//   const res = await client.request({url})

//   console.log(res)
// }

const list = require('./memberlist.json')
const odlerSponsors = require('./olderSponsors')
var result = []
list.items.forEach((l, index) => {
  const i = l.snippet.sponsorDetails
  // this is myself
  if (i.channelId === 'UCnT7Ujp9CKmfDTl2v4XtLDw') {
    return false
  } else {
    result.push([
      i.displayName,
      i.channelUrl,
      i.profileImageUrl.replace('s88-', 's80-'),
      l.snippet.sponsorSince
    ])
  }
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
