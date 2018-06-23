import {
  dom
} from './dom';
import '../base/names.json';
import '../base/dictionary.json';
import {
  Utils,
  random,
  WindowControl
} from './utils';
import Monster from './monster';
import Player from './player';
import {
  state,
  actionConfig
} from './state';
import SFX from './sounds';

import '../images/backgrounds/battleBg.png';
import '../images/backgrounds/battleBgFive.jpg';
import '../images/backgrounds/battleBg.png';
import '../images/backgrounds/battleBgSix.jpg';
import '../images/backgrounds/battleBgTwo.jpg';
import '../images/backgrounds/battleBgFour.png';
import '../images/backgrounds/battleBgSeven.png';
import '../images/backgrounds/battleBgThree.jpg';
import '../images/monsters/monsterThree.png';
import '../images/monsters/monsterFour.png';
import '../images/monsters/monsterPack.png';
import '../images/monsters/hero.png';
import '../images/icons/attack.png';
import '../images/icons/health.png';
import '../images/icons/shield.png';
import '../images/icons/button.png';
import '../images/foregrounds/answers.jpg';

import '../images/monsters/monsterPack.json';
import '../images/monsters/monsterPack.json';
import '../images/monsters/hero.json';

import '../sounds/bckgmusic-1.mp3';
import '../sounds/bckgmusic-2.mp3';
import '../sounds/bckgmusic-3.mp3';
import '../sounds/hero-damage-1.mp3';
import '../sounds/hero-damage-2.mp3';
import '../sounds/hero-damage-3.mp3';
import '../sounds/hero-damage-4.mp3';
import '../sounds/monster-damage-1.mp3';
import '../sounds/monster-damage-2.mp3';
import '../sounds/monster-damage-3.mp3';
import '../sounds/monster-damage-4.mp3';
import '../sounds/monster-damage-5.mp3';
import '../sounds/monster-kick-1.mp3';
import '../sounds/monster-kick-2.mp3';
import '../sounds/monster-kick-3.mp3';
import '../sounds/monster-kick-4.mp3';
import '../sounds/monster-kick-5.mp3';
import '../sounds/hero-kick-1.mp3';
import '../sounds/hero-kick-2.mp3';
import '../sounds/hero-kick-3.mp3';
import '../sounds/hero-kick-4.mp3';
import '../sounds/hero-kick-5.mp3';
import '../sounds/fun-crispy.mp3';
import '../sounds/fun-frosty.mp3';
import '../sounds/fun-tosty.mp3';
import '../sounds/mk3-win.mp3';
import '../sounds/mk3-loose.mp3';



export default class Game {
  constructor() {
    this.canvas = dom.canvas;
    this.context = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth - 20;
    this.canvas.height = window.innerHeight - 23;
    this.utils = new Utils();
    this.animationStart = this.utils.animationStart;
    this.count = 0;
    this.countSecond = 0;
    this.slowDowner = 2;
    this.wControl = new WindowControl();
    this.backgroundMusic = new SFX({
      src: `sounds/bckgmusic-${_.random(1,3)}.mp3`,
      loop: true,
      volume: state.options.volumeMusic
    });
    this.winSound = new SFX({
      src: `sounds/mk3-win.mp3`,
      loop: false,
      volume: state.options.volumeSounds
    });
    this.looseSound = new SFX({
      src: `sounds/mk3-loose.mp3`,
      loop: false,
      volume: state.options.volumeSounds
    });
  }

  init() {
    // this.monster = new Monster();
    this.getBackground();

    if (this.backgroundMusic.playStatus) {
      this.backgroundMusic.stop();
    }
    this.backgroundMusic.play();


    if (!state.user.name) {
      this.getPlayerName();
    }

    // this.context.save();
    this.monster = new Monster(this.canvas.width / 2 + 200, this.canvas.height - 200);
    this.monster.drawMonster = this.monster.drawPerson.bind(this.monster, ['leftLeg', 'rightLeg', 'rightArm', 'body', 'leftArm', 'head', 'eyes', 'mouth']);
    this.monster.getName();
    this.player = new Player(this.canvas.width / 2 - 300, this.canvas.height - 215);
    this.player.drawPlayer = this.player.drawPerson.bind(this.player, ['leftLeg', 'rightLeg', 'sword', 'leftArm', 'body', 'rightArm', 'head', 'eyes', 'mouth']);
    this.monster.drawMonster();
    this.player.drawPlayer();
    this.setActionAndStatus("hero", "pending");
    this.setActionAndStatus("monster", "pending");
    this.start();
  }

  start() {
    this.showUserTurnScreen();
    this.update();
  }

  reset() {

  }

  showFinalScreen(status) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const gradient = this.context.createLinearGradient(0, Math.floor(width * 0.3), width, Math.floor(height - height * 0.3));
    gradient.addColorStop(0, "green");
    gradient.addColorStop(1, "white");
    this.context.fillStyle = gradient;
    this.context.fillRect(0, Math.floor(height * 0.3), width, Math.floor(height * 0.5));
    this.context.fillStyle = 'white';
    this.context.font = "50px Arial";
    this.context.textAlign = "center";
    this.context.fillText(status == "win" ? "You win!" : "Game Over!", this.canvas.width / 2, this.canvas.height / 2);
  }

  update() {
    let animationNow = performance.now();
    if (animationNow - this.animationStart >= 75) {
      this.animationStart = animationNow;


      this.loopMovement("monster", state.actionStatus.monster.currentAction);
      this.loopMovement("hero", state.actionStatus.hero.currentAction);

      this.render();

      this.context.filter = 'blur(0px)';


      this.heroActions(this.getActionAndStatus("hero"));
      this.monsterActions(this.getActionAndStatus("monster"));


    }
    // Animate
    return window.requestAnimationFrame(() => {
      this.update();
    });
  }

  heroGo() {
    if (this.player.positionX <= this.monster.positionX - 105) {
      this.player.positionX += 7;
      this.monster.positionX -= 7;
    } else {
      this.setActionAndStatus("hero", "attackOne");
    }
  }

  heroAttack() {
    this.count++;
    if ((this.player.positionX >= this.monster.positionX - 108)) {

      if (this.monster.lives > 0) {
        this.setActionAndStatus("monster", "hit");
      }
      if (this.count < 2) {
        this.player.attack(this.monster);
      }
      if (this.count > 2 && this.count < 15) {
        this.player.drawDamage(this.player.lastDamage, this.monster);
      }
      if (this.count > 15) {
        this.setActionAndStatus("hero", "pending");
        this.showUserTurnScreen();
        this.count = 0;
        this.player.drawDamage.scaleOffset = null;
        this.player.drawDamage.posYOffset = null;
      }

    } else {
      this.setActionAndStatus("hero", "pending");
      this.setActionAndStatus("monster", "pending");
    }
  }

  heroDefend() {
    this.count++;
    if (this.count < 2) {
      this.player.defend();
    }
    if (this.count < 35) {
      this.player.drawDefendStats();
    } else {
      this.count = 0;
      this.setActionAndStatus("hero", "pending");
    }
  }

  heroHeal() {
    this.count++;
    if (this.count < 2) {
      this.player.heal();
    }
    if (this.count < 30) {
      this.player.drawHealStats();
    } else {
      this.count = 0;
      this.setActionAndStatus("hero", "pending");
    }
  }

  heroDead() {
    this.count++;
    if (!localStorage.user) {
      const data = JSON.parse(localStorage.getItem("user"));
      data.push(state.user);
      localStorage.setItem("user", JSON.stringify(data));
    }
    
    if (this.count < 2) {
      this.looseSound.play();
      setTimeout(() => {
        this.hideUserTurnScreen();
        this.init();
        this.wControl.closeModalWindow();
      }, 5000);
      return this.showScoreTable();

    }

  }

  heroActions(action) {
    // console.log("Hero action " + action);
    switch (action) {
      case "pending":
        break;

      case "go":
        this.heroGo();
        break;

      case "attackOne":
        this.heroAttack();
        break;

      case "defend":
        this.heroDefend();
        break;

      case "heal":
        this.heroHeal();
        break;

      case "dead":
        this.heroDead();
        break;
    }
  }

  monsterGo() {
    if (this.monster.positionX >= this.player.positionX + 100) {
      this.monster.positionX -= 7;
    } else {
      this.setActionAndStatus("monster", "attackOne");
    }
  }

  monsterAttack() {
    this.countSecond++;
    if ((this.monster.positionX <= this.player.positionX + 100)) {
      if (this.getActionAndStatus("hero") === "defend" || this.getActionAndStatus("hero") === "heal") {
        if (this.countSecond > 15) {
          this.setActionAndStatus("hero", "hit");
          this.monster.attack(this.player);
        }
        if (this.countSecond > 30) {
          this.setActionAndStatus("monster", "pending");
          this.showUserTurnScreen();
          this.countSecond = 0;
          this.monster.drawDamage.scaleOffset = null;
          this.monster.drawDamage.posYOffset = null;
        }

      } else {
        if (this.player.lives > 0) {
          this.setActionAndStatus("hero", "hit");
        }
        if (this.countSecond < 2) {
          this.monster.attack(this.player);
        }
        if (this.countSecond > 2 && this.countSecond < 15) {
          this.monster.drawDamage(this.monster.lastDamage, this.player);
        }
        if (this.countSecond > 15) {
          this.setActionAndStatus("monster", "pending", false);
          this.showUserTurnScreen();
          this.countSecond = 0;
          this.monster.drawDamage.scaleOffset = null;
          this.monster.drawDamage.posYOffset = null;
        }
      }
    } else {
      this.setActionAndStatus("hero", "pending");
      this.setActionAndStatus("monster", "pending");
    }
  }

  monsterDead() {
    this.countSecond++;
    this.hideUserTurnScreen();
    this.showFinalScreen("win");

    if(this.countSecond < 2) {
      this.winSound.play();
    }
    if (this.countSecond > 15) {
      this.init();
      state.user.score++;
      this.countSecond = 0;
    }

  }

  monsterActions(action) {
    // console.log("Monster action " + action);
    switch (action) {
      case "go":
        this.monsterGo()
        break;
      case "attackOne":
        this.monsterAttack();
        break;
      case "dead":
        this.monsterDead();
        break;
    }
  }

  setActionAndStatus(who, whatAction) {
    state.actionStatus[who].currentAction = whatAction;
  }

  /**
   *
   *
   * @param {*} who
   * @returns
   * @memberof Game
   */
  getActionAndStatus(who) {
    return state.actionStatus[who].currentAction;
  }

  showScoreTable() {
    const getScore = JSON.parse(localStorage.getItem('user'));

    const html = `
      <div class="score-wrapper">
      <h1>Топ 10 игроков</h1>
        <ul class="score__list">
          ${getScore.map(score => {
            return `
              <li class="score__item">${score.name} - ${score.score}</li>
            `
          }).slice(0,10).join('')}
        </ul>
      </div>
    `
    dom.modal.insertAdjacentHTML("afterbegin", html);
    this.wControl.showModalWindow();
  }

  showUserTurnScreen() {
    const html = `
      <div class="action-choice">
        <div class="action-choice__attack" id="attack-card"><span class="action-choice__describe">Атаковать</span></div>
        <div class="action-choice__shield" id="shield-card"><span class="action-choice__describe">Защититься</span></div>
        <div class="action-choice__healing" id="healing-card"><span class="action-choice__describe">Подлечиться</span></div>
      </div>
    `;

    dom.taskWindow.classList.add('show');
    dom.taskWindow.insertAdjacentHTML('afterbegin', html);
  }


  hideUserTurnScreen() {
    dom.taskWindow.innerHTML = "";
    dom.taskWindow.classList.remove('show');
  }


  render() {
    this.setBackground();

    this.monster.drawMonster();
    this.player.drawPlayer();
  }


  setImages(target, images) {
    if (!Array.isArray(images)) return;

    images.forEach(image => {
      const img = new Image();
      img.src = image;
      target.push(img);
    });

  }

  saveSpriteData(target, json) {
    const spriteJson = json;
    const sprite = new Image();
    sprite.src = `img/${spriteJson.meta.image}`;
    target.push([spriteJson, sprite]);
  }

  loopMovement(who, action) {

    for (let part in actionConfig[who][action]) {
      for (let property in actionConfig[who][action][part]) {
        let currentPart = actionConfig[who][action][part][property];

        if (currentPart.direction) {
          currentPart.value += currentPart.step;
        } else {
          currentPart.value -= currentPart.step;
        }

        if (currentPart.value > currentPart.max) {
          currentPart.direction = !currentPart.direction;
        }
        if (currentPart.value < currentPart.min) {
          currentPart.direction = !currentPart.direction;
        }
      }
    }
  }

  getBackground() {
    this.setImages(state.backgrounds, [
      'img/battleBgFive.jpg',
      'img/battleBg.png',
      'img/battleBgSix.jpg',
      'img/battleBgTwo.jpg',
      'img/battleBgFour.png',
      'img/battleBgSeven.png',
      'img/battleBgThree.jpg'
    ]);
    this.bgImg = state.backgrounds[random(state.backgrounds.length - 1)];
  }

  setBackground() {
    this.context.drawImage(this.bgImg, 0, 0, this.canvas.width, this.canvas.height);
  }

  getPlayerName() {
    const html = `
    <div class="task-wrapper">
    <div class="task">
      <div class="task__title"><h1>Введите Ваш Никнэйм<h1></div>
      </div><div class="task__answer form">
        <form action="#">
        <div class="task__inputs">
        <label for="answer">
          <input id="user-answer" autofocus class="task__input" type="text" name="answer" placeholder="Впиши в меня" required>
          </label>
          </div>
          <button class="task__button--enter">Ввойти</button>
          </form>
      </div>
    </div>
  </div>
    `;
    dom.modal.insertAdjacentHTML("afterbegin", html);
    this.wControl.showModalWindow();
    return html;
  }
}