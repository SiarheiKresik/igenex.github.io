import Person from './fellow';
import {
  state
} from './state';
import {
  random,
} from './utils';

import SFX from './sounds';
import _ from 'lodash';

export default class Monster extends Person {
  constructor(x, y) {
    super(x, y);
    this.name = 'Незнайка';
    this.sprite = state.monsters[0][1];
    this.type = 'monster';
    this.turned = 'left';
    this.expandMonsterParts();
    this.kickSound = new SFX({
			src: `sounds/monster-kick-${_.random(1,5)}.mp3`,
			loop: false,
			volume: state.options.volumeSounds
		});
    this.damageSound = new SFX({
			src: `sounds/monster-damage-${_.random(1,5)}.mp3`,
			loop: false,
			volume: state.options.volumeSounds
		});
  }

  expandMonsterParts() {
    const data = state.monsters[0][0].frames;

    this.partsAll = {
      body: data['mnstr_body.png'],
      eyes1: data['mnstr_eyes.png'],
      eyes2: data['mnstr_eyes2.png'],
      eyes3: data['mnstr_eyes4.png'],
      eyes4: data['mnstr_eyes5.png'],
      eyes5: data['mnstr_eyes6.png'],
      head1: data['mnstr_head.png'],
      head2: data['mnstr_head1.png'],
      head3: data['mnstr_head2.png'],
      head4: data['mnstr_head3.png'],
      head5: data['mnstr_head4.png'],
      leftArm: data['mnstr_left-arm.png'],
      leftLeg: data['mnstr_left-leg.png'],
      mouth1: data['mnstr_mouse.png'],
      mouth2: data['mnstr_mouth1.png'],
      mouth3: data['mnstr_mouth2.png'],
      rightArm: data['mnstr_right-arm.png'],
      rightLeg: data['mnstr_right-leg.png']
    };

    this.parts = {
      body: this.partsAll.body,
      eyes: [this.partsAll.eyes1, this.partsAll.eyes2, 
            this.partsAll.eyes3, this.partsAll.eyes4, 
            this.partsAll.eyes5][random(5)],
      head: [this.partsAll.head1, this.partsAll.head2, 
            this.partsAll.head3, this.partsAll.head4, 
            this.partsAll.head5][random(5)],
      mouth: [this.partsAll.mouth1, this.partsAll.mouth2, 
            this.partsAll.mouth3][random(3)],
      leftArm: this.partsAll.leftArm,
      rightArm: this.partsAll.rightArm,
      leftLeg: this.partsAll.leftLeg,
      rightLeg: this.partsAll.rightLeg
    };

    return this.parts;
  }

  showParts() {
    this.expandMonsterParts();
  }

  


}