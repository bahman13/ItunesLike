import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    //создание массива файлов из папки аудио? так как без сервера(js не считывает названия файлов в папке)

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    //получение и проверка треков, названия, изображения
    const loadTrack = () => {
        const isPlayed = audioPlayer.paused; //играла ли музыка когда переключили трек
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`; //смена картинки
        audioHeader.textContent = track.toUpperCase(); //смена текста
        audioPlayer.src = `./audio/${track}.mp3`; //смена песни

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };



    //работа с переключением музыки кликом и ползунком
    const prevTrack = () => {
        if (trackIndex !== 0) { //если trackIndex не равен 0 то
            trackIndex--; // то убавляем на 1
        } else {
            trackIndex = playlist.length - 1; //а если равен 0, то проверить сколько всего треков
        }
        loadTrack(); //ф-ция запуска музыки
    }

    //работа с переключением музыки кликом и ползунком
    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) { //а если первая песня, то переключить на следующую
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack(); //ф-ция запуска музыки
    };

    //функция возврата значение минут и секунд с 0, если меньше 10 в отдельном файле, потом експорт

    //упревление треками(запуск и прочее)
    audioNavigation.addEventListener('click', (event) => {
        const target = event.target; //создание переменной target внутри ф-ции

        if (target.classList.contains('audio-button__play')) { //если нажатие на play, то
            audio.classList.toggle('play'); //toggle - если класс такой есть, то уберет, если не то добавит
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) { //если стоит на паузе, то:
                audioPlayer.play(); //проиргывать
            } else { // иначе
                audioPlayer.pause(); //нажать паузу
            }
            const track = playlist[trackIndex]; //определить какой индекс трека
            audioHeader.textContent = track.toUpperCase(); //название большими буквами
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }
        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    //если трек закончился
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    //прогресс бар
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%'; //отображение прогресса 
        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';

        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        //вывод полученных выше данных на страницу
        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

    });


    //перемотка по прогресс бару
    audioProgress.addEventListener('click', (event) => {
        const x = event.offsetX; //определить место клика(точные координаты)
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    //добавление метода в функции, для остановки плеера при переключении
    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) { //проверка логическим отрицанием  
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }
    };

};