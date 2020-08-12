export const radioPlayerInit = () => {

    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item'); //получаем все радиостанции
    const radioStop = document.querySelector('.radio-stop');

    //работа с конструктором аудио
    const audio = new Audio(); //новый обьект Audio
    audio.type = 'audio/aac'; //потоковое радио

    radioStop.disabled = true; //затемнить кнопку плей, если не выбрана волна(по умолчанию)



    //смена иконки "плей"
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play'); //запуск анимации иконки радио(черный круг)
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    //отметка выбора станции(показ кружка)
    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select'); //показ серого кружка - отметка, что выбранно
    };

    //выбор радиостанции
    radioNavigation.addEventListener('change', (event) => {
        const target = event.target;

        //переключение по станциям, отслеживание
        const parrent = target.closest('.radio-item'); //поиск ближайшего елемента в списке
        //console.log(parrent);
        selectItem(parrent);

        //смена титула(Выбери радиостанцию) на выбранную станцию
        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        //смена стандартной иконки(черной) на выбранную станцию
        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false; //разблокировать кнопку при выборе станции
        //console.log('hello');
        //console.log(event);
        //console.log(event.target);
        //console.log(target.dataset.radioStantion);
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };

};