/// <reference types="vite/client" />
/// <reference types="@react-router/node" />

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly SERVER_PORT: number | undefined;
  }
}

interface ImportMetaEnv {
  readonly VITE_VERCEL_URL?: string;
  readonly VITE_VERCEL_GIT_COMMIT_SHA?: string;
  readonly VITE_GIT_COMMIT_SHA: string;
  readonly UPLOADTHING_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
