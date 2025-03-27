export default class Slide {
  container: HTMLElement[];
  prevButton: HTMLElement | null;
  nextButton: HTMLElement | null;
  constructor() {
    this.container = [
      ...document.querySelectorAll<HTMLElement>(".produtos__container"),
    ];
    this.prevButton = document.querySelector<HTMLElement>(".produtos__botao-prev");
    this.nextButton = document.querySelector<HTMLElement>(".produtos__botao-next");
  }

  activeNext(): void {
    this.container.forEach((item) => {
      const containerDimensios = item.getBoundingClientRect();
      const containerWidth = containerDimensios.width;

      this.nextButton?.addEventListener("click", () => {
        item.scrollLeft += containerWidth;
      });
    });
  }

  activePrev(): void {
    this.container.forEach((item) => {
      const containerDimensios = item.getBoundingClientRect();
      const containerWidth = containerDimensios.width;

      this.prevButton?.addEventListener("click", () => {
        item.scrollLeft -= containerWidth;
      });
    });
  }

  init(): this {
    this.activeNext();
    this.activePrev();
    return this;
  }
}
