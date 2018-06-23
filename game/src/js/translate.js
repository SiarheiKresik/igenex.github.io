import {
  state
} from './state';
import _ from 'lodash';

export default class TranslateTask {
  constructor() {
    this.title = '';
    this.task = {
      word: '',
      translation: ''
    };
  }

  getEnglishWord() {
    const keys = Object.keys(state.dictionary.english);
    this.task.word = keys[_.random((keys.length - 1))];
    this.task.translation = state.dictionary.english[this.task.word];
  }

  render() {

    this.getEnglishWord();

    let html = `
    <div class="task-wrapper">
    <div class="task">
      <div class="task__title"><h1>Переведите слово<h1></div>
        <div class="task__question"><h2>${this.task.word}</h2></div><div class="task__answer form">
        <form action="#">
        <div class="task__inputs">
        <label for="answer">
          <input id="user-answer" autofocus class="task__input" type="text" name="answer" placeholder="Впиши в меня" required>
          </label>
          </div>
          <button class="task__button--submit">Проверить</button>
          </form>
      </div>
      <div class="task__answer-placeholder" id="answer" data-answer="${this.task.translation}"></div>
    </div>
  </div>
    `;

    return html;
  }
}