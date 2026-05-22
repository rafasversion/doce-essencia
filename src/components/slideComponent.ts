export default class Slide {
  container: HTMLElement | null;
  prevButton: HTMLElement | null;
  nextButton: HTMLElement | null;

  constructor() {
    this.container = document.querySelector(".produtos__container");

    this.prevButton = document.querySelector(".produtos__botao-prev");

    this.nextButton = document.querySelector(".produtos__botao-next");
  }

  activeNext(): void {
    this.nextButton?.addEventListener("click", () => {
      this.container?.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    });
  }

  activePrev(): void {
    this.prevButton?.addEventListener("click", () => {
      this.container?.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    });
  }

  init(): this {
    this.activeNext();
    this.activePrev();

    return this;
  }
}