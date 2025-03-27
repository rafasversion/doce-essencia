export default class Slide {
    container;
    prevButton;
    nextButton;
    constructor() {
        this.container = [
            ...document.querySelectorAll(".produtos__container"),
        ];
        this.prevButton = document.querySelector(".produtos__botao-prev");
        this.nextButton = document.querySelector(".produtos__botao-next");
    }
    activeNext() {
        this.container.forEach((item) => {
            const containerDimensios = item.getBoundingClientRect();
            const containerWidth = containerDimensios.width;
            this.nextButton?.addEventListener("click", () => {
                item.scrollLeft += containerWidth;
            });
        });
    }
    activePrev() {
        this.container.forEach((item) => {
            const containerDimensios = item.getBoundingClientRect();
            const containerWidth = containerDimensios.width;
            this.prevButton?.addEventListener("click", () => {
                item.scrollLeft -= containerWidth;
            });
        });
    }
    init() {
        this.activeNext();
        this.activePrev();
        return this;
    }
}
