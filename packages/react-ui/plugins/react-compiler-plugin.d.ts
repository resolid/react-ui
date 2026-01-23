import type { Plugin } from "rolldown";

export interface ReactCompilerRolldownPluginOptions {
  filter: RegExp | RegExp[];
}

export declare function reactCompilerRolldownPlugin(
  options: ReactCompilerRolldownPluginOptions,
): Plugin;
