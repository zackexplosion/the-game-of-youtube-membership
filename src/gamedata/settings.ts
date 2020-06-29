const settings = {
  // DEBUG: new Boolean(process.env.DEBUG) || false,
  DEBUG: true,
  AVAIABLE_MUSICS: [
    ['music-end.mp3', 81.3, 317],
    ['music-en.mp3', 27.1, 300],
    ['music-jp.mp3', 26, 280],
  ],
  PLAYER_CONTROL_KEYS: {
    up: 'W',
    down: 'S',
    left: 'A',
    right: 'D',
  },
  E_BULLET_SPEED: 100,
  BULLET_SPEED: 350,
  PLAYER_FIRE_DELAY: 150,
  PLAYER_MOVE_SPEED: 250,
  PLYAER_INIT_POSITION: Phaser.Math.Between(77, 87),
  PLAYER_MAX_HP: 10,
  SPONSORS_ROTATE_SPEED: -0.05,
  PEOPLE_SIZE: 30,
  SPONSORS_RADIUS: 40,
}

export default settings
