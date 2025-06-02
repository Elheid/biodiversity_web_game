# Переменные в config.js
//время в милисекундах
##  Время раунда: 
CURRENT_DURATION_TIME
##  Время задержки до следующего раунда
CURRENT_TIME_BEETWEN_ROUNDS

## Настройка адреса сервера 
const serverIp // "localhost" // ip сервера
const apiHost = // "5001" // порт сервера



## Настройка qr кодов

export const QRcontent_self  // текст в qr code
export const QRdescription_self // подпись для него

export const QRcontent_ai // текст в qr code
export const QRdescription_ai // подпись для него



## Чтобы добавить язык на фронте нужно 
Добавить его в этот enum
export enum LANGUAGE {
    RUSSIAN = "RUSSIAN",
    ENGLISH = "ENGLISH",
    //ITALIAN = "ITALIAN"
}


export type TextKey // словарь переменных для получения их из бд через хук useTextLang
export const DEFAULT_TEXTS: Record<TextKey, string> // словарь их базовых значений, если язык русский

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
