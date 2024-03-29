document.addEventListener('DOMContentLoaded',() => {
    //tabs
    const headerList = document.querySelector('.tabheader__items'),
          tabs = headerList.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent');
    
    function start(){
        hide();
        show();
    }

    function hide(){
        tabContent.forEach((item,i) => {
            item.classList.add('hide');
            item.classList.remove('show');
            tabs[i].classList.remove('tabheader__item_active');
            item.classList.remove('fade');
        });
    }
    function show(i = 0){
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show');
        tabs[i].classList.add('tabheader__item_active');
        tabContent[i].classList.add('fade');
        
    }
    headerList.addEventListener('click',(e) => {
        tabs.forEach((item,i) => {
            if(e.target && e.target == item){
                hide();
                show(i);
            }
        });
    });
    start();

    // TIMER
    const dateEnd = '2021-05-05';
    let timer;
    function setZero(num){
        if (num < 10 ){
            return `0${num}`;
        }else {
            return num;
        }
    }
    function clockExpr(){
        const delta = Date.parse(dateEnd) - Date.parse(new Date),
              days = Math.floor(delta /(1000*60*60*24)),
              hours = Math.floor((delta/(1000*60*60)) % 24),
              minutes = Math.floor((delta / (1000*60)) % 60),
              seconds = Math.floor((delta/1000) % 60);
        let struct = {
            'days':days,
            'hours':hours,
            'minutes':minutes,
            'seconds':seconds
        }
        if(delta <= 0){
            clearInterval(timer);
        }
        return struct;
    }
    function setClock(){
        let obj = clockExpr();
        document.querySelector('#days').innerHTML = setZero(obj.days);
        document.querySelector('#hours').innerHTML = setZero(obj.hours);
        document.querySelector('#minutes').innerHTML = setZero(obj.minutes);
        document.querySelector('#seconds').innerHTML = setZero(obj.seconds);
    }
    timer = setInterval(setClock,1000);

    // MODAL WINDOW PRACTICE

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function showModal() {
        modal.classList.remove('hide');
        modal.classList.add('show','fade');
        document.body.style.overflow = 'hidden';
    }
    let i = 0;
    function checkInterval () {
           if((document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.documentElement.clientHeight) == 0) && (i < 1)){
                showModal();
                console.log('modal scroll');
                i++;               
           }


    }
    function hideModal() {
        modal.classList.remove('show','fade');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach((item) => {
        item.addEventListener('click',showModal);
    });
    
    modal.addEventListener('click',(e) => {
        if((e.target && e.target === modal) || e.target.getAttribute('data-close') == ''){
            hideModal();
        }
    });
    //Обработчик событий при нажатии на эскейп в тот момент 
    //когда модальное окно открыто
    document.addEventListener('keydown',(e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            hideModal();
        }
    });
   // let modalTimer = setTimeout(showModal,20000);
    let scrollCheck = setInterval(checkInterval,2000);

    //CLASSES

    class menuItem{
        constructor(bgUrl,title,descr,coast,alt){
            this.bgUrl = bgUrl;
            this.title = title;
            this.descr = descr;
            this.coast = coast;
            this.alt = alt;
        }
        make(){
            return `
            <div class="menu__item">
                    <img src="${this.bgUrl}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}"</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.coast}</span> руб/день</div>
                    </div>
            </div>
            `;
        }

    }
    const menu = document.querySelector('.menu__field .container');

    const obj3 = new menuItem('img/tabs/vegy.jpg','Меню фитнес','Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!','150 рублей','vegy');
    const obj2 = new menuItem('img/tabs/elite.jpg','Меню премиум', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!','250 рублей','elite');
    const obj1 = new menuItem('img/tabs/post.jpg','Меню постное','Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.','159 рублей','vegy');
    let array = [obj3,obj2,obj1];
    array.forEach((item)=>{
        menu.innerHTML += item.make();
    });

    // ОТПРАВКА ДАННЫХ НА СЕРВЕР С ПОМОЩЬЮ FORMDATA

  /*  const forms = document.querySelectorAll('form');

    const message = {
        loading:'Загрузка',
        sucsess:'Спасибо,скоро мы с вами свяжемся',
        failure:'Что то пошло не так...'
    };
    forms.forEach(item => {
        postData(item);
    })

    function postData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);
            
            const request = new XMLHttpRequest();
            request.open('POST','server.php');
            //request.setRequestHeader('Content-type','multipart/form-data');
            const formData = new FormData(form);

            request.send(formData);
            request.addEventListener('load',() => {
                if (request.status === 200){
                    console.log(request.response);
                    statusMessage.textContent = message.sucsess;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    },2000);
                }else {
                    statusMessage.textContent = message.failure;
                }
            });

        });
    }*/

    //ОТПРАВКА ДАННЫХ НА СЕРВЕР С ПОМОЩЬЮ ФОРМАТА JSON ------------------------------------------------------------------------------------------

    const forms = document.querySelectorAll('form');

    const message = {
        loading:'icons/spinner.svg',
        sucsess:'Спасибо,скоро мы с вами свяжемся',
        failure:'Что то пошло не так...'
    };
    forms.forEach(item => {
        postData(item);
    })

    function postData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText=`
                display:block;
                margin: 0 auto;
            `;
            form.insertAjacentElement('afterend',statusMessage);
            const formData = new FormData(form);
            // console.log(formData);
            // formData.forEach((value,key) => {
            //     prot[key] = value;
            // });
            fetch('server.php',{
                method:'POST',
                body:formData
                // headers:{
                //     'Content-type':'application/json'
                // }
            })
            .then(data => data.text())
            .then(data => {  
                console.log(data);
                showThanksModal(message.sucsess);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });


        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close data-close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            hideModal();
        },4000);
    }

    fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        body:JSON.stringify({name:'ALEX'}),
        headers:{
            'Content-type':'application/json'
        }

    })
    .then(response => response.json())
    .then(json => console.log(json));

    // SLIDER  ------------------------------------------------------------------------------------------

    const slides = document.querySelectorAll('.offer__slide')
    const currentSlide = document.querySelector('#current');
    const totalSlide = document.querySelector('#total');
    const next = document.querySelector('.offer__slider-next');
    const prev = document.querySelector('.offer__slider-prev');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;
   // const slider = document.querySelector('.offer__slider');

    let offset = 0;

    slidesField.style.width = 100 * slides.length +'%';
    slidesField.style.display = 'flex';
    slidesWrapper.style.overflow = 'hidden';
    slidesField.style.transition = '0.5s all';

    function checkNumber(offset){
        const count = (offset/width.slice(0,width.length-2)) + 1;
        if(count < 10){
            currentSlide.textContent = `0${count}`; 
        }else {
            currentSlide.textContent = count; 
        }
        if(slides.length < 10){
            totalSlide.textContent = `0${slides.length}`;
        }else {
            totalSlide.textContent = slides.length;
        }
        
    }
    function checkLi(offset){
        for(let i = 0;i < slides.length;i++){
            li[i].style.cssText += `
                opacity: .5;
            `;
        }
        li[offset/width.slice(0,width.length-2)].style.cssText += `
            opacity: 1;
        `;
    }

    const slider = document.querySelector('.offer__slider');
    slider.style.position = 'relative';
    const ol = document.createElement('ol');
    ol.classList.add('carousel-indicators');
    ol.style.cssText = `
        position: absolute;
        right:0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(ol);
    for (let i = 0; i< slides.length; i++){
        const li = document.createElement('li');
        li.setAttribute('data-slide-to',i + 1);
        li.style.cssText =`
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px ;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6 ease;
        `;
        ol.append(li);
    }
    const li = ol.querySelectorAll('li');

    ol.addEventListener('click',(e) => {
        for(let i = 0; i < slides.length;i++){
            li[i].style.cssText += `
                opacity: .5;
            `;
            if(e.target && e.target.getAttribute('data-slide-to') == i+1){
                li[i].style.cssText += `
                    opacity: 1;
                `;
                offset = width.slice(0,width.length-2) * i;
                slidesField.style.transform = `translateX(${-offset}px)`;
                checkNumber(offset);
            }
        }
    });

    next.addEventListener('click',() => {
        if(offset == +width.slice(0,width.length-2) * (slides.length-1)){
            offset = 0;
        }else {
            offset += +width.slice(0,width.length-2);
        }
        slidesField.style.transform = `translateX(${-offset}px)`;
        checkLi(offset);
        checkNumber(offset);
    });
    prev.addEventListener('click',() => {
        if(offset == 0){
            offset = +width.slice(0,width.length-2) * (slides.length-1);
        }else {
            offset -= +width.slice(0,width.length-2);
        }
        slidesField.style.transform = `translateX(${-offset}px)`;
        checkLi(offset);
        checkNumber(offset);
    });

    //CALCULATOR - Моя версия номер 1 -------------------------------------------------------------------------------------------
    // const sex = document.querySelector('#gender');
    // const activeWork = document.querySelector('.calculating__choose_big');
    // const inputValues = document.querySelector('.calculating__choose_medium');
    // const height = inputValues.querySelector('#height');
    // const weight = inputValues.querySelector('#weight');
    // const age = inputValues.querySelector('#age');
    // let total,BMR,activeLevel;
    // let gen;
    // const result = document.querySelector('.calculating__result span');


    // function calculatorInit(){
    //     document.querySelectorAll('#gender div').forEach((item) => {
    //         item.classList.remove('calculating__choose-item_active');
    //     });
    //     document.querySelectorAll('.calculating__choose_big div').forEach((item) => {
    //         item.classList.remove('calculating__choose-item_active');
    //     })
    // }
    // function checkActiveLevel(item){
    //     if (item.id == 'low'){
    //         return 1.2;
    //     }else if (item.id == 'small'){
    //         return 1.375
    //     }else if(item.id == 'medium'){
    //         return 1.55
    //     }else if (item.id == 'high'){
    //         return 1.725
    //     }
    // }

    // function acceptChanges(){
    //     if((weight.value != '' && !weight.value.match(/\D/g)) && (height.value != '' && !height.value.match(/\D/g)) && (age.value != '' && !age.value.match(/\D/g))){
    //         if(gen == 'male'){
    //             BMR = 88.36 + (13.4 * (+weight.value)) + (4.8 * (+height.value)) - (5.7 * (+age.value));
    //         }else {
    //             BMR = 447.6 + (9.2 * (+weight.value)) + (3.1 * (+height.value)) - (4.3 * (+age.value));
    //         }
    //         total = activeLevel * BMR;
    //         console.log(total);
    //         result.textContent = Math.floor(total);
    //     }  
    // }
    
    // sex.addEventListener('click',(e) => {
    //     e.preventDefault();
    //     if(e.target && (e.target.id == 'male' || e.target.id == 'female')){
    //         sex.querySelectorAll('div').forEach((item) => {
    //             item.classList.remove('calculating__choose-item_active');
    //         });
    //         e.target.classList.add('calculating__choose-item_active');
    //         if(e.target.id == 'male'){
    //             gen = 'male';
    //         }else {
    //             gen = 'female;'
    //         }
    //         acceptChanges();
    //     }
    // });
    // activeWork.addEventListener('click',(e) => {
    //     e.preventDefault();
    //     if(e.target && !e.target.classList.contains('calculating__choose_big')){
    //         activeWork.querySelectorAll('div').forEach((item) => {
    //             item.classList.remove('calculating__choose-item_active');
    //         });
    //         e.target.classList.add('calculating__choose-item_active');
    //         activeLevel = checkActiveLevel(e.target);
    //         acceptChanges();
    //     }

    // });
    // calculatorInit();

    //CALCULATOR REFACTORING------------------------------------------------------------------------------------------

    let weight,height,age,ratio,sex;
    const res = document.querySelector('.calculating__result span');

    //Функция финального подсчета всех данных,вызываться будет в каждом обработчике событий для фиксирования изменений
    function calcTotal(){
        if(sex && weight && age && ratio && height){
            if (sex == 'male'){
                res.textContent = Math.round(ratio * (88.36 + (13.4 * +weight) + (4.8 * +height) - (5.7 * +age))); 
            }else {
                res.textContent = Math.round(ratio * (447.6 + (9.2 * +weight) + (3.1 * +height) - (4.3 * +age)));
            }
        }
    }
    //Функция для установки класса активности,удаляем у всех остальных класс активности,а нужному добавляем
    function setActiveClass(elements,activeClass,currentElement){
        elements.forEach((item) => {
            item.classList.remove(activeClass);
        });
        currentElement.classList.add(activeClass);
    }
    //Функция инициализатор
    function initCalc(){
        const gender = document.querySelectorAll('#gender div');
        const active = document.querySelectorAll('.calculating__choose_big div');
        gender.forEach((item) => {
            item.classList.remove('calculating__choose-item_active');
        });
        active.forEach((item) => {
            item.classList.remove('calculating__choose-item_active')
        });
        
        //Выгружаем данные с локального хранилища и записываем значения
        if(localStorage.getItem('sex')){
            sex = localStorage.getItem('sex');
            document.querySelector(`#${sex}`).classList.add('calculating__choose-item_active');
        }
        if(localStorage.getItem('ratio')){
            ratio = localStorage.getItem('ratio');
            document.querySelector(`[data-ratio="${ratio}"]`).classList.add('calculating__choose-item_active');
        } 
        age = localStorage.getItem('age');
        document.querySelector('#age').value = age;

        height = localStorage.getItem('height');
        document.querySelector('#height').value = height;

        weight = localStorage.getItem('weight');
        document.querySelector('#weight').value = weight;

        if(sex && ratio && age && height && weight){
            calcTotal();
        }else {
            res.textContent = '';
        }
    }
    //Функция по получению пола 
    function getGender(genderSelector){
        const elements = document.querySelectorAll(`${genderSelector} div`);
        elements.forEach((item) => {
            item.addEventListener('click',(e) => {
                if(e.target && (e.target.getAttribute('id') == 'male' || e.target.getAttribute('id') == 'female')){
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex',sex);
                }
                setActiveClass(elements,'calculating__choose-item_active',e.target);
                calcTotal();  
            });
        });
    }
    //Функция,которая получает параметры активности со страницы,пользователь выбирает из 4 категорий активности
    function getActive(activeSelector){
        const elements = document.querySelectorAll(`${activeSelector} div`);
        elements.forEach((item) => {
            item.addEventListener('click',(e) => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',ratio);
                }
                setActiveClass(elements,'calculating__choose-item_active',e.target);
                calcTotal();  
            });
        });  
    }
    //Проверяем на введение корректности численных данных,делаем проверку на попадание "не чисел " в строке.
    function checkIncorrectInput(currentElement,inputValue){
        if(inputValue.match(/\D/g) || inputValue == ''){
            currentElement.style.cssText = 'border:solid 2px red';
            res.textContent = '';
            return ''; 
        }else {
            currentElement.style.cssText = 'border:none';
            return inputValue;
        }
    }
    //Функция для получшения параметров с окна ввода параметров тела,рост вес и т.д
    function getParams(paramsSelector){
        const inputs = document.querySelectorAll(`${paramsSelector} input`);
        inputs.forEach((item) => {
            item.addEventListener('input',(e) => {
                switch(e.target.getAttribute('id')){
                    case 'weight':
                        weight = checkIncorrectInput(e.target,item.value);
                        localStorage.setItem('weight',weight);
                        break;
                    case 'height':
                        height = checkIncorrectInput(e.target,item.value);
                        localStorage.setItem('height',height);
                        break;
                    case 'age':
                        age = checkIncorrectInput(e.target,item.value);
                        localStorage.setItem('age',age);
                        break;
                }
                calcTotal();        
            });
        });
    }
    initCalc();
    getGender('#gender');
    getActive('.calculating__choose_big');
    getParams('.calculating__choose_medium');


    //CALCULATOR - Версия из урока------------------------------------------------------------------------------------------

    // const result = document.querySelector('.calculating__result span');
    // let sex,height,weight,age,ratio;

    // function calcTotal(){
    //     if(!sex || !height || !weight || !age || !ratio){
    //         result.textContent = 'Заполните поля';
    //         return;
    //     }
    //     if(sex == 'female'){
    //         result.textContent = (447.6+(9.2 * weight)+ (3.1 * height) - (4.3*age)) * ratio;
    //     }else {
    //         result.textContent = (88.36+(13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
    //     }
    // }

    // calcTotal();

    // function getStaticInformation(parentSelector,activeClass){
    //     const elements = document.querySelectorAll(`${parentSelector} div`);

    //     document.querySelector(parentSelector).addEventListener('click',(e) => {
    //         if(e.target.getAttribute('data-ratio')){
    //             ratio = +e.target.getAttribute('data-ratio');
    //         }else {
    //             sex = e.target.getAttribute('id');
    //         }

    //         console.log(ratio,sex);
    //         elements.forEach((elem) => {
    //             elem.classList.remove(activeClass);
    //         });
            
    //         e.target.classList.add(activeClass);

    //     });
    // }

    // getStaticInformation('#gender','calculating__choose-item_active');
    // getStaticInformation('.calculating__choose_big','calculating__choose-item_active');

});