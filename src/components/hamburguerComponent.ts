export default class Hamburguer {
  btn: HTMLElement | null;
  menu: HTMLElement | null;
  activeClass: string;

  constructor() {
    this.btn = document.querySelector('#hamburguer');
    this.menu = document.querySelector('.navegacao__lista');
    this.activeClass = 'aberto';
  }

  toggle(): void {
    this.menu?.classList.toggle(this.activeClass);
    this.btn?.classList.toggle(this.activeClass);
  }

  closeOnLink(): void {
    const links = this.menu?.querySelectorAll<HTMLElement>('a');
    links?.forEach((link) => {
      link.addEventListener('click', () => {
        this.menu?.classList.remove(this.activeClass);
        this.btn?.classList.remove(this.activeClass);
      });
    });
  }

  addEvents(): void {
    this.btn?.addEventListener('click', () => this.toggle());
    this.closeOnLink();
  }

  init(): this {
    if (this.btn && this.menu) {
      this.addEvents();
    }
    return this;
  }
}