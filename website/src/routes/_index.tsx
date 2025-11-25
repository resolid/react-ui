import { Button } from "@resolid/react-ui";
import { HistoryLink } from "~/components/history-link";
import { SpriteIcon } from "~/components/sprite-icon";

// noinspection JSUnusedGlobalSymbols
export default function Index() {
  return (
    <div className={"max-w-3xl mx-auto prose px-4 py-8 dark:prose-invert"}>
      <h1 className={"mt-16 text-center text-[3rem] leading-normal font-[800] md:text-[4rem]"}>
        Resolid UI
      </h1>
      <p className="text-center">
        Resolid React UI 是 React 的开源设计系统。使用 React 和 Tailwind CSS
        构建。它提供了一组即用型组件，用于构建具有一致外观的 Web 应用程序。
      </p>
      <p className={"rounded-md bg-bg-warning p-3 font-bold"}>🧑🏻‍💻 正在开发......</p>
      <div className={"not-prose mt-10 inline-flex w-full items-center justify-center gap-9"}>
        <Button
          size={"xl"}
          render={(props) => <HistoryLink to={"/docs/getting-started"} {...props} />}
        >
          快速开始
        </Button>
        <Button
          color="neutral"
          variant="outline"
          size={"xl"}
          render={(props) => (
            <a
              {...props}
              href="https://github.com/resolid/react-ui"
              target="_blank"
              rel="noreferrer"
            >
              <SpriteIcon size={"1.325em"} className={"me-2"} name={"github"} />
              Github
            </a>
          )}
        />
      </div>
    </div>
  );
}
