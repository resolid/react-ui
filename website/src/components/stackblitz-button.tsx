import { Button, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@resolid/react-ui";
import { SpriteIcon } from "~/components/sprite-icon";

export type StackblitzButtonProps = {
  name: string;
  code: string;
};

const sandbox = import.meta.glob<string>(
  ["../assets/sandbox/*.txt", "../assets/icons/sprite.svg", "./sprite-icon.tsx"],
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
);

const commitSha = import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA
  ? import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA.slice(0, 8)
  : import.meta.env.VITE_GIT_COMMIT_SHA.slice(0, 8);

const createHiddenInput = (name: string, value: string) => {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;

  return input;
};

const openProject = async (name: string, code: string) => {
  const inputs: HTMLInputElement[] = [];

  const filename = name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();

  inputs.push(createHiddenInput("project[title]", `${name} - Resolid UI`));
  inputs.push(createHiddenInput("project[template]", "node"));

  inputs.push(
    createHiddenInput(
      "project[files][package.json]",
      sandbox["../assets/sandbox/package.txt"]
        .replaceAll("${filename}", filename)
        .replaceAll("${commitSha}", commitSha),
    ),
  );

  inputs.push(
    createHiddenInput("project[files][tsconfig.json]", sandbox["../assets/sandbox/tsconfig.txt"]),
  );

  inputs.push(
    createHiddenInput("project[files][vite.config.ts]", sandbox["../assets/sandbox/vite.txt"]),
  );

  inputs.push(
    createHiddenInput(
      "project[files][index.html]",
      sandbox["../assets/sandbox/index.txt"].replaceAll("${name}", name),
    ),
  );

  inputs.push(
    createHiddenInput("project[files][src/root.tsx]", sandbox["../assets/sandbox/root.txt"]),
  );

  inputs.push(createHiddenInput("project[files][src/app.tsx]", code));

  inputs.push(
    createHiddenInput(
      "project[files][src/assets/icons/sprite.svg]",
      sandbox["../assets/icons/sprite.svg"],
    ),
  );

  inputs.push(
    createHiddenInput(
      "project[files][src/components/sprite-icon.tsx]",
      sandbox["./sprite-icon.tsx"],
    ),
  );

  inputs.push(createHiddenInput("project[template]", "node"));

  const form = document.createElement("form");
  form.method = "POST";
  form.setAttribute("style", "display:none!important;");
  form.append(...inputs);
  form.action = "https://stackblitz.com/run?file=src%2Fapp.tsx";
  form.target = "_blank";

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export const StackblitzButton = ({ name, code }: StackblitzButtonProps) => {
  const handleClick = async () => {
    await openProject(name, code);
  };

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={handleClick}
        render={(props) => (
          <Button variant={"soft"} color={"neutral"} size={"xs"} iconOnly {...props} />
        )}
      >
        <SpriteIcon size={15} className={"text-fg-primary"} name={"stackblitz"} />
      </TooltipTrigger>
      <TooltipContent className={"text-sm"}>
        <TooltipArrow />在 Stackblitz 打开
      </TooltipContent>
    </Tooltip>
  );
};
