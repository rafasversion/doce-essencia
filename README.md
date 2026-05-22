# Doce Essência

Landing page responsiva para uma salão de beleza fictício, desenvolvida para prática de desenvolvimento front-end com TypeScript, responsividade, organização de componentes visuais.
Projeto foi feito em 2025.

## Funcionalidades

- Carrossel de procedimentos com sincronização de conteúdo
- Slider horizontal de produtos
- FAQ com accordion list interativo
- Navegação por seções
- Layout responsivo para desktop e mobile

## Tecnologias

- TypeScript
- HTML5
- CSS3

## Estrutura do projeto

```text
src
├── components
│   ├── accordionComponent.ts
│   ├── carrosselComponent.ts
│   ├── hamburguerComponent.ts
│   └── slideComponent.ts
├── pages
├── styles
│   ├── agendamento
│   ├── global
│   ├── home
│   └── utils
├── img
├── agendar.html
├── index.html
└── index.ts
```

## Componentes

- `Accordion` → controle do FAQ expansível
- `CarouselScroll` → gerenciamento do carrossel principal e bloqueio de scroll
- `Hamburguer` → controle do menu mobile
- `Slide` → navegação horizontal dos produtos

## Execução

Clone o repositório e abra o arquivo `index.html` no navegador.

```bash
git clone https://github.com/seu-usuario/doce-essencia.git
npm install
npm run build
```
