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

export function rehypeParseMeta(meta) {
  return metaValues.reduce((map, { name, regex }) => {
    const match = meta.match(regex);

    if (match) {
      [, map[name]] = match;
    }

    return map;
  }, {});
}
