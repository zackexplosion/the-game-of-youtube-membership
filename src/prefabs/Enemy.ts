
// You can write more code here

/* START OF COMPILED CODE */

class Enemy extends Phaser.GameObjects.Text {
	
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, "", {});
		
		this.text = "WRYYY\n";
		this.setStyle({"fontSize":"120px"});
	}
	
	public displayText = "wryyy";
	
	
	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export default Enemy