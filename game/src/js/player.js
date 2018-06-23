import Person from './fellow';
import {
  state
} from './state';
import SFX from './sounds';
export default class Player extends Person {
  constructor(x, y, name = state.user.name) {
    super(x, y, name);
    this.sprite = state.monsters[1][1];
    this.type = 'hero';
    this.turned = "right";
    this.expandHeroParts();
    this.kickSound = new SFX({
			src: `sounds/hero-kick-${_.random(1,5)}.mp3`,
			loop: false,
			volume: state.options.volumeSounds
		});
    this.damageSound = new SFX({
			src: `sounds/hero-damage-${_.random(1,4)}.mp3`,
			loop: false,
			volume: state.options.volumeSounds
		});
  }

  expandHeroParts() {

    const data = state.monsters[1][0].frames;

    this.parts = {
      body: data['hero_body.png'],
      eyes: data['hero_eyes.png'],
      head: data['hero_head.png'],
      mouth: data['hero_mouth.png'],
      leftArm: data['hero_leftArm.png'],
      leftLeg: data['hero_leftLeg.png'],
      rightArm: data['hero_rightArm.png'],
      rightLeg: data['hero_rightLeg.png'],
      sword: data['hero_sword.png']
    };
    return this.parts;
  }

  showParts() {
    this.expandHeroParts();
  }


}