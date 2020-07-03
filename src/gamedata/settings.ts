const settings = {
  // DEBUG: new Boolean(process.env.DEBUG) || false,
  DEBUG: true,
  AVAIABLE_MUSICS: [
    ['music-end.mp3', 81.3, 317],
    ['music-en.mp3', 27.1, 300],
    ['music-jp.mp3', 26, 280],
  ],
  PLAYER_CONTROL_KEYS: {
    moveUp: ['W', 'UP'],
    moveDown: ['S', 'DOWN'],
    moveLeft: ['A', 'LEFT'],
    moveRight: ['D', 'RIGHT'],
  },
  E_BULLET_SPEED: 100,
  BULLET_SPEED: 450,
  PLAYER_FIRE_DELAY: 150,
  PLAYER_MOVE_SPEED: 350,
  PLAYER_MAX_HP: 10,
  SPONSORS_ROTATE_SPEED: -0.05,
  PEOPLE_SIZE: 80,
  SPONSORS_RADIUS: 40,
}

export default settings
