import Player from '@/prefabs/Player'
import Enemy from '@/prefabs/Enemy'
import Level from '@/objects/Level'
// You can write more code here

/* START OF COMPILED CODE */

class LevelEasy extends Level {
	
	constructor() {
		super("LevelEasy");
	}
	
	_create() {
		
		// player
		const player = new Player(this, 759, 894);
		this.add.existing(player);
		
		// enemy
		const enemy = new Enemy(this, 274, 190);
		this.add.existing(enemy);
		
		// enemy_1
		const enemy_1 = new Enemy(this, 1182, 116);
		this.add.existing(enemy_1);
		
		// enemy_2
		const enemy_2 = new Enemy(this, 754, -453);
		this.add.existing(enemy_2);
	}
	
	
	/* START-USER-CODE */

	create() {
		super.create()
		this._create()
	}

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export default LevelEasy