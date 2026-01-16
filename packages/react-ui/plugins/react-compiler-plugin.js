import { transformAsync } from "@babel/core";

/**
 * Create a Rolldown plugin for React Compiler related transforms.
 *
 * @param {Object} options
 * @param {RegExp | RegExp[]} options.filter
 *   A regular expression or array of regular expressions used to match module IDs
 *   that should be processed by this plugin.
 *
 * @returns {import('rolldown').Plugin}
 *   A Rolldown plugin instance.
 */
export const reactCompilerRolldownPlugin = ({ filter }) => {
  return {
    name: "rolldown-react-compiler-plugin",
    transform: {
      filter: {
        id: filter,
      },
      async handler(code, id) {
        const result = await transformAsync(code, {
          filename: id,
          cloneInputAst: false,
          plugins: [
            [
              "babel-plugin-react-compiler",
              {
                target: "19",
              },
            ],
          ],
          parserOpts: { sourceType: "module", plugins: ["jsx", "typescript"] },
          ast: false,
          compact: false,
          sourceMaps: false,
          babelrc: false,
          configFile: false,
        });

        return result.code;
      },
    },
  };
};
