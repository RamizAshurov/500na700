// Иницализация слайдера
/*const swiper = new Swiper('.swiper', {
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 0
        },
        480: {
            slidesPerView: 1.2,
            spaceBetween: 15,
        }
    },
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

})
*/
// Получение элментов страницы
const accordion = document.querySelector(".faq__accordion")
const menuItems = document.querySelectorAll(".menu__item")
const burgerMenu = document.querySelector(".header__burger")
const menuList = document.querySelector(".menu")
const backdrop = document.querySelector(".backdrop")
const formBody = document.getElementById("form")
const emailInput = formBody.querySelector("input[type = 'email']")
const phoneInput = formBody.querySelector("input[type = 'tel']")
const dateInput = formBody.querySelector("input[type = 'text']")
const timeInput = formBody.querySelector("input[type = 'datetime']")

const delay = 300 // задержка для перехода

function setActiveClass(className) {
    return className + "_active"
}

function getActiveClass(className) {
    return className.split(" ").find(item => item.indexOf("_active") !== -1)
}

// Функция добавления слушателей событий на поля ввода
function addListenerToInput(target, listener) {
    target.addEventListener("blur", listener)
    target.addEventListener("input", e => e.target.classList.remove("invalid"))
}
// Функция валидации поля
function validateInput(validateFunction) {
    return function(e) {
        if (!validateFunction(e.target.value) && e.target.value)
        e.target.classList.add("invalid")
    }
}

// Функция добаления слушателя события конца анимации для элементов аккордиона
function addAccordionListener(target, selector) {
    const arr = target.querySelectorAll(selector)
    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener("transitionend", function(e) {
            if (e.target.style.height != 0) {
                e.target.style.removeProperty("height")
            }
                
        })
    }
}

// Валидация формы
function formSend(e) {
    e.preventDefault()
    if (validateEmail(emailInput.value) && validatePhone(phoneInput.value)) {
        document.querySelector(".subscribe").classList.add("send")
        setTimeout(() => {
            document.querySelector(".subscribe").classList.remove("send")
            form.reset()
        }, 1000);
    } else {
        validateEmail(emailInput.value) == false ? emailInput.classList.add("invalid") : null
        validatePhone([phoneInput].value) == false ? phoneInput.classList.add("invalid") : null
    }
}

function closeSubMenu(e) {
    if (menuList.classList.contains(getActiveClass(menuList.className))) {
        burgerMenu.classList.remove(getActiveClass(burgerMenu.className))
        menuList.classList.remove(getActiveClass(menuList.className))
    }
    const el = e.target
    el.classList.remove(getActiveClass(el.className))
    document.body.classList.remove("active")
    hide("A")
}

// Обработчик кликов по элементам аккордиона
function toggle(e) {
    const el = e.target
    if (el.tagName != "H4" && el.tagName != "A")
        return
    if (el.classList.contains(getActiveClass(el.className))) {
        hide(el)
    } else {
        if (hide(el)) {
            setTimeout(() => show(el), delay);
        } else {
            show(el)
        }  
    }
}

// Показывает элементы аккордиона
function show(target) {
    if (target.tagName == "A" && !backdrop.classList.contains(getActiveClass(backdrop.className))) {
        backdrop.classList.add(setActiveClass(backdrop.className))
        menuList.classList.add(setActiveClass(menuList.className))
        burgerMenu.classList.add(setActiveClass(burgerMenu.className))
        document.body.classList.add("active")
    }
    console.log(target.nextElementSibling.scrollHeight)
    target.nextElementSibling.style.setProperty("height", target.nextElementSibling.scrollHeight + "px")
    target.classList.add(setActiveClass(target.className)) 
}

// Скрывает элементы аккордиона
function hide(element) {
    let openEl
    if (element.tagName == "H4") {
        openEl = accordion.querySelector(".accordion__title_active")
    } else {
        openEl = menuList.querySelector(".menu__link_active")
    }
    if (openEl) {
        if (element.tagName == "A" && window.innerWidth > 767 && element == openEl) {
            menuList.classList.remove(getActiveClass(menuList.className))
            burgerMenu.classList.remove(getActiveClass(burgerMenu.className))
            backdrop.classList.remove(getActiveClass(backdrop.className))
            document.body.classList.remove("active")
        }
        openEl.nextElementSibling.style.setProperty("height", `calc(${openEl.nextElementSibling.clientHeight}px - 1rem)`)
        openEl.classList.remove(getActiveClass(openEl.className))
        setTimeout(() => {
            openEl.nextElementSibling.style.removeProperty("height")
        }, 0);
    }
    return Boolean(openEl)
}

// Валидация полей
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone){
    let regex = /^(\+7|7|8)[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phone);
}

// Маски полей
function dateInputMask(e) {
    if (e.charCode < 48 || e.charCode > 57) {
        e.preventDefault()
    }
    const length = this.value.length

    if (length == 2 || length == 5) {
        this.value += "."
    }
}

function timeInputMask(e) {
    if (e.charCode < 48 || e.charCode > 57) {
        e.preventDefault()
    }

    if (this.value.length == 2) 
        this.value += ":"
}

function phoneInputMask(e) {
    if (e.charCode < 48 || e.charCode > 57) {
        e.preventDefault()
    }

    const length = this.value.length
    switch (length) {
        case 0:
            if (e.charCode == 55) {
                this.value = "+" + this.value
            } else {
                e.preventDefault()
            }
            break;
        case 2: 
            this.value += " ("
            break;
        case 7: 
            this.value += ") "
            break;
        case 12:
        case 15:
            this.value += "-"
            break;
        default:
            break;
    }
}

dateInput.addEventListener("keypress", dateInputMask)
timeInput.addEventListener("keypress", timeInputMask)
phoneInput.addEventListener("keypress", phoneInputMask)

accordion.addEventListener("click", toggle)
menuList.addEventListener("click", toggle)
backdrop.addEventListener("click", closeSubMenu)
burgerMenu.addEventListener("click", function(e) {
    if (e.target.classList.contains(getActiveClass(e.target.className))) {
        setTimeout(() => {
            for (let i = 0; i < menuList.querySelectorAll(".menu__link_active").length; i++) {
                menuList.querySelectorAll(".menu__link_active")[i].classList.remove("menu__link_active")
             }  
        }, 300);
    }
    burgerMenu.classList.toggle("header__burger_active")
    menuList.classList.toggle("menu_active")
    backdrop.classList.toggle("backdrop_active")
    document.body.classList.toggle("active")
})
form.addEventListener("submit", formSend)

addAccordionListener(accordion, "p")
addAccordionListener(menuList, ".sub-menu__list")

addListenerToInput(emailInput, validateInput(validateEmail))
addListenerToInput(phoneInput, validateInput(validatePhone))