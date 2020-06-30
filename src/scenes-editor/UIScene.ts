
// You can write more code here

/* START OF COMPILED CODE */

class UIScene extends Phaser.Scene {
	
	constructor() {
		super("UIScene");
	}
	
	_create() {
		
		// soundButton
		const soundButton = this.add.text(154, 114, "", {});
		soundButton.text = "SOUND";
		soundButton.setStyle({"fontSize":"30px"});
		
		// fields
		this.soundButton = soundButton;
	}
	
	public soundButton: Phaser.GameObjects.Text;
	
	
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