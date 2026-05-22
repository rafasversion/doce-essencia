import CarouselScroll from "./components/carrosselComponent.js";
import Slide from "./components/slideComponent.js";
import Accordion from "./components/accordionComponent.js";
import Hamburguer from './components/hamburguerComponent.js';

const carrossel = new CarouselScroll();
carrossel.init();

const slide = new Slide();
slide.init();

const accordion = new Accordion('[data-anime="accordion"] .faq__lista-pergunta');
accordion.init();

const hamburguer = new Hamburguer();
hamburguer.init();