const updateDBFromYoutube = require('./updateDBFromYoutube')
const writeToGameData = require('./writeToGameData')

async function main () {
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
  } catch (error) {
    console.error(error)
  }
  process.exit()
}

main()
