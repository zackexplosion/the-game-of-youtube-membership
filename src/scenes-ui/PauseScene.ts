
// You can write more code here

/* START OF COMPILED CODE */

class PauseScene extends Phaser.Scene {
	
	constructor() {
		super("PauseScene");
	}
	
	create() {
		
		// pause_background
		const pause_background = this.add.image(587, 549, "pause-background");
		pause_background.setOrigin(0.5100742357938807, 0.5022235925851358);
		pause_background.alpha = 0.8;
		pause_background.alphaTopLeft = 0.8;
		pause_background.alphaTopRight = 0.8;
		
		// rotateNotice
		const rotateNotice = this.add.text(957, 534, "", {});
		rotateNotice.setOrigin(0.5, 0.5);
		rotateNotice.text = "請把手機或平板轉成橫的 ：D";
		rotateNotice.setStyle({"align":"center","backgroundColor":"","color":"#EEE","fontSize":"120px","stroke":"#111","strokeThickness":25,"shadow.stroke":true});
	}
	
	
	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

export default PauseScene