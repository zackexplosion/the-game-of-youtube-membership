const settings = {
  DEBUG: process.env.DEBUG || false,
  AVAIABLE_MUSICS: [
    ['music-end.mp3', 81.3, 317],
    ['music-en.mp3', 27.1, 300],
    ['music-jp.mp3', 26, 280]
  ],
  PLAYER_CONTROL_KEYS: {
    up: 'W',
    down: 'S',
    left: 'A',
    right: 'D'
  },
  BULLET_SPEED: 150,
  PLAYER_FIRE_DELAY: 300,
  PLAYER_MOVE_SPEED: 110
}

export default settings
