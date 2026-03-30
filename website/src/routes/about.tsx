import { mergeMeta } from "@resolid/dev/router";

export const meta = mergeMeta(() => [
  {
    title: "关于",
  },
]);

export default function About() {
  return (
    <div className="mx-auto prose max-w-192 px-4 py-8 dark:prose-invert">
      <h1 className="text-center">关于</h1>
      <p>
        Resolid React UI 是 React 的开源设计系统。使用 React 和 Tailwind CSS
        构建。它提供了一组即用型组件，用于构建具有一致外观的 Web 应用程序。
      </p>
      <h2>技术栈</h2>
      <h3>React</h3>
      <p>
        React 可以改变你对所查看的设计和构建的应用的思考方式。当你使用 React
        构建用户界面时，首先会将其分解为称为组件的部分。接下来，你将描述每个组件的不同视觉状态。最后，你将连接这些组件，使数据通过它们流动。
      </p>
      <h3>Tailwind CSS</h3>
      <p>
        Tailwind CSS 的工作方式是通过扫描所有的 HTML 文件、JavaScript
        组件和其他模板中的类名，生成相应的样式，然后将它们写入一个静态的 CSS
        文件。它速度快、灵活且可靠，且零运行时。
      </p>
      <h3>Floating UI</h3>
      <p>Floating UI 是一个小型库，可帮助您创建 “浮动”元素，例如工具提示、弹出框、下拉菜单等。</p>
      <h3>TanStack Virtual</h3>
      <p>
        TanStack Virtual 是一个无头 UI 实用程序，用于虚拟化 JS/TS、React、Vue、Svelte、Solid、Lit 和
        Angular
        中的一长串元素。它不是组件，因此不会附带或为您呈现任何标记或样式。虽然这需要您进行一些标记和样式，但您将保留对样式、设计和实现的
        100% 控制权。
      </p>
      <h3>Tailwind Variants</h3>
      <p>Tailwind Variants 将 TailwindCSS 的强大功能与一流的变体 API 相结合。</p>
    </div>
  );
}
