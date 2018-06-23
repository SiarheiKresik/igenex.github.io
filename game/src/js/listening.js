import {
  state
} from './state';
import _ from 'lodash';

export default class Listening {
  constructor() {
    this.currentWord = state.listening[_.random((state.listening.length - 1))];
    this.synth = window.speechSynthesis;
    this.pitch = 1;
    this.rate = 1;
    this.voice = this.synth.getVoices()[3];
    this.utter = new SpeechSynthesisUtterance(this.currentWord);
    this.utter.voice = this.voice;
    this.utter.pitch = this.pitch;
    this.utter.rate = this.rate;
  }

  play() {
    this.synth.speak(this.utter);
  }

  render() {
    let html = `
    <div class="task-wrapper">
    <div class="task">
      <div class="task__title"><h1>Распознайте слово и впишите ответ<h1></div>
        <div class="task__question">
          <button class="task__button--play" id="listening-play-button">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <title>controller-play</title>
          <path d="M15 10.001c0 0.299-0.305 0.514-0.305 0.514l-8.561 5.303c-0.624 0.409-1.134 0.106-1.134-0.669v-10.297c0-0.777 0.51-1.078 1.135-0.67l8.561 5.305c-0.001 0 0.304 0.215 0.304 0.514z"></path>
          </svg>
          </button>
        </div>
        <div class="task__answer form">
        <form action="#">
        <div class="task__inputs">
        <label for="answer">
          <input id="user-answer" autofocus class="task__input" type="text" name="answer" placeholder="Впиши в меня" required>
          </label>
          </div>
          <button class="task__button--submit">Проверить</button>
          </form>
      </div>
      <div class="task__answer-placeholder" id="answer" data-answer="${this.currentWord}"></div>
    </div>
  </div>
    `;

    return html;
  }


}