
// You can write more code here

/* START OF COMPILED CODE */

class UIScene extends Phaser.Scene {
	
	constructor() {
		super("UIScene");
	}
	
	_create() {
		
		// soundButton
		const soundButton = this.add.image(1798, 101, "volume-on-off-srpite", 1);
		soundButton.scaleX = 0.6;
		soundButton.scaleY = 0.6;
		
		// fields
		this.soundButton = soundButton;
	}
	
	public soundButton: Phaser.GameObjects.Image;
	
	/* START-USER-CODE */

	// Write your code here.
	create() {
		this._create()


		
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

export default UIScene