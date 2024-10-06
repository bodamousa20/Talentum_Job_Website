# TalentumDemo02

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

```
client
├─ .angular
├─ .editorconfig
├─ .gitignore
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-routing.module.ts
│  │  ├─ app.component.html
│  │  ├─ app.component.scss
│  │  ├─ app.component.spec.ts
│  │  ├─ app.component.ts
│  │  ├─ app.module.ts
│  │  ├─ core
│  │  │  ├─ core.module.ts
│  │  │  └─ services
│  │  │     ├─ logger.spec.ts
│  │  │     └─ logger.ts
│  │  ├─ features
│  │  │  ├─ auth
│  │  │  │  ├─ auth-routing.module.ts
│  │  │  │  ├─ auth.module.ts
│  │  │  │  └─ login
│  │  │  │     ├─ login.component.html
│  │  │  │     ├─ login.component.scss
│  │  │  │     ├─ login.component.spec.ts
│  │  │  │     └─ login.component.ts
│  │  │  ├─ features.module.ts
│  │  │  ├─ home
│  │  │  │  ├─ home
│  │  │  │  │  ├─ home.component.html
│  │  │  │  │  ├─ home.component.scss
│  │  │  │  │  ├─ home.component.spec.ts
│  │  │  │  │  └─ home.component.ts
│  │  │  │  └─ home.module.ts
│  │  │  └─ jobs
│  │  │     ├─ jobs
│  │  │     │  ├─ jobs.component.html
│  │  │     │  ├─ jobs.component.scss
│  │  │     │  ├─ jobs.component.spec.ts
│  │  │     │  └─ jobs.component.ts
│  │  │     ├─ jobs-routing.module.ts
│  │  │     └─ jobs.module.ts
│  │  └─ shared
│  │     ├─ components
│  │     │  ├─ button
│  │     │  │  ├─ button.component.html
│  │     │  │  ├─ button.component.scss
│  │     │  │  ├─ button.component.spec.ts
│  │     │  │  └─ button.component.ts
│  │     │  ├─ category-card
│  │     │  │  ├─ category-card.component.html
│  │     │  │  ├─ category-card.component.scss
│  │     │  │  ├─ category-card.component.spec.ts
│  │     │  │  └─ category-card.component.ts
│  │     │  ├─ components.module.ts
│  │     │  ├─ footer
│  │     │  │  ├─ footer.component.html
│  │     │  │  ├─ footer.component.scss
│  │     │  │  ├─ footer.component.spec.ts
│  │     │  │  └─ footer.component.ts
│  │     │  ├─ header
│  │     │  │  ├─ header.component.html
│  │     │  │  ├─ header.component.scss
│  │     │  │  ├─ header.component.spec.ts
│  │     │  │  └─ header.component.ts
│  │     │  ├─ job-card
│  │     │  │  ├─ job-card.component.html
│  │     │  │  ├─ job-card.component.scss
│  │     │  │  ├─ job-card.component.spec.ts
│  │     │  │  └─ job-card.component.ts
│  │     │  └─ save-button
│  │     │     ├─ save-button.component.html
│  │     │     ├─ save-button.component.scss
│  │     │     ├─ save-button.component.spec.ts
│  │     │     └─ save-button.component.ts
│  │     └─ shared.module.ts
│  ├─ assets
│  │  ├─ fonts
│  │  │  ├─ ClashDisplay-Bold.eot
│  │  │  ├─ ClashDisplay-Bold.ttf
│  │  │  ├─ ClashDisplay-Bold.woff
│  │  │  ├─ ClashDisplay-Bold.woff2
│  │  │  ├─ ClashDisplay-Extralight.eot
│  │  │  ├─ ClashDisplay-Extralight.ttf
│  │  │  ├─ ClashDisplay-Extralight.woff
│  │  │  ├─ ClashDisplay-Extralight.woff2
│  │  │  ├─ ClashDisplay-Font.scss
│  │  │  ├─ ClashDisplay-Light.eot
│  │  │  ├─ ClashDisplay-Light.ttf
│  │  │  ├─ ClashDisplay-Light.woff
│  │  │  ├─ ClashDisplay-Light.woff2
│  │  │  ├─ ClashDisplay-Medium.eot
│  │  │  ├─ ClashDisplay-Medium.ttf
│  │  │  ├─ ClashDisplay-Medium.woff
│  │  │  ├─ ClashDisplay-Medium.woff2
│  │  │  ├─ ClashDisplay-Regular.eot
│  │  │  ├─ ClashDisplay-Regular.ttf
│  │  │  ├─ ClashDisplay-Regular.woff
│  │  │  ├─ ClashDisplay-Regular.woff2
│  │  │  ├─ ClashDisplay-Semibold.eot
│  │  │  ├─ ClashDisplay-Semibold.ttf
│  │  │  ├─ ClashDisplay-Semibold.woff
│  │  │  ├─ ClashDisplay-Semibold.woff2
│  │  │  ├─ ClashDisplay-Variable.eot
│  │  │  ├─ ClashDisplay-Variable.ttf
│  │  │  ├─ ClashDisplay-Variable.woff
│  │  │  └─ ClashDisplay-Variable.woff2
│  │  └─ images
│  │     ├─ curly-arrow-down.svg
│  │     ├─ curly-arrow-up.svg
│  │     ├─ curly-line.svg
│  │     ├─ godaddy-logo.svg
│  │     ├─ header-bg.svg
│  │     ├─ hero-pattern.svg
│  │     ├─ hero-person-02.svg
│  │     ├─ hero-person-03.svg
│  │     ├─ hero-person.svg
│  │     ├─ Hero.svg
│  │     ├─ How_talentum_works.svg
│  │     ├─ Logo.svg
│  │     └─ rectangle.svg
│  ├─ index.html
│  ├─ main.ts
│  ├─ styles
│  │  ├─ theme-overrides.scss
│  │  └─ variables.scss
│  ├─ styles.scss
│  └─ testing-data.ts
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
