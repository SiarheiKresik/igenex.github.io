import _ from 'lodash';
import { state } from './state';

export default class MissedLetters {
  constructor() {
    this.allWords = state.dictionary.sortLetters;
    this.currentWord = this.allWords[_.random((this.allWords.length - 1))];
    this.wordLength = this.currentWord.length;
    this.randomLettersNum = Array.from({
      length: 3
    }, () => {
      return _.random(this.wordLength);
    });
    this.answer = [];
    this.questionWord = this.currentWord.split("").map((letter, i) => {
      if (this.randomLettersNum.includes(i)) {
        this.answer.push(letter);
        return " . ";
      } else return letter;
    }).join("");

  }

  render() {

    let html = `
    <div class="task-wrapper">
    <div class="task">
      <div class="task__title"><h1>Введите пропущенные буквы через запятую<h1></div>
        <div class="task__question"
        <span class="task__first-number">${this.questionWord}</span>
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
      <div class="task__answer-placeholder" id="answer" data-answer="${this.answer}"></div>
    </div>
  </div>
    `;

    return html;
  }


}