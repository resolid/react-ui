import { visit } from "unist-util-visit";

export default function remarkDetails() {
  return async (root) => {
    visit(root, "mdxJsxFlowElement", (node) => {
      if (node.name === "details") {
        node.name = "Details";
      }
    });
  };
}
