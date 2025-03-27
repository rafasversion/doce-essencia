export default class CarouselScroll {
  private images: HTMLImageElement[];
  private cards: HTMLDivElement[];
  private cardsWrapper: HTMLDivElement;
  private container: HTMLElement;
  private currentIndex: number = 0;
  private isAnimating: boolean = false;
  private scrollTimeout: number | null = null;
  private totalItems: number;
  private cardHeight: number = 0;
  private isScrollLocked: boolean = true;
  private containerStartPosition: number = 0;
  private hasReachedEnd: boolean = false;

  constructor() {
    this.images = Array.from(document.querySelectorAll('.carrossel__container-imagem'));
    this.cards = Array.from(document.querySelectorAll('.procedimentos__card'));
    this.cardsWrapper = document.querySelector('.procedimentos__wrapper')!;
    this.container = document.getElementById('procedimentos')!;
    this.totalItems = this.images.length;

    this.init();
  }

  public init(): void {
    this.calculateCardHeight();
    this.setupInitialState();
    this.containerStartPosition = this.container.offsetTop;

    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: false });
    window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private calculateCardHeight(): void {
    if (this.cards.length > 0) {
      const card = this.cards[0];
      const style = window.getComputedStyle(card);
      this.cardHeight = card.offsetHeight +
        parseInt(style.marginBottom) +
        parseInt(style.marginTop);
    }
  }

  private setupInitialState(): void {
    this.updateActiveItem(0);
    this.lockScroll();
  }

  private handleScroll(event: Event): void {
    const currentPosition = window.scrollY;

    if (!this.isScrollLocked && currentPosition <= this.containerStartPosition) {
      this.lockScroll();
      this.hasReachedEnd = false;
      return;
    }

    if (!this.isScrollLocked) return;

    event.preventDefault();
    const scrollDirection = currentPosition > this.containerStartPosition ? 'down' : 'up';
    this.handleNavigation(scrollDirection);
  }

  private handleWheel(event: WheelEvent): void {
    if (this.isScrollLocked) {
      event.preventDefault();
      const scrollDirection = event.deltaY > 0 ? 'down' : 'up';
      this.handleNavigation(scrollDirection);
    }
  }

  private handleTouchMove(event: TouchEvent): void {
    if (this.isScrollLocked) {
      event.preventDefault();
    }
  }

  private handleResize(): void {
    this.calculateCardHeight();
    this.updateCardsPosition();
    this.containerStartPosition = this.container.offsetTop;
  }

  private handleNavigation(direction: 'up' | 'down'): void {
    if (this.isAnimating) return;
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

  private updateActiveItem(index: number): void {
    this.images.forEach((img, i) => {
      img.classList.toggle('ativo', i === index);
    });

    this.cards.forEach((card, i) => {
      card.classList.toggle('ativo', i === index);
    });

    this.updateCardsPosition();
    this.scrollToContainer();
  }

  private updateCardsPosition(): void {
    const offset = -this.currentIndex * this.cardHeight;
    this.cardsWrapper.style.transform = `translateY(${offset}px)`;
    this.cardsWrapper.style.transition = 'transform 0.5s ease';
  }

  private scrollToContainer(): void {
    if (this.isScrollLocked) {
      window.scrollTo({
        top: this.containerStartPosition,
        behavior: 'smooth'
      });
    }
  }

  private lockScroll(): void {
    this.isScrollLocked = true;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    this.scrollToContainer();
  }

  private unlockScroll(): void {
    this.isScrollLocked = false;
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }

  public destroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('resize', this.handleResize);
    this.unlockScroll();
  }
}