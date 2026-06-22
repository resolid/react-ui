import { visit } from "unist-util-visit";

export default function remarkRemove() {
  return (tree) => {
    visit(tree, ["yaml", "mdxFlowExpression"], (node, index, parent) => {
      if (node.type === "yaml" || /\/\*[\s\S]*?\*\//.test(node.value)) {
        parent.children.splice(index, 1);
        return ["skip", index];
      }
    });
  };
}
