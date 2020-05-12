const updateDBFromYoutube = require('./updateDBFromYoutube')
const writeToGameData = require('./writeToGameData')

async function main () {
  try {
    await updateDBFromYoutube()
    await writeToGameData()
  } catch (error) {
    console.error(error)
  }
}

main()
