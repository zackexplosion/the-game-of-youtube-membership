interface LevelDiddicults {
  EASY: LevelConfig
  NORMAL: LevelConfig
  HARD: LevelConfig
}
class CONSTS {
  LEVEL_DIFFICULTS: LevelDiddicults = {
    EASY: {
      INDEX: 0,
      AUDIO_KEY: 'come on lets go',
      AUDIO_FILE_PATH: 'assets/audios/come on lets go.mp3'
    },
    NORMAL: {
      INDEX: 1,
      AUDIO_KEY: 'FUCK YOU',
      AUDIO_FILE_PATH: 'assets/audios/FUCK YOU.mp3'
    },
    HARD: {
      INDEX: 2,
      AUDIO_KEY: 'WRYYYYY',
      AUDIO_FILE_PATH: 'assets/audios/dio-wryyy.mp3'
    }
  }
}


export default new CONSTS()