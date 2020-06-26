const updateDBFromYoutube = require('./updateDBFromYoutube')
const writeToGameData = require('./writeToGameData')
const downloadMemberProfileImages = require('./downloadMemberProfileImages')

async function main() {
  try {
    // console.log(firebaseDB)

    // firebase.auth().createUserWithEmailAndPassword('yolo@gmail.com', 'yolo').catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code
    //   const errorMessage = error.message
    //   // ...

    //   console.error(errorMessage)
    // })
    await updateDBFromYoutube()
    await writeToGameData()
    await downloadMemberProfileImages()
  } catch (error) {
    console.error(error)
  }
  process.exit()
}

main()
