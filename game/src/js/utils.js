import {dom} from './dom';

export class Utils {
  constructor() {
    this.animationStart = performance.now();
  }
}

export class WindowControl {
  showModalWindow() {
    dom.overlay.classList.add('show');
  }

  closeModalWindow() {
    dom.overlay.classList.remove('show');
    dom.modal.innerHTML = '';
  }
}


export const random = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const rotatingPart = (context, part, rotatePart, x, y) => {
  // context.save();
  context.translate(x, y);
  const pivotX = part.frame.w * part.pivot.x;
  const pivotY = part.frame.h * part.pivot.y;

  // showPivotPoint(context, 2, pivotX, pivotY, 'green');

  context.translate(pivotX, pivotY);
  context.rotate(rotatePart * Math.PI / 180);
  context.translate(-pivotX, -pivotY);
  // context.restore();
};

export const showPivotPoint = (context, radius, x, y, color) => {
  context.fillStyle = color;
  context.font = "10px arial";
  context.arc(x, y, radius, 0, Math.PI / 180 * 360);
  context.closePath();
  context.fillText(`${x}, ${y}`, x, y);
  context.fill();
};

export const drawEllipse = (context, centerX, centerY, width, height) => {

  context.beginPath();

  context.moveTo(centerX, centerY - height / 2);

  context.bezierCurveTo(
    centerX + width / 2, centerY - height / 2,
    centerX + width / 2, centerY + height / 2,
    centerX, centerY + height / 2);

  context.bezierCurveTo(
    centerX - width / 2, centerY + height / 2,
    centerX - width / 2, centerY - height / 2,
    centerX, centerY - height / 2);

  context.fillStyle = "black";
  context.fill();
  context.closePath();
};

export class LocalStorageHelper {
  saveToLS(name, object) {
    const strOjbect = JSON.stringify(object);
    const objectLength = strOjbect.length;
    if(localStorage.getItem(name).length !== objectLength) {
      localStorage.setItem(name, strOjbect);
    }
  }

  getFromLS(name) {
    return JSON.parse(localStorage.getItem(name));
  }

  checkDataInStorage(name) {
    return !!localStorage.getItem(name);
  }
}