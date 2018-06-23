import _ from 'lodash';

export default class mathTask {
  constructor() {
    this.operation = '';
    this.title = '';
    this.expr = {};
  }

  getOperation() {
    this[['divide', 'multiply', 'add', 'subtract', 'square', 'squareRoot'][_.random(5)]]();
  }

  getTask() {
    this.getOperation();
    return this.expr;
  }

  divide() {
    this.operation = '/';
    this.expr = {
      name: 'divide',
      question: {
        x: _.random(99),
        y: _.random(1, 9)
      },
      get answer() {
        return this.question.x / this.question.y
      }
    }

    while (this.expr.question.x % this.expr.question.y) 
    {
      this.divide();
    }
  }

  multiply() {
    this.operation = '*';
    this.expr = {
      name: 'multiply',
      question: {
        x: _.random(99),
        y: _.random(1, 9)
      },
      get answer() {
        return this.question.x * this.question.y
      }
    }
  }

  add() {
    this.operation = '+';
    this.expr = {
      name: 'add',
      question: {
        x: _.random(999),
        y: _.random(999)
      },
      get answer() {
        return this.question.x + this.question.y
      }
    }
  }

  subtract() {
    this.operation = '-';
    this.expr = {
      name: 'subtract',
      question: {
        x: _.random(999),
        y: _.random(999)
      },
      get answer() {
        return this.question.x - this.question.y
      }
    }
  }

  square() {
    this.operation = '';
    this.expr = {
      name: 'square',
      question: {
        x: _.random(12)
      },
      get answer() {
        return Math.pow(this.question.x, 2);
      }
    }
    while(!Number.isInteger(this.expr.answer)) {
      this.square();
    }

  }

  squareRoot() {
    this.operation = '';

    this.expr = {
      name: 'squareRoot',
      question: {
        x: _.random(144),
      },
      get answer() {
        return Math.sqrt(this.question.x);
      }
    }

    while(!Number.isInteger(this.expr.answer)) {
      this.squareRoot();
    }
  }

  getTaskTitle() {
    switch (this.expr.name) {
      case 'divide':
        this.title = "Выполните деление";
        break;
      case 'multiply':
        this.title = "Выполните умножение";
        break;
      case 'add':
        this.title = "Выполните сложение";
        break;
      case 'subtract':
        this.title = "Выполните вычитание";
        break;
      case 'square':
        this.title = "Возведите в квадрат";
        break;
      case 'squareRoot':
        this.title = "Вычислите квадратный корень";
        break;
    }
  }
  //['divide', 'multiply', 'add', 'subtract', 'square', 'squareRoot']
  render() {

    this.getTask();
    this.getTaskTitle();

    let html = `
    <div class="task-wrapper">
    <div class="task">
      <div class="task__title"><h1>${this.title}<h1></div>
        <div class="task__question">
        `;

    let twoNumbers = `
          <span class="task__first-number">${this.expr.question.x}</span> 
          <span class="task__operation">${this.operation}</span> 
          <span class="task__second-number">${this.expr.question.y}</span>
        `;

    let oneNumber = `
        <span class="task__first-number">${this.expr.question.x}</span> 
        `;

    html += (this.expr.name == "square" || this.expr.name == "squareRoot") ? oneNumber : twoNumbers;

    html += `</div><div class="task__answer form">
        <form action="#">
        <div class="task__inputs">
        <label for="answer">
          <input id="user-answer" autofocus class="task__input" type="number" name="answer" placeholder="Впиши в меня" required>
          </label>
          </div>
          <button class="task__button--submit">Проверить</button>
          </form>
      </div>
      <div class="task__answer-placeholder" id="answer" data-answer="${this.expr.answer}"></div>
    </div>
  </div>
    `;

    return html;
  }


}