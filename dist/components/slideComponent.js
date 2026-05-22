export default class Slide {
    container;
    prevButton;
    nextButton;
    constructor() {
        this.container = document.querySelector(".produtos__container");
        this.prevButton = document.querySelector(".produtos__botao-prev");
        this.nextButton = document.querySelector(".produtos__botao-next");
    }
    activeNext() {
        this.nextButton?.addEventListener("click", () => {
            this.container?.scrollBy({
                left: 320,
                behavior: "smooth",
            });
        });
    }
    activePrev() {
        this.prevButton?.addEventListener("click", () => {
            this.container?.scrollBy({
                left: -320,
                behavior: "smooth",
            });
        });
    }
    init() {
        this.activeNext();
        this.activePrev();
        return this;
    }
}
