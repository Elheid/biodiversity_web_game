/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_API_PORT: string;
    // добавьте другие переменные по мере необходимости
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}