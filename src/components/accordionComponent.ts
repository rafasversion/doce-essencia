export default class Accordion {
  accordionList: NodeListOf<HTMLElement>;
  activeClass: string;

  constructor(list: string) {
    this.accordionList = document.querySelectorAll<HTMLElement>(list);
    this.activeClass = "ativo";
  }

  toggleAccordion(item: HTMLElement): void {
    item.classList.toggle(this.activeClass);
    if (item.nextElementSibling instanceof HTMLElement) {
      item.nextElementSibling.classList.toggle(this.activeClass);
    }
  }

  addAccordionEvent(): void {
    this.accordionList.forEach((item) => {
      item.addEventListener("click", () => this.toggleAccordion(item));
    });
  }

  init(): void {
    if (this.accordionList.length) {
      this.toggleAccordion(this.accordionList[0]);
      console.log(this.accordionList[0]);
      this.addAccordionEvent();
    }
  }
}
