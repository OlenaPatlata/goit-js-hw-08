import throttle from "lodash.throttle";
import '../css/03-feedback.css';

// Получаем ссылки на элементы
const formRef = document.querySelector('.feedback-form');
const inputEmailRef = formRef.elements.email;
const inputMessageRef = formRef.elements.message;


// Вешаем слушателя на форму
formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onTextInput,  1000));

// Функция, которая вызывается при загрузке страницы (для проверки введено ли что-то пользователем уже в поля формы)
populateText();

// Функция onFormSubmit, не дает перегружаться браузеру, очищает форму при срабатывании события submit, удаляет сообщение из локального хранилища
function onFormSubmit(event) {
    event.preventDefault();

    if (!inputEmailRef.value || !inputMessageRef.value) {
        alert("Все поля должны быть заполнены!!");
        return;
    }
    event.currentTarget.reset();
    localStorage.removeItem('feedback - form - state');
}

// Функция для получения значений из формы и сохранения их в localStorage
function onTextInput(event) {
    const formData = {}
    formData[inputEmailRef.name] = inputEmailRef.value;
    formData[inputMessageRef.name] = inputMessageRef.value;
    localStorage.setItem('feedback - form - state', JSON.stringify(formData))
}

// Функция, которая вытягивает из localStorage сохраненные данные и если они есть, то записывает их в соответствующие поля формы
function populateText() {
    const savedData = JSON.parse(localStorage.getItem('feedback - form - state'))
    console.log(savedData);
    if (savedData) {
        inputEmailRef.value = savedData[inputEmailRef.name];
        inputMessageRef.value = savedData[inputMessageRef.name];
    }
}

