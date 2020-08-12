'use strict'
import { radioPlayerInit } from './radioPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
//console.log(playerBtn);
const playerBlock = document.querySelectorAll('.player-block');
//console.log(playerBlock);
const temp = document.querySelector('.temp');





//================ убрать active(класс отвечает за видимость) если он имеется ==================
const deactivationPlayer = () => {
    temp.style.display = 'none'; //скрыть надпись "Медиа портал ЯTunes" при выборе плеера
    playerBtn.forEach((item) => {
        item.classList.remove('active')
    });
    playerBlock.forEach((item) => {
        item.classList.remove('active')
    });

    //остановить проигрыватель при переключении на другой
    //тут вызов методов для пауз, сами методы внутри видео/аудио/муз плееров
    musicPlayerInit.stop();
    videoPlayerInit.stop();
    radioPlayerInit.stop();
};





//============ активировать плееры при нажатии ========================
//перебор методом forEach, выполнится столько раз, сколько елементов в массиве
//forEach для работы сразу со всем нужными кнопками 
playerBtn.forEach((btn, i) => {
    //  console.log(btn);
    // console.log(i);
    //    console.log(playerBlock[i]);
    btn.addEventListener('click', () => {
        deactivationPlayer();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');
    });
});





videoPlayerInit();
musicPlayerInit();
radioPlayerInit();