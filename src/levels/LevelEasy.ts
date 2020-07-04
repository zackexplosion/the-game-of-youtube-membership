import Player from '@/prefabs/Player'
import E0 from '@/prefabs/enemies/E0'
import E1 from '@/prefabs/enemies/E1'
import E2 from '@/prefabs/enemies/E2'
import E3 from '@/prefabs/enemies/E3'
import E4 from '@/prefabs/enemies/E4'
import E5 from '@/prefabs/enemies/E5'
import E6 from '@/prefabs/enemies/E6'
import E7 from '@/prefabs/enemies/E7'
import E8 from '@/prefabs/enemies/E8'
import E9 from '@/prefabs/enemies/E9'
import E10 from '@/prefabs/enemies/E10'
import E11 from '@/prefabs/enemies/E11'
import E12 from '@/prefabs/enemies/E12'
import E13 from '@/prefabs/enemies/E13'
import E14 from '@/prefabs/enemies/E14'
import E15 from '@/prefabs/enemies/E15'
import E16 from '@/prefabs/enemies/E16'
import E17 from '@/prefabs/enemies/E17'
import E18 from '@/prefabs/enemies/E18'
import E19 from '@/prefabs/enemies/E19'
import E20 from '@/prefabs/enemies/E20'
import E21 from '@/prefabs/enemies/E21'
import E22 from '@/prefabs/enemies/E22'
import E23 from '@/prefabs/enemies/E23'
import E24 from '@/prefabs/enemies/E24'
import E25 from '@/prefabs/enemies/E25'
import E26 from '@/prefabs/enemies/E26'
import E27 from '@/prefabs/enemies/E27'
import E28 from '@/prefabs/enemies/E28'
import E29 from '@/prefabs/enemies/E29'
import E30 from '@/prefabs/enemies/E30'
import E31 from '@/prefabs/enemies/E31'
import E32 from '@/prefabs/enemies/E32'
import E33 from '@/prefabs/enemies/E33'
import E34 from '@/prefabs/enemies/E34'
import E35 from '@/prefabs/enemies/E35'
import E36 from '@/prefabs/enemies/E36'
import E37 from '@/prefabs/enemies/E37'
import E38 from '@/prefabs/enemies/E38'

import Enemy from '@/prefabs/Enemy'
import Level from '@/scenes/LevelScene'
// You can write more code here

/* START OF COMPILED CODE */

class LevelEasy extends Level {
	
	constructor() {
		super("LevelEasy");
	}
	
	_create() {
		
		// player
		const player = new Player(this, 945, 850);
		this.add.existing(player);
		
		// e17
		const e17 = new E17(this, 419, -313);
		this.add.existing(e17);
		
		// e31
		const e31 = new E31(this, 1632, -730);
		this.add.existing(e31);
		
		// e29
		const e29 = new E29(this, 484, -610);
		this.add.existing(e29);
		
		// e20
		const e20 = new E20(this, 1547, -304);
		this.add.existing(e20);
		
		// e4
		const e4 = new E4(this, 976, -51);
		this.add.existing(e4);
		
		// e29_1
		const e29_1 = new E29(this, 840, -909);
		this.add.existing(e29_1);
		
		// e3
		const e3 = new E3(this, 1448, -1080);
		this.add.existing(e3);
		
		// e24
		const e24 = new E24(this, 543, -1533);
		this.add.existing(e24);
		
		// e14
		const e14 = new E14(this, 1538, -1364);
		this.add.existing(e14);
		
		// e18
		const e18 = new E18(this, 1018, -1829);
		this.add.existing(e18);
		
		// e12
		const e12 = new E12(this, 1304, -2064);
		this.add.existing(e12);
		
		// e1
		const e1 = new E1(this, 560, -2354);
		this.add.existing(e1);
		
		// e0
		const e0 = new E0(this, 1281, -2528);
		this.add.existing(e0);
		
		// e30
		const e30 = new E30(this, 616, -2824);
		this.add.existing(e30);
		
		// e8
		const e8 = new E8(this, 1024, -2953);
		this.add.existing(e8);
		
		// e9
		const e9 = new E9(this, 1348, -3143);
		this.add.existing(e9);
		
		// e38
		const e38 = new E38(this, 694, -3468);
		this.add.existing(e38);
		
		// e7
		const e7 = new E7(this, 1270, -3708);
		this.add.existing(e7);
		
		// e34
		const e34 = new E34(this, 549, -3965);
		this.add.existing(e34);
		
		// e35
		const e35 = new E35(this, 1292, -4138);
		this.add.existing(e35);
		
		// fields
		this.player = player;
		this.enemies = [e17, e31, e29, e20, e4, e29_1, e3, e24, e14, e18, e12, e1, e0, e30, e8, e9, e38, e7, e34, e35];
	}
	
	public player: Player;
	
	public enemies: Array<E17|E31|E29|E20|E4|E3|E24|E14|E18|E12|E1|E0|E30|E8|E9|E38|E7|E34|E35>;
	
	/* START-USER-CODE */

	create() {
		this._create()
    super.create()

    this.enemies.map(e => {
      e.hp = e.hp * 0.2
    })
	}


	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export default LevelEasy