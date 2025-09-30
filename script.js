const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// === НОВАЯ ФУНКЦИЯ ДЛЯ УСТАНОВКИ ВЫСОТЫ ===
function setHeroHeight() {
    const hero = document.getElementById('hero');
    if (hero) {
        // Устанавливаем высоту блока равной реальной внутренней высоте окна
        hero.style.height = `${window.innerHeight}px`;
    }
}

async function runIntroAnimation() {
    const preloader = document.getElementById('preloader');
    const words = document.querySelectorAll('.word');
    const logoContainer = document.getElementById('animated-logo-container');
    const siteWrapper = document.querySelector('.site-wrapper');

    // Фаза 1: Появление слов
    for (let i = 0; i < words.length; i++) {
        await wait(150);
        words[i].classList.add('visible');
    }
    await wait(1000);

    // Фаза 2: Полет слов
    for (let i = 0; i < words.length; i++) {
        await wait(100);
        words[i].classList.add('fly-out');
    }
    await wait(500);

    // Фаза 3: Появление и полет логотипа
    logoContainer.classList.add('visible');
    logoContainer.classList.add('animate-logo');

    logoContainer.addEventListener('animationend', () => {
        // Фаза 4: Уход черного фона
        preloader.classList.add('hidden');

        preloader.addEventListener('transitionend', () => {
            document.body.style.overflow = 'auto'; // Включаем скролл
            siteWrapper.style.opacity = '1'; // Показываем контент
        }, { once: true });
    }, { once: true });
}


document.addEventListener('DOMContentLoaded', () => {
    runIntroAnimation();
    setHeroHeight(); // <-- ВЫЗЫВАЕМ ФУНКЦИЮ ПРИ ЗАГРУЗКЕ
});

// === И СЛУШАЕМ ИЗМЕНЕНИЕ РАЗМЕРА ОКНА ===
// Это сработает, когда панель браузера появится или исчезнет
window.addEventListener('resize', setHeroHeight);
