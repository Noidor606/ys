const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
        // Фаза 4: Уход черного фона (ВОССТАНОВЛЕНО)
        preloader.classList.add('hidden');
        
        preloader.addEventListener('transitionend', () => {
            document.body.style.overflow = 'auto'; // Включаем скролл
            siteWrapper.style.opacity = '1'; // Показываем контент
        }, { once: true });
    }, { once: true });
}

document.addEventListener('DOMContentLoaded', runIntroAnimation);