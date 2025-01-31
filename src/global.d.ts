declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}
declare module "*.css";

interface ImportMetaEnv {
    readonly VITE_WEATHER_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
