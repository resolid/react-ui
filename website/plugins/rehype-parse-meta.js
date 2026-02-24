const metaValues = [
  {
    name: "online",
    regex: /online=["']?([a-zA-Z]+)["']?/,
  },
  {
    name: "codeGroup",
    regex: /\[([^\]]+)]/,
  },
];

export const rehypeParseMeta = (meta) =>
  metaValues.reduce((map, { name, regex }) => {
    const match = meta.match(regex);

    if (match) {
      [, map[name]] = match;
    }

    return map;
  }, {});
