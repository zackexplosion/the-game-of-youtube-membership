
// You can write more code here

/* START OF COMPILED CODE */

class menuScene extends Phaser.Scene {
	
	constructor() {
		super("menuScene");
	}
	
	preload() {
		
		this.load.pack("asset-pack", "src/assets/asset-pack.json");
	}
	
	create() {
		
		// text_1
		const text_1 = this.add.text(958, 582, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "選擇難度";
		text_1.setStyle({"fontSize":"60px"});
		
		// _difficults_easy
		const _difficults_easy = this.add.text(960, 771, "", {});
		_difficults_easy.setOrigin(0.5, 0.5);
		_difficults_easy.text = "簡單";
		_difficults_easy.setStyle({"fontSize":"40px"});
		
		// _difficults_normal
		const _difficults_normal = this.add.text(960, 862, "", {});
		_difficults_normal.setOrigin(0.5, 0.5);
		_difficults_normal.text = "正常";
		_difficults_normal.setStyle({"fontSize":"40px"});
		
		// zack_logo_large
		const zack_logo_large = this.add.image(962, 251, "zack-logo-large");
		zack_logo_large.scaleX = 0.5;
		zack_logo_large.scaleY = 0.5;
		
		// _difficults_hard
		const _difficults_hard = this.add.text(964, 958, "", {});
		_difficults_hard.setOrigin(0.5, 0.5);
		_difficults_hard.text = "WRYYYY";
		_difficults_hard.setStyle({"fontSize":"40px"});
		
		// cursor
		const cursor = this.add.image(770, 765, "bullet");
		
		// fields
		this._difficults_easy = _difficults_easy;
		this._difficults_normal = _difficults_normal;
		this._difficults_hard = _difficults_hard;
		this.cursor = cursor;
	}
	
	public _difficults_easy: Phaser.GameObjects.Text;
	
	public _difficults_normal: Phaser.GameObjects.Text;
	
	public _difficults_hard: Phaser.GameObjects.Text;
	
	public cursor: Phaser.GameObjects.Image;
	
	
	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export default menuScene