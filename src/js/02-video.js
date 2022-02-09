// Импортируем в файл:
import throttle from "lodash.throttle";
import Player from '@vimeo/player';
import * as storage from '../services/localStorage';

// Получаем ссылку на iframe
const iframe = document.querySelector('iframe');

// Создаем экземпляр класса
const player = new Player(iframe);

// Вводим константу для ключа локального хранилища
const CURRENT_TIME_PLAYER = 'videoplayer-current-time';

// Функциядля сохранения в локальное хранилище времени просмотра
const onPlay = function (data) {
    storage.save(CURRENT_TIME_PLAYER, JSON.stringify(data.seconds));
};
// Вешаем слушателя события timeupdate с колбеком onPlay
player.on('timeupdate', throttle(onPlay, 1000));

// Функция из @vimeo/player для возобновления воспроизведения видео с места остановки (время получаем из локального хранилища)
player.setCurrentTime(JSON.parse(storage.get(CURRENT_TIME_PLAYER)) || 0);
