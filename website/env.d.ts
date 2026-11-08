/// <reference types="@resolid/dev/env" />

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly SERVER_PORT: number | undefined;
    readonly UPLOADTHING_API_KEY: string;
  }
}
