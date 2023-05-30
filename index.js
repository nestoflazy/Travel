// Операции с Бургером

//Нашли нужные элементы
const burgerIcon = document.querySelector(".header__wrapper__logo__burger");
const burgerMenu = document.querySelector(
  ".header__wrapper__logo__burger__elements__wrapper"
);
const burgerCloseIcon = document.querySelector(
  ".header__wrapper__logo__burger__elements__wrapper-cross"
);

//Нужна переменная отслеживать текущее состояние, по умолчанию закрыт
let burgerIsOpened = false;

//Создали функции для работы
const burgerClick = () => {
  if (burgerIsOpened) {
    burgerMenu.classList.add("hidden");
  } else {
    burgerMenu.classList.remove("hidden");
  }

  burgerIsOpened = !burgerIsOpened;
};

const closeBurger = (e) => {
  e.stopPropagation(); // Убирает "проваливание", чтобы после нажатия closeBurger не срабатывал burgerClick из-за вложенности
  burgerMenu.classList.add("hidden");
  burgerIsOpened = false;
};

//Вешаем на клик
burgerIcon.addEventListener("click", burgerClick);
burgerCloseIcon.addEventListener("click", closeBurger);

// Карусель
const carouselWrapper = document.querySelector(
  ".destinations__wrapper__carousel__items"
);
const carouselControls = document.querySelectorAll(
  ".destinations__wrapper__carousel__controls button"
);
const carouselControlsArrowLeft = document.querySelector(
  ".destinations__wrapper__carousel__controls__mobile .left"
);
const carouselControlsArrowRight = document.querySelector(
  ".destinations__wrapper__carousel__controls__mobile .right"
);

// Изначально три элемента и средний активный
const carouselItems = 3;
let activeButtonIndex = 1;

// Хотим сделать красиво, поэтому создаём функции где отслеживаем изменение размеров окна
const resizeFunction = () => {
  const carouselWidth = carouselWrapper.getBoundingClientRect().width;
  const shift = carouselWidth / carouselItems;
  const arrowShift = shift / 2 - 30;

  carouselWrapper.style.transform = `translateX(${
    shift - shift * activeButtonIndex
  }px)`;
  carouselControlsArrowLeft.style.left = `-${arrowShift}px`;
  carouselControlsArrowRight.style.left = `${arrowShift}px`;
};

// Функция сдвига слайдера
const shiftFunction = (newIndex) => {
  const carouselWidth = carouselWrapper.getBoundingClientRect().width;
  const shift = carouselWidth / carouselItems;

  carouselWrapper.style.transform = `translateX(${shift - shift * newIndex}px)`;

  carouselControls[activeButtonIndex].classList.remove("active");
  activeButtonIndex = newIndex;
  carouselControls[newIndex].classList.add("active");
};

for (let i = 0; i < carouselControls.length; i += 1) {
  carouselControls[i].addEventListener("click", () => shiftFunction(i));
}

carouselControlsArrowLeft.addEventListener("click", () => {
  if (activeButtonIndex - 1 < 0) {
    return;
  }

  shiftFunction(activeButtonIndex - 1);
});

carouselControlsArrowRight.addEventListener("click", () => {
  if (activeButtonIndex + 1 > carouselItems - 1) {
    return;
  }

  shiftFunction(activeButtonIndex + 1);
});

// Подписываемся на событие ресайза окна
window.addEventListener("resize", resizeFunction);

resizeFunction(); // Исполняем один раз вручную, чтобы при запуске в мобильном режиме сразу расположил стрелки как надо

// Модальное окно

// Находим все нужные для работы компоненты
const loginBtn = document.querySelector(".header__wrapper button");
const popup = document.querySelector(".popup");
const signInFragments = document.querySelectorAll(".sign_in");
const signUpFragments = document.querySelectorAll(".sign_up");
const signInBth = document.querySelector(".popup__wrapper__footer-sign_in-btn");
const signUpBth = document.querySelector(".popup__wrapper__footer-sign_up-btn");

// Изначально попап невидимый
let isPopupVisible = false;

// Показываем / скрываем при нажатии на кнопку логин
const changePopupType = (isPopupSignIn = true) => {
  if (isPopupSignIn) {
    for (let fragment of signUpFragments) {
      fragment.style.display = "none";
    }
    for (let fragment of signInFragments) {
      fragment.style.display = "block";
    }

    // Зануляем инлайновые стили, чтобы высота увеличилась
    popup.style.width = "";
    popup.style.height = "";
  } else {
    for (let fragment of signInFragments) {
      fragment.style.display = "none";
    }
    for (let fragment of signUpFragments) {
      fragment.style.display = "block";
    }
    // Принудительно меняем высоту (резиновый дизайн не делался)
    popup.style.width = "650px";
    popup.style.height = "436px";
  }
};

const togglePopup = (e) => {
  e.stopPropagation();

  if (isPopupVisible) {
    popup.classList.add("hidden");
  } else {
    popup.classList.remove("hidden");
  }

  isPopupVisible = !isPopupVisible;
};

loginBtn.addEventListener("click", togglePopup);

signInBth.addEventListener("click", () => changePopupType(false));

signUpBth.addEventListener("click", () => changePopupType(true));

// Всегда закрываем при нажатии вне области попапа
document.querySelector("main").addEventListener("click", () => {
  if (popup.classList.contains("hidden")) {
    return;
  }
  popup.classList.add("hidden");
  isPopupVisible = false;
});

changePopupType();
