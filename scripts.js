"use strict";

// скрипт перетаскивания
window.onload = function (e) {
  //Сделайте элемент DIV перетаскиванием:
  let container = document.querySelector(`#container`); //основной блок калькулятора (КР)
  let captureContainer = document.querySelector(`#captureContainer`); //область для активации перемещения блока
  let display = document.querySelector(".calc__display"); //окно ввода данных
  let buttons = document.querySelector(".calc__button"); // коллекция кнопок
  let arrayButtons = Array.from(buttons.children); // массив элементов кнопка
  let interimResult = document.querySelector("output");
  arrayButtons.map((a) => result(a)); //на кнопки навешиваю событие клика

  let [sum, min, mult, del, res] = arrayButtons;
  let flagZnak = true;
  let flagRes = true;
  let flag = true;
  let resFunc = 0;

  let results = 0;
  //когда фокус в форме "placeholder" обнуляется
  if (flag) {
    display.addEventListener("focus", () => {
      display.placeholder = "";
      flag = false;
    });
  }
  // display.addEventListener("blur", () => {
  //   display.value = "";
  // });
  //
  function result(q) {
    q.addEventListener("click", () => {
      if (flagRes || typeof resFunc === "number") {
        resFunc = mathAction(q.dataset.sing, display.value);
        display.value = null;
        display.focus();
        flagRes = false;
        if (q.dataset.sing === "reset") {
          interimResult.textContent = 0;
          flagRes = true;
        }
      } else if (typeof resFunc != "number") {
        results += resFunc(display.value);
        interimResult.textContent = results;
        if (q.dataset.sing === "=") {
          display.value = results;
          results = 0;
        } else {
          display.value = null;
          display.focus();
        }

        flagRes = true;
      } else {
      }
      return q;
    });
  }

  function mathAction(sing, arg) {
    let res = {
      "+": (x) => (y) => -1 * (-x - y),
      "-": (x) => (y) => x - y,
      "*": (x) => (y) => x * y,
      "/": (x) => (y) => x / y,
      "=": () => results,
      reset: () => ((resFunc = 0), (results = 0)),
    }[sing](arg);
    return res;
  }

  // функция перетаскивания
  dragElement(container, captureContainer);
  function dragElement(elmnt, capture) {
    let [pos1, pos2, pos3, pos4] = [0, 0, 0, 0];
    capture.onmousedown = dragMouseDown;
    // let evt = e || window.event;
    function dragMouseDown(evt) {
      // получить позицию курсора мыши при запуске:
      pos3 = evt.clientX;
      pos4 = evt.clientY;
      elmnt.classList.add("shadow");
      document.onmouseup = closeDragElement;
      // вызывать функцию всякий раз, когда курсор перемещается:
      document.onmousemove = elementDrag;
    }

    function elementDrag(evt) {
      // e = e || window.event;
      // вычислить новую позицию курсора:
      pos1 = pos3 - evt.clientX;
      pos2 = pos4 - evt.clientY;
      pos3 = evt.clientX;
      pos4 = evt.clientY;

      // установить новую позицию элемента:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      /* перестать двигаться, когда кнопка мыши отпущена:*/
      document.onmouseup = null;
      elmnt.classList.remove("shadow");
      document.onmousemove = null;
    }
  }
};
