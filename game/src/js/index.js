import {
  dom
} from './dom';
import Game from './game';
import {
  state
} from './state';
import Task from './tasks';
import SFX from './sounds';
import _ from 'lodash';
import {
  WindowControl
} from './utils';

import '../sounds/task-opened-1.mp3';
import '../sounds/task-opened-2.mp3';
import '../sounds/task-opened-3.mp3';
import '../sounds/right-answer-1.mp3';
import '../sounds/right-answer-2.mp3';
import '../sounds/wrong-answer-1.mp3';
import '../sounds/wrong-answer-2.mp3';
import '../sounds/wrong-answer-3.mp3';
import '../sounds/wrong-answer-4.mp3';
import '../sounds/wrong-answer-5.mp3';
import '../sounds/finish-him.mp3';


import '../styles/main.scss';

window.onload = () => {
  const game = new Game();
  const wControl = new WindowControl()
  const taskOpenedSound = new SFX({
    src: `sounds/task-opened-${_.random(1,3)}.mp3`,
    loop: false,
    volume: state.options.volumeSounds
  });
  const rightAnswerSound = new SFX({
    src: `sounds/right-answer-${_.random(1,2)}.mp3`,
    loop: false,
    volume: state.options.volumeSounds
  });
  const wrongAnswerSound = new SFX({
    src: `sounds/wrong-answer-${_.random(1,5)}.mp3`,
    loop: false,
    volume: state.options.volumeSounds
  });
  const finishHimSound = new SFX({
    src: `sounds/finish-him.mp3`,
    loop: false,
    volume: state.options.volumeSounds
  });

  fetch('./assets/names.json')
    .then(res => {
      return res.json();
    })
    .then(json => {
      state.nameBase = json;
      return fetch('assets/monsterPack.json').then(res => {
        return res.json();
      });
    })
    .then(
      json => {
        game.saveSpriteData(state.monsters, json);
        return fetch('assets/hero.json').then(res => {
          return res.json();
        })
      })
    .then(json => {
      game.saveSpriteData(state.monsters, json);
      return fetch('assets/dictionary.json').then(res => {
        return res.json();
      });
    })
    .then(res => {
      console.log(state);
      state.dictionary.english = res.english;
      state.dictionary.sortLetters = res.sortLetters;
      state.listening = res.listening;
      game.init();
    });

  dom.taskWindow.addEventListener("click", e => {
    const target = e.target;
    e.preventDefault();

    // Проверяем экшн
    if (target.closest('div').className.includes("action-choice__")) {
      const currentElement = target.closest('div');
      state.currentAction = currentElement.id;
      switch (state.currentAction) {
        case "attack-card":
          state.currentTask = new Task();
          taskOpenedSound.play();
          state.currentTask.renderTask();

          break;
        case "shield-card":
          state.currentTask = new Task();
          taskOpenedSound.play();
          state.currentTask.renderTask();

          break;
        case "healing-card":
          state.currentTask = new Task();
          taskOpenedSound.play();
          state.currentTask.renderTask();

          break;
      }
      currentElement.classList.add('active');
      game.hideUserTurnScreen();

    }

  });

  dom.overlay.addEventListener('click', e => {
    // Проверяем форму с заданиями
    e.preventDefault();
    const target = e.target;

    if (target.classList.contains('task__button--submit') &&
      document.querySelector("#user-answer")) {
      const userInput = document.querySelector("#user-answer");
      const inputValue = userInput.value.includes(" ") ? userInput.value.replace(" ", "") : userInput.value;
      const answerHolder = document.querySelector("#answer");
      const answer = answerHolder.dataset.answer;

      // Если инпут цифровой
      if (userInput.type == "number" || state.currentTask.taskType == "Listening" 
      || state.currentTask.taskType == "MissedLetters") {
        testAnswer(answerHolder, answer, () => inputValue == answer);
      } // Если инпут текстовый
      else if (userInput.type = "text") {
        testAnswer(answerHolder, answer, () => answer.split(",").includes(inputValue));
      }

    } else if (target.classList.contains('task__button--submit') &&
      target.dataset.type === "sort") {

      const answerHolder = document.querySelector("#answer");
      const answer = answerHolder.dataset.answer;

      const letters = Array.from(document.querySelectorAll('.task__letter'), letter => {
        return letter.textContent;
      }).join("");
      testAnswer(answerHolder, answer, () => letters == answer);

    } else if (target.closest("#listening-play-button")) {
      state.currentTask.task.play();
    }
    //Авторизация
    if (target.classList.contains('task__button--enter')) {

      const userInput = document.querySelector("#user-answer");
      const inputValue = userInput.value;

      game.player.name = inputValue;

      state.user = {
        name: inputValue,
        score: 0
      }

      if (!window.localStorage.getItem("user")) {
        window.localStorage.user = JSON.stringify([state.user]);
        console.log(window.localStorage.getItem("user"));
      } else {
        const data = JSON.parse(window.localStorage.getItem("user"));
        data.push(state.user);
        window.localStorage.setItem("user", JSON.stringify(data));

      }
      wControl.closeModalWindow();
    }

  });


  function testAnswer(target, answer, cb) {
    if (cb()) {
      target.textContent = "👍 Верно! 👌";
      state.answer = true;
      rightAnswerSound.play();
      if (game.monster.lives <= 7) {
        finishHimSound.play();
      }
    } else {
      target.textContent = `💩 Не верно! Правильный ответ: ${answer} 💩`;
      state.answer = false;
      wrongAnswerSound.play();
    }

    setTimeout(() => {
      wControl.closeModalWindow();
      currentAction(state.currentAction);
    }, 2000);
  }

  function currentAction(actionCard) {
    let action = "";
    switch (actionCard) {
      case "attack-card":
        action = "go";
        break;
      case "shield-card":
        action = "defend";
        break;
      case "healing-card":
        action = "heal";
        break;
    }

    state.gameStatus = true;

    if (state.gameStatus && state.answer) {
      game.setActionAndStatus("hero", action);
      game.setActionAndStatus("monster", "go");
    } else if (state.gameStatus && !state.answer) {
      game.setActionAndStatus("hero", "pending");
      game.setActionAndStatus("monster", "go");
    }
    state.gameStatus = false;

  }

};