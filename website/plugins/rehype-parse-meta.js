const metaValues = [
  {
    name: "online",
    // oxlint-disable-next-line prefer-named-capture-group
    regex: /online=["']?([a-zA-Z]+)["']?/,
  },
  {
    name: "codeGroup",
    // oxlint-disable-next-line prefer-named-capture-group
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
