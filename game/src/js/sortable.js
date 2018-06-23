import {
  state
} from './state';
import _ from 'lodash';


export default class SortLetters {
  constructor() {
    this.task = {};
  }

  getWord() {
    this.task.word = state.dictionary.sortLetters[_.random((state.dictionary.sortLetters.length - 1))];
    this.task.shuffledWord = _.shuffle(this.task.word.split(""));
  }

  render() {
    this.getWord();

    let html = `
    <div class="task-wrapper">
    <div class="task">
      <div class="task__title"><h1>Расстановите в правильном порядке<h1></div>
        <form action="#">
        <div class="task__inputs">
        <ul id="sortable" class="task__letters">
          ${this.task.shuffledWord.map(letter => {
            return `<li class="ui-state-default task__letter">${letter}</li>`;
          }).join("")}
          </ul>
          </div>
          <button data-type="sort" class="task__button--submit">Проверить</button>
          </form>
      </div>
      <div class="task__answer-placeholder" id="answer" data-answer="${this.task.word}"></div>
    </div>
  </div>
    `;


    
    return html;
  }



}