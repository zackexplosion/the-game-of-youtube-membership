
//@ts-nocheck
import Enemy from '@/objects/Enemy'
// You can write more code here

/* START OF COMPILED CODE */

class E5 extends Enemy {
	
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y);
		
		// text
		const text = scene.add.text(0, 0, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "前面的！幹你娘老雞掰！！";
		text.setStyle({"fontSize":"50px"});
		this.add(text);
		
		// fields
		this.text = text;
		
		this.create();
	}
	
	public container_1: Phaser.GameObjects.Container;
	
	public text: Phaser.GameObjects.Text;
	
	public hp = 50;
	
	
	/* START-USER-CODE */

	// Write your code here.
	create() {
		super.create()
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export default E5
