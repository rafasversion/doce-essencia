export default class Accordion {
    accordionList;
    activeClass;
    constructor(list) {
        this.accordionList = document.querySelectorAll(list);
        this.activeClass = "ativo";
    }
    toggleAccordion(item) {
        item.classList.toggle(this.activeClass);
        if (item.nextElementSibling instanceof HTMLElement) {
            item.nextElementSibling.classList.toggle(this.activeClass);
        }
    }
    addAccordionEvent() {
        this.accordionList.forEach((item) => {
            item.addEventListener("click", () => this.toggleAccordion(item));
        });
    }
    init() {
        if (this.accordionList.length) {
            this.toggleAccordion(this.accordionList[0]);
            console.log(this.accordionList[0]);
            this.addAccordionEvent();
        }
    }
}
