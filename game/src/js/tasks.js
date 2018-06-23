import {
  dom
} from './dom';
// import $ from 'jquery/dist/jquery';
// import 'jquery-ui';
// import 'jquery-ui/ui/widgets/draggable';
// import 'jquery-ui/ui/disable-selection';
import 'jquery-ui-bundle';

import mathTask from './mathTask';
import {
  WindowControl
} from './utils';
import TranslateTask from './translate';
import SortLetters from './sortable';
import Listening from './listening';
import MissedLetters from './missedLetters';

export default class Tasks {
  constructor() {
    this.taskType = "";
    this.task = {};
    this.wControl = new WindowControl();
  }

  getTasks(value) {
    switch (value) {
      case "Math":
        this.taskType = "Math";
        this.task = new mathTask();
        break;
      case "Translate":
        this.taskType = "Translate";
        this.task = new TranslateTask();
        break;
      case "Sort":
        this.taskType = "Sort";
        this.task = new SortLetters();
        setTimeout(() => {

          $(function () {
            $("#sortable").sortable();
          });

        }, 1000)
        break;
      case "Listening":
        this.taskType = "Listening";
        this.task = new Listening();
        break;
      case "MissedLetters":
        this.taskType = "MissedLetters";
        this.task = new MissedLetters();
        break;
      default:
        this.taskType = "Math";
        this.task = new mathTask();
    }
  }

  renderTask() {
    this.getTasks(["Math", "Translate", "Sort", "Listening", "MissedLetters"][_.random(4)]);
    dom.modal.insertAdjacentHTML("afterbegin", this.task.render());
    this.wControl.showModalWindow();
  }
}