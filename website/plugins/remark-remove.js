import { visit } from "unist-util-visit";

export default function remarkRemove() {
  return (tree) => {
    visit(tree, ["yaml", "mdxFlowExpression"], (node, index, parent) => {
      if (node.type === "yaml" || node.value.match(/\/\*([\s\S]*?)\*\//g)) {
        parent.children.splice(index, 1);
        return ["skip", index];
      }
    });
  };
}
