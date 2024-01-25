export function initObserver() {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // entry.target.classList.replace('animate-hidden', 'show');
                entry.target.classList.add('show');
            } else {
                // entry.target.classList.replace('show', 'animate-hidden');
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.animate-hidden');

    hiddenElements.forEach((el) => observer.observe(el));
}
