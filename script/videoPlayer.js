import { addZero } from './supScript.js';

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');


    //смена иконки пауза/старт
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-pause');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-pause');
        }
    };

    //ф-ция для активации плеера
    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    //работа с кнопкой "стоп"
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    //просчет и отображение в формате 00:00
    //условие   ? (условие верно)   :(условие ложь)
    const addZero = n => n < 10 ? '0' + n : n;

    //события для активация плеера кликом
    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);


    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime; //получение времени
        const duration = videoPlayer.duration;
        // console.log(currentTime);
        //   console.log(duration);

        //прогресс бар
        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60); //округление до минут
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60); //округление до минут
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; //шаблонная строка
        videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal); //конкатинация

    });

    //перемотка видео, по ползунку
    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoPlayerInit.stop = () => {
        if (!videoPlayer.paused) {
            stopPlay();
        }
    };



};
/*еще 1 способ экспорта
  export default videoPlayerInit;
  тогда в основном файле:
  import videoPlayerInit from './videoPlayer.js';
  */