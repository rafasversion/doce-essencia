export default class CarouselScroll {
    images;
    cards;
    cardsWrapper;
    container;
    currentIndex = 0;
    isAnimating = false;
    scrollTimeout = null;
    totalItems;
    cardHeight = 0;
    isScrollLocked = true;
    containerStartPosition = 0;
    hasReachedEnd = false;
    constructor() {
        this.images = Array.from(document.querySelectorAll('.carrossel__container-imagem'));
        this.cards = Array.from(document.querySelectorAll('.procedimentos__card'));
        this.cardsWrapper = document.querySelector('.procedimentos__wrapper');
        this.container = document.getElementById('procedimentos');
        this.totalItems = this.images.length;
        this.init();
    }
    init() {
        this.calculateCardHeight();
        if (window.innerWidth <= 768) {
            this.unlockScroll();
            this.updateActiveItem(0);
            return;
        }
        this.setupInitialState();
        this.containerStartPosition = this.container.offsetTop;
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: false });
        window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
        window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    calculateCardHeight() {
        if (this.cards.length > 0) {
            const card = this.cards[0];
            const style = window.getComputedStyle(card);
            this.cardHeight = card.offsetHeight +
                parseInt(style.marginBottom) +
                parseInt(style.marginTop);
        }
    }
    setupInitialState() {
        this.updateActiveItem(0);
        this.lockScroll();
    }
    handleScroll(event) {
        const currentPosition = window.scrollY;
        if (!this.isScrollLocked && currentPosition <= this.containerStartPosition) {
            this.lockScroll();
            this.hasReachedEnd = false;
            return;
        }
        if (!this.isScrollLocked)
            return;
        event.preventDefault();
        const scrollDirection = currentPosition > this.containerStartPosition ? 'down' : 'up';
        this.handleNavigation(scrollDirection);
    }
    handleWheel(event) {
        if (this.isScrollLocked) {
            event.preventDefault();
            const scrollDirection = event.deltaY > 0 ? 'down' : 'up';
            this.handleNavigation(scrollDirection);
        }
    }
    handleTouchMove(event) {
        if (this.isScrollLocked) {
            event.preventDefault();
        }
    }
    handleResize() {
        this.calculateCardHeight();
        this.updateCardsPosition();
        this.containerStartPosition = this.container.offsetTop;
    }
    handleNavigation(direction) {
        if (this.isAnimating)
            return;
        this.isAnimating = true;
        const newIndex = direction === 'down'
            ? Math.min(this.currentIndex + 1, this.totalItems - 1)
            : Math.max(this.currentIndex - 1, 0);
        if (newIndex !== this.currentIndex) {
            this.currentIndex = newIndex;
            this.updateActiveItem(this.currentIndex);
        }
        if (this.currentIndex === this.totalItems - 1 && direction === 'down') {
            this.hasReachedEnd = true;
            this.unlockScroll();
        }
        else if (this.hasReachedEnd && direction === 'up') {
            this.lockScroll();
            this.hasReachedEnd = false;
        }
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = window.setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }
    updateActiveItem(index) {
        this.images.forEach((img, i) => {
            img.classList.toggle('ativo', i === index);
        });
        this.cards.forEach((card, i) => {
            card.classList.toggle('ativo', i === index);
        });
        this.updateCardsPosition();
        this.scrollToContainer();
    }
    updateCardsPosition() {
        if (window.innerWidth <= 768)
            return;
        const offset = -this.currentIndex * this.cardHeight;
        this.cardsWrapper.style.transform = `translateY(${offset}px)`;
    }
    scrollToContainer() {
        if (this.isScrollLocked) {
            window.scrollTo({
                top: this.containerStartPosition,
                behavior: 'smooth'
            });
        }
    }
    lockScroll() {
        this.isScrollLocked = true;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        this.scrollToContainer();
    }
    unlockScroll() {
        this.isScrollLocked = false;
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }
    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('wheel', this.handleWheel);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('resize', this.handleResize);
        this.unlockScroll();
    }
}
