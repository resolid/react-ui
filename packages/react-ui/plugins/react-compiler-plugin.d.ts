import type { Plugin } from "rolldown";

export type ReactCompilerRolldownPluginOptions = {
  filter: RegExp | RegExp[];
};

export declare function reactCompilerRolldownPlugin(
  options: ReactCompilerRolldownPluginOptions,
): Plugin;
