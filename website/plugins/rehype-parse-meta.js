export function rehypeParseMeta(meta) {
  const map = {};

  // oxlint-disable-next-line prefer-named-capture-group
  const online = /online=["']?([a-zA-Z]+)["']?/;
  // oxlint-disable-next-line prefer-named-capture-group
  const codeGroup = /\[([^\]]+)]/;

  let m;

  if ((m = online.exec(meta))) {
    [, map.online] = m;
  }

  if ((m = codeGroup.exec(meta))) {
    [, map.codeGroup] = m;
  }

  return map;
}
