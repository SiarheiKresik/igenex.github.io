import {
  random,
  drawEllipse,
  rotatingPart
} from './utils';
import {
  dom
} from './dom';
import {
  state,
  actionConfig
} from './state';

import _ from 'lodash';
import SFX from './sounds';

export default class Person {
  constructor(x, y, name = '') {
    this.canvas = dom.canvas;
    this.context = this.canvas.getContext('2d');
    this.name = name;
    this.lives = 100;
    this.strenght = 1.2;
    this.shield = 100;
    this.positionX = x;
    this.positionY = y;
    this.lastDamage = 0;
    this.type = '';
    this.funSound = new SFX({
      src: `sounds/fun-${['crispy', 'tosty', 'frosty'][_.random(2)]}.mp3`,
      loop: false,
      volume: state.options.volumeSounds
    });
  }


  getName() {
    this.name = state.nameBase.firstPartFirstName[random(state.nameBase.firstPartFirstName.length)] +
      state.nameBase.secondPartFirstName[random(state.nameBase.secondPartFirstName.length)] +
      state.nameBase.thirdPartFirstName[random(state.nameBase.thirdPartFirstName.length)] + " " +
      state.nameBase.firstHalfLastName[random(state.nameBase.firstHalfLastName.length)] +
      state.nameBase.secondHalfLastName[random(state.nameBase.firstHalfLastName.length)];
  }

  

  drawName() {
    this.context.fillStyle = 'white';
    this.context.font = "25px Arial";
    if (this.type == "monster") {
      this.context.fillText(this.name, this.canvas.width - 400, 100);
    } else {
      this.context.fillText(this.name, 200, 100);
    }
  }

  drawLives() {
    const alpha = this.context.globalAlpha;
    this.context.globalAlpha = 0.5;
    this.context.fillStyle = 'red';
    if (this.type == "monster") {
      this.context.fillRect(this.canvas.width - 400, 130, this.lives > 0 ? this.lives * 3 : 0, 20);
    } else {
      this.context.fillRect(100, 130, this.lives * 3, 20);
    }
    this.context.globalAlpha = alpha;
  }

  drawShadow(x, y, w = 0) {

    const alpha = this.context.globalAlpha;
    this.context.filter = 'blur(2px)';
    this.context.globalAlpha = 0.5;

    drawEllipse(this.context, x, y, 160 + w, 10);

    this.context.filter = 'blur(0)';
    this.context.globalAlpha = alpha;
  }

  drawDamage(damage, target = this) {
    damage = Math.floor(damage);
    target.context.save();
    if (!this.drawDamage.scaleOffset) this.drawDamage.scaleOffset = 1;
    if (!this.drawDamage.posYOffset) this.drawDamage.posYOffset = 0.1;
    this.drawDamage.scaleOffset+= 0.1;
    this.drawDamage.posYOffset += 20;

    this.context.scale(this.drawDamage.scaleOffset, this.drawDamage.scaleOffset)
    this.context.fillStyle = 'red';
    this.context.font = "25px Arial";
    this.context.fillText(` - ${damage}`, target.positionX - this.drawDamage.posYOffset, target.positionY - this.drawDamage.posYOffset);
    target.context.restore();
  }

  drawDefendStats() {
    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = "25px Arial";
    this.context.fillText(`
      Текущая броня: ${this.shield},
      Текущая сила: ${this.strenght}
    `, this.positionX, this.positionY)
    this.context.restore();
  }

  drawHealStats() {
    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = "25px Arial";
    this.context.fillText(`
      Текущие жизни: ${this.lives}
    `, this.positionX, this.positionY)
    this.context.restore();
  }

  drawParts(part, x, y, rotatePart = 0, scalePart = 1) {

    this.context.save();

    if (rotatePart) {
      rotatingPart(this.context, part, rotatePart, x + part.offset.x, y - part.offset.y);
      x = 0 + part.offset.x;
      y = 0 + part.offset.y;
    }

    this.context.drawImage(
      this.sprite,
      part.frame.x,
      part.frame.y,
      part.frame.w,
      part.frame.h,
      x + part.offset.x,
      y + part.offset.y,
      part.frame.w * scalePart,
      part.frame.h * scalePart);

    //Восстанавливаем контекст
    this.context.restore();
  }

  turnAround(side) {
    this.turned = side;
  }

  drawPerson(partsArr) {

    this.drawName();
    this.drawLives();

    this.context.save();
    this.context.translate(this.positionX, this.positionY);

    if(this.turned == "right" && this.type == "monster") {
      this.context.scale(-1,1);
      // this.context.translate(this.positionX - 20, this.positionY);
    }
    if(this.turned == "left" && this.type == "hero") {
      this.context.scale(-1,1);
      // this.context.translate(this.positionX + 20, this.positionY);
    }

    state.actionStatus[this.type].position = {
      x: this.positionX,
      y: this.positionY
    };

    const currentStatus = state.actionStatus[this.type].currentAction;
    const currentConfig = _.defaultsDeep({},
      actionConfig[this.type][currentStatus],
      actionConfig[this.type].default
    );


    // console.log(actionConfig[this.type][currentStatus]);
    // console.log('<-- actionConfig[this.type][currentStatus] | currentConfig -->');
    // console.log(currentConfig);

    this.drawShadow(60, this.type == "hero" ? 165 : 150, actionConfig[this.type].default.shadow.scalePart.value);

    const drawPlayerParts = this.drawParts.bind(this);

    function drawAllParts(that) {
      partsArr.forEach(part => {

        drawPlayerParts(
          that.parts[part],
          currentConfig[part].x.value,
          currentConfig[part].y.value,
          currentConfig[part].rotatePart.value,
          currentConfig[part].scalePart.value
        );
      }, that);
    }

    drawAllParts(this);

    this.context.restore();
  }

  attack(enemy) {
    this.kickSound.play();
    if (_.random(10) == 7) {
      this.funSound.play();
    }
    this.getDamage(enemy);
  }

  getDamage(target = this) {
    this.lastDamage = _.random(30)  * _.random(1.0, target.strenght)
    target.lives -= Math.floor(this.lastDamage - (target.shield / 1000));
    target.shield -= (this.lastDamage / 5) * _.random(4);
    this.drawDamage(this.lastDamage, target);

    target.damageSound.play();

    if (target.lives <= 0 )  {
      state.actionStatus[target.type].currentAction = "dead";
      target.lives = -1;
    }
    return this.lastDamage;
  }

  defend() {
    this.shield += 100;
    return this.strenght += _.random(0.5, true);
  }

  heal() {
    return this.lives += _.random((100 - this.lives));
  }


}