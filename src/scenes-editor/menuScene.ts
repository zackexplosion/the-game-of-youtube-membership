
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
		const text_1 = this.add.text(960, 576, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "選擇難度";
		text_1.setStyle({"fontSize":"60px"});
		
		// _difficults_easy
		const _difficults_easy = this.add.text(960, 768, "", {});
		_difficults_easy.setOrigin(0.5, 0.5);
		_difficults_easy.text = "簡單";
		_difficults_easy.setStyle({"fontSize":"40px"});
		
		// _difficults_normal
		const _difficults_normal = this.add.text(960, 864, "", {});
		_difficults_normal.setOrigin(0.5, 0.5);
		_difficults_normal.text = "正常";
		_difficults_normal.setStyle({"fontSize":"40px"});
		
		// zackMark
		const zackMark = this.add.image(960, 256, "zack-logo-large");
		zackMark.scaleX = 0.5;
		zackMark.scaleY = 0.5;
		zackMark.angle = -5;
		
		// _difficults_hard
		const _difficults_hard = this.add.text(960, 960, "", {});
		_difficults_hard.setOrigin(0.5, 0.5);
		_difficults_hard.text = "WRYYYY";
		_difficults_hard.setStyle({"fontSize":"40px"});
		
		// cursor
		const cursor = this.add.image(768, 768, "bullet");
		
		// keymap_1
		this.add.image(1616, 880, "keymap_1");
		
		// fields
		this._difficults_easy = _difficults_easy;
		this._difficults_normal = _difficults_normal;
		this.zackMark = zackMark;
		this._difficults_hard = _difficults_hard;
		this.cursor = cursor;
	}
	
	public _difficults_easy: Phaser.GameObjects.Text;
	
	public _difficults_normal: Phaser.GameObjects.Text;
	
	public zackMark: Phaser.GameObjects.Image;
	
	public _difficults_hard: Phaser.GameObjects.Text;
	
	public cursor: Phaser.GameObjects.Image;
	
	
	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export default menuScene