import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import zhCN from "../../../locales/zh-CN";
import { LocaleProvider } from "../../provider/locale-provider";
import { Pagination, type PaginationProps } from "../pagination";

const ComponentUnderTest = (props: PaginationProps) => {
  return (
    <LocaleProvider locale={zhCN}>
      <Pagination {...props} />
    </LocaleProvider>
  );
};

describe("Pagination", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest total={100} pageSize={10} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should update page when item is clicked", async () => {
    render(<ComponentUnderTest total={100} pageSize={10} />);

    const pageTwoLink = screen.getByLabelText("第 2 页");

    expect(pageTwoLink).not.toHaveAttribute("aria-current", "page");

    await userEvent.click(pageTwoLink);

    expect(pageTwoLink).toHaveAttribute("aria-current", "page");
  });

  it("should update page when next button is clicked", async () => {
    render(<ComponentUnderTest total={100} pageSize={10} />);

    const pageOneLink = screen.getByLabelText("第 1 页");
    expect(pageOneLink).toHaveAttribute("aria-current", "page");

    const nextPageLink = screen.getByLabelText("下一页");

    await userEvent.click(nextPageLink);

    const pageTwoLink = screen.getByLabelText("第 2 页");
    expect(pageTwoLink).toHaveAttribute("aria-current", "page");
  });

  it("should update page when prev button is clicked", async () => {
    render(<ComponentUnderTest total={100} pageSize={10} />);

    const pageTwoLink = screen.getByLabelText("第 2 页");

    await userEvent.click(pageTwoLink);
    expect(pageTwoLink).toHaveAttribute("aria-current", "page");

    const prevPageLink = screen.getByLabelText("上一页");
    await userEvent.click(prevPageLink);

    const pageOneLink = screen.getByLabelText("第 1 页");
    expect(pageOneLink).toHaveAttribute("aria-current", "page");
  });
});
