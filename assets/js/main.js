document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
            navToggle.classList.toggle('is-active');
        });
    }

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const item = question.parentElement;

            item.classList.toggle('is-open');

            if (item.classList.contains('is-open')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });
});