import throttle from "lodash.throttle";

const KEY_STORAGE = 'feedback - form - state';

// Получаем ссылки на элементы
const formRef = document.querySelector('.feedback-form');

// Вешаем слушателя на форму
formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onTextInput,  1000));

// Функция, которая вызывается при загрузке страницы (для проверки введено ли что-то пользователем уже в поля формы)
populateText();

// Функция onFormSubmit, не дает перегружаться браузеру, выводит в консоль данные из формы, очищает форму при срабатывании события submit, удаляет сообщение из локального хранилища
function onFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const finalData = {};
    for(const [key, value] of formData.entries()){
    if (!value) {
        alert("Все поля должны быть заполнены!!");
        return;
    }
        finalData[key] = value;
    }
    console.log(finalData);
    form.reset();
    localStorage.removeItem(KEY_STORAGE);
}

// Функция для получения значений из формы и сохранения их в localStorage
function onTextInput(event) {
    const { name, value } = event.target;
    const parsedData = JSON.parse(localStorage.getItem(KEY_STORAGE));
    if (parsedData) {
        const formData = {
        ...parsedData,
        [name] : value,    
        };
        localStorage.setItem(KEY_STORAGE, JSON.stringify(formData))
        } else {
        const formData = {[name] : value, 
        };
        localStorage.setItem(KEY_STORAGE, JSON.stringify(formData))
    }
}

// Функция, которая вытягивает из localStorage сохраненные данные и если они есть, то записывает их в соответствующие поля формы
function populateText() {
    const parsedData = JSON.parse(localStorage.getItem(KEY_STORAGE));
    if (parsedData) {
        const inputNames = Object.keys(parsedData);
    inputNames.forEach(inputName => {
        const input = formRef.elements[inputName];
        input.value = parsedData[inputName];
    });
    }

}

