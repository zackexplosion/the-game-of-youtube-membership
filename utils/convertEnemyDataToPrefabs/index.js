const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')
var enemies = path.join('./', 'src', 'gamedata', 'enemies.json')
enemies = JSON.parse(fs.readFileSync(enemies))
const dist = path.join('./', 'src', 'prefabs', 'enemies')
function createPrefab(e, oldData = {}) {
  var d1id
  if(oldData.displayList && oldData.displayList[0]) {
    d1id = oldData.displayList[0].id
  }
  var textId

  if(
    oldData.displayList &&
    oldData.displayList[0] &&
    oldData.displayList[0].list &&
    oldData.displayList[0].list[0]
  ) {
    textId = oldData.displayList[0].list[0].id
  }
  return {
    "id": oldData.id || uuidv4(),
    "sceneType": "PREFAB",
    "settings": {
        "sceneType": "PREFAB",
        "superClassName": "Enemy",
        "preloadMethodName": "",
        "preloadPackFiles": [],
        "createMethodName": "",
        "prefabInitMethodName": "create",
        "compilerOutputLanguage": "TYPE_SCRIPT"
    },
    "displayList": [
        {
            "type": "Container",
            "id": d1id || uuidv4(),
            "label": "container_1",
            "scope": "PUBLIC",
            "x": 409,
            "y": 265,
            "list": [
                {
                    "type": "Text",
                    "id": textId || uuidv4(),
                    "label": "text",
                    "scope": "PUBLIC",
                    "text": e.text,
                    "fontSize": e.size + "px"
                }
            ]
        }
    ],
    "meta": {
        "app": "Phaser Editor 2D - Scene Editor",
        "url": "https://phasereditor2d.com",
        "contentType": "phasereditor2d.core.scene.SceneContentType"
    },
    "prefabProperties": [
        {
            "name": "hp",
            "label": "Current HP",
            "tooltip": "",
            "defValue": e.hp,
            "type": {
                "id": "number"
            }
        }
    ]
  }
}

function createTS(e, index){
  var classNAME = `E${index}`
  var text =
`
//@ts-nocheck
import Enemy from '@/objects/Enemy'
// You can write more code here

/* START OF COMPILED CODE */

class ${classNAME} extends Enemy {
	
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y);
		
		// text
		const text = scene.add.text(0, 0, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = ${JSON.stringify(e.text)};
		text.setStyle({"fontSize":"${e.size}px"});
		this.add(text);
		
		// fields
		this.text = text;
		
		this.create();
	}
	
	public container_1: Phaser.GameObjects.Container;
	
	public text: Phaser.GameObjects.Text;
	
	public hp: number = ${e.hp};
	
	
	/* START-USER-CODE */

	// Write your code here.
	create() {
		super.create()
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export default ${classNAME}
`
return text
}
var importData = ''
for (let i = 0; i < enemies.length; i++) {
  let e = enemies[i]
  let sceneData
  const scene_dist = path.join(dist, `E${i}.scene`)

  if(fs.existsSync(scene_dist)) {
    let _e = JSON.parse(fs.readFileSync(scene_dist))
    sceneData = createPrefab(e, _e)
  } else {
    sceneData = createPrefab(e)
  }

  fs.writeFileSync(scene_dist, JSON.stringify(sceneData, null, 2))


  var tsData = createTS(e, i)
  const ts_dist = path.join(dist, `E${i}.ts`)

  fs.writeFileSync(ts_dist, tsData)

  importData += `import E${i} from '@/prefabs/enemies/E${i}'\n`
}

const import_list = path.join(dist, `import.ts`)
fs.writeFileSync(import_list, importData)







