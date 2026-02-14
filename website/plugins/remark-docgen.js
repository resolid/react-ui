import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";
import { cwd } from "node:process";
import { withCustomConfig } from "react-docgen-typescript";
import { visit } from "unist-util-visit";

export default function ({ sourceRoot }) {
  if (!sourceRoot) {
    throw new Error("Please set sourceRoot.");
  }

  const currentDir = join(cwd(), ".resolid");
  const componentPropsDir = join(currentDir, "component-props");
  const componentDemosDir = join(currentDir, "component-demos");

  mkdirSync(componentPropsDir, { recursive: true });
  mkdirSync(componentDemosDir, { recursive: true });

  return (tree, vfile) => {
    const pageName = vfile.basename.replace(vfile.extname, "");
    const propsData = new Map();

    let demoIndex = 1;
    const demoMdx = [];

    const getComponentPropsInfo = (componentFile) => {
      const cache = propsData.get(componentFile);

      if (cache) {
        return { componentName: cache.componentName, componentPropsVar: cache.componentPropsVar };
      }

      const data = getComponentPropsData(componentFile, sourceRoot, componentPropsDir);

      propsData.set(componentFile, data);

      return { componentName: data.componentName, componentPropsVar: data.componentPropsVar };
    };

    visit(tree, [{ type: "leafDirective", name: "PropsTable" }, "code"], (node, index, parent) => {
      if (!parent || !index) {
        return;
      }

      if (node.type === "code") {
        if ("hasVisited" in node) {
          return;
        }

        if (!node.meta?.includes("demo")) {
          return;
        }

        if (!node.value) {
          return;
        }

        let code = node.value;

        const demoId = `_${pageName}_${demoIndex++}`;
        const demoName = `D_${demoId.replace("-", "_")}`;
        const virtualModulePath = join(componentDemosDir, `${demoId}.tsx`);

        demoMdx.push({
          type: "mdxjsEsm",
          value: `import ${demoName} from ${JSON.stringify(virtualModulePath)}`,
          data: {
            estree: {
              type: "Program",
              sourceType: "module",
              body: [
                {
                  type: "ImportDeclaration",
                  specifiers: [
                    {
                      type: "ImportDefaultSpecifier",
                      local: { type: "Identifier", name: demoName },
                    },
                  ],
                  source: {
                    type: "Literal",
                    value: virtualModulePath,
                    raw: `${JSON.stringify(virtualModulePath)}`,
                  },
                },
              ],
            },
          },
        });

        const propsMeta = getComponentDemoPropsMeta(node.meta);

        const codeDemoAttrs = [];

        if (propsMeta) {
          const { componentName, componentPropsVar } = getComponentPropsInfo(
            propsMeta.componentFile,
          );

          code = code
            .replace("App()", "App(props)")
            .replace(`<${componentName}`, `<${componentName} {...props}`);

          codeDemoAttrs.push({
            type: "mdxJsxAttribute",
            name: "componentProps",
            value: {
              type: "mdxJsxAttributeValueExpression",
              value: componentPropsVar,
              data: {
                estree: {
                  type: "Program",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "Identifier",
                        name: componentPropsVar,
                      },
                    },
                  ],
                  sourceType: "module",
                  comments: [],
                },
              },
            },
          });
          codeDemoAttrs.push({
            type: "mdxJsxAttribute",
            name: "settingProps",
            value: {
              type: "mdxJsxAttributeValueExpression",
              value: JSON.stringify(propsMeta.settingProps),
              data: {
                estree: {
                  type: "Program",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "ObjectExpression",
                        properties: Object.entries(propsMeta.settingProps).map(([key, value]) => ({
                          type: "Property",
                          key: {
                            type: "Identifier",
                            name: key,
                          },
                          computed: false,
                          shorthand: false,
                          kind: "init",
                          value:
                            value === undefined
                              ? { type: "Identifier", name: "undefined" }
                              : {
                                  type: "Literal",
                                  value,
                                  raw: JSON.stringify(value),
                                },
                        })),
                      },
                    },
                  ],
                  sourceType: "module",
                  comments: [],
                },
              },
            },
          });
        }

        parent.children[index] = {
          type: "mdxJsxFlowElement",
          name: "CodeDemo",
          attributes: codeDemoAttrs,
          children: [
            {
              ...node,
              hasVisited: true,
            },
            codeDemoAttrs.length === 0
              ? {
                  type: "mdxJsxFlowElement",
                  name: demoName,
                }
              : {
                  type: "mdxFlowExpression",
                  value: `(props) => <${demoName} {...props} />`,
                  data: {
                    estree: {
                      type: "Program",
                      body: [
                        {
                          type: "ExpressionStatement",
                          expression: {
                            type: "ArrowFunctionExpression",
                            id: null,
                            expression: true,
                            generator: false,
                            async: false,
                            params: [
                              {
                                type: "Identifier",
                                name: "props",
                              },
                            ],
                            body: {
                              type: "JSXElement",
                              openingElement: {
                                type: "JSXOpeningElement",
                                attributes: [
                                  {
                                    type: "JSXSpreadAttribute",
                                    argument: {
                                      type: "Identifier",
                                      name: "props",
                                    },
                                  },
                                ],
                                name: {
                                  type: "JSXIdentifier",
                                  name: demoName,
                                },
                                selfClosing: true,
                              },
                              closingElement: null,
                              children: [],
                              data: {
                                _mdxExplicitJsx: true,
                              },
                            },
                          },
                        },
                      ],
                      sourceType: "module",
                      comments: [],
                    },
                  },
                },
          ],
        };

        if (existsSync(virtualModulePath)) {
          const content = readFileSync(virtualModulePath, "utf8");

          if (content === code) {
            return;
          }
        }

        writeFileSync(virtualModulePath, code, "utf8");
      }

      if (node.type === "leafDirective") {
        const componentFile = node.attributes["file"];

        if (!componentFile) {
          return;
        }

        const { componentPropsVar } = getComponentPropsInfo(componentFile);

        parent.children[index] = {
          type: "mdxJsxFlowElement",
          name: "PropsTable",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "componentProps",
              value: {
                type: "mdxJsxAttributeValueExpression",
                value: componentPropsVar,
                data: {
                  estree: {
                    type: "Program",
                    body: [
                      {
                        type: "ExpressionStatement",
                        expression: {
                          type: "Identifier",
                          name: componentPropsVar,
                        },
                      },
                    ],
                    sourceType: "module",
                    comments: [],
                  },
                },
              },
            },
          ],
        };
      }
    });

    tree.children.unshift(...Array.from(propsData.values(), (item) => item.componentPropsModule));
    tree.children.unshift(...demoMdx);
  };
}

const tsParser = withCustomConfig("tsconfig.json", {
  savePropValueAsString: false,
  skipChildrenPropWithoutDoc: false,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  shouldSortUnions: true,
  propFilter: (prop) => {
    if (["render", "ref", "style", "className"].includes(prop.name)) {
      return false;
    }

    if (prop.description.includes("@ignore")) {
      return false;
    }

    if (prop.declarations && prop.declarations.length > 0) {
      return (
        prop.declarations.find((declaration) => !declaration.fileName.includes("node_modules")) !==
        undefined
      );
    }

    return true;
  },
});

const componentPropsSorts = [
  "name",

  "multiple",
  "value",
  "defaultValue",

  "checked",
  "defaultChecked",

  "onChange",
  "onChangeEnd",

  "open",
  "defaultOpen",
  "onOpenChange",

  "size",
  "color",
  "variant",
  "radius",
  "orientation",
  "duration",

  "disabled",
  "required",
  "readOnly",
  "invalid",
];

const getComponentPropsData = (componentFile, sourceRoot, virtualDir) => {
  const sourceFile = join(sourceRoot, componentFile);
  const componentName = (parse(componentFile).name.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join("");

  const componentPropsFile = join(virtualDir, `${componentName}.json`);

  if (
    !existsSync(componentPropsFile) ||
    statSync(componentPropsFile).mtimeMs < statSync(sourceFile).mtimeMs
  ) {
    const componentDoc = tsParser.parse(sourceFile).find((c) => c.displayName === componentName);

    const props = componentDoc
      ? Object.entries(componentDoc.props)
          .map(([key, value]) => {
            return parsePropsType(key, value);
          })
          .sort((a, b) => {
            return componentPropsSorts.indexOf(a.name) - componentPropsSorts.indexOf(b.name);
          })
      : null;

    writeFileSync(componentPropsFile, JSON.stringify(props, null, 2), "utf8");
  }

  const componentPropsVar = `ComponentProps_${componentName}`;

  return {
    componentName,
    componentPropsVar,
    componentPropsModule: {
      type: "mdxjsEsm",
      value: `import ${componentPropsVar} from ${JSON.stringify(componentPropsFile)}`,
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ImportDeclaration",
              specifiers: [
                {
                  type: "ImportDefaultSpecifier",
                  local: { type: "Identifier", name: componentPropsVar },
                },
              ],
              source: {
                type: "Literal",
                value: componentPropsFile,
                raw: `${JSON.stringify(componentPropsFile)}`,
              },
            },
          ],
        },
      },
    },
  };
};

const getComponentDemoPropsMeta = (meta) => {
  const matches = meta.match(/componentProps=(["']?)([^"'\s]+)\1/);

  if (!matches) {
    return null;
  }

  const metas = matches[2].split("|");

  if (metas.length !== 2) {
    return null;
  }

  return {
    componentFile: metas[0],
    settingProps: Object.fromEntries(
      metas[1].split(",").map((item) => {
        const [key, value] = item.split("=");
        return [key, value];
      }),
    ),
  };
};

const parsePropsType = (typeName, typeValue) => {
  const propType = {
    name: typeName,
    required: typeValue.required,
    description: typeValue.description,
    defaultValue: typeValue.defaultValue?.value ?? "",
    type: typeValue.type.name,
    control: undefined,
    typeValues: undefined,
  };

  if (!typeValue.type.raw) {
    return propType;
  }

  if (["boolean", "string", "number"].includes(typeValue.type.raw)) {
    propType.type = typeValue.type.raw;
    propType.control = typeValue.type.raw;

    return propType;
  }

  if (["ReactNode", "RectElement", "DateValue"].includes(typeValue.type.raw)) {
    propType.type = typeValue.type.raw;

    return propType;
  }

  if (typeValue.type.raw.includes("((")) {
    propType.type = typeValue.type.value.map((v) => v.value).join(" | ");

    return propType;
  }

  if (typeValue.type.raw.includes(" | ")) {
    const typeValues = typeValue.type.raw.split(" | ");

    propType.type = typeValues
      .join(" | ")
      .replace("React.", "")
      .replace(/ReactElement<.*>/g, "ReactElement");

    const stringValues = typeValues.filter((v) => v.includes('"'));

    if (stringValues.length > 0) {
      propType.control = "select";
      propType.typeValues = stringValues;
    }

    return propType;
  }

  if (Array.isArray(typeValue.type.value)) {
    propType.type = typeValue.type.value.map((v) => v.value).join(" | ");

    return propType;
  }

  return propType;
};
