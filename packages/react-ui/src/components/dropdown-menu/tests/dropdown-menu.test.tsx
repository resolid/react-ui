import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  type DropdownMenuProps,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../dropdown-menu";

const ComponentUnderTest = (
  props: DropdownMenuProps & {
    onValueChange?: (value: string | number) => void;
  },
) => {
  const { onValueChange, ...rest } = props;
  return (
    <DropdownMenu {...rest}>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuArrow />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Resolid UI</DropdownMenuLabel>
          <DropdownMenuItem>Button</DropdownMenuItem>
          <DropdownMenuItem disabled>Dialog</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          <DropdownMenuItemIndicator>✅</DropdownMenuItemIndicator>
          Check me
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="react" onChange={onValueChange}>
          <DropdownMenuLabel>JS Frameworks</DropdownMenuLabel>
          {["react", "solid", "vue", "svelte"].map((framework) => (
            <DropdownMenuRadioItem
              key={framework}
              value={framework}
              disabled={framework === "svelte"}
            >
              <DropdownMenuItemIndicator>✅</DropdownMenuItemIndicator>
              {framework}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenu>
          <DropdownMenuSubTrigger>CSS Frameworks</DropdownMenuSubTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Tailwind CSS</DropdownMenuItem>
            <DropdownMenuItem>UnoCSS</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

describe("Menu", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should set correct aria attributes on disabled MenuItems", () => {
    render(<ComponentUnderTest open />);

    expect(screen.getByText("Dialog")).toHaveAttribute("aria-disabled", "true");
  });

  it("should not fire onValueChange on disabled MenuItems", async () => {
    const onValueChange = vi.fn();

    render(<ComponentUnderTest open onValueChange={onValueChange} />);

    await userEvent.click(screen.getByText(/svelte/i));

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("should apply correct role to MenuItemGroup", async () => {
    render(<ComponentUnderTest />);

    const button = screen.getByRole("button", { name: /open menu/i });

    fireEvent.click(button);

    await waitFor(() => expect(screen.getAllByRole("group")).toHaveLength(2));
  });

  it("should open on nested menu", async () => {
    render(<ComponentUnderTest />);

    const button = screen.getByRole("button", { name: /open menu/i });

    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText(/Resolid UI/i)).toBeVisible());

    fireEvent.click(screen.getByText(/CSS Frameworks/i));

    await waitFor(() => expect(screen.getByText(/Tailwind CSS/i)).toBeVisible());
  });

  it("should select a radio option", async () => {
    render(<ComponentUnderTest />);

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menuButton);
    await waitFor(() => expect(screen.getByText(/JS Frameworks/i)).toBeVisible());

    const radioButton = screen.getByRole("menuitemradio", { name: /react/i });
    fireEvent.click(radioButton);

    await waitFor(() => expect(radioButton).toHaveAttribute("aria-checked", "true"));
  });

  it("focuses the first item after the menu is opened by keyboard", async () => {
    render(<ComponentUnderTest />);

    const menuButton = screen.getByRole("button", { name: /open menu/i });

    await act(async () => {
      menuButton.focus();
    });

    await userEvent.keyboard("[Enter]");

    const [firstItem, ...otherItems] = screen.getAllByRole("menuitem");

    await waitFor(() => {
      expect(firstItem.tabIndex).to.equal(0);
    });

    otherItems.forEach((item) => {
      expect(item.tabIndex).to.equal(-1);
    });
  });

  it("focuses the first item when down arrow key opens the menu", async () => {
    render(<ComponentUnderTest />);

    const menuButton = screen.getByRole("button", { name: /open menu/i });

    await act(async () => {
      menuButton.focus();
    });

    await userEvent.keyboard("[ArrowDown]");

    const [firstItem, ...otherItems] = screen.getAllByRole("menuitem");

    await waitFor(() => expect(firstItem).toHaveFocus());

    otherItems.forEach((item) => {
      expect(item.tabIndex).to.equal(-1);
    });
  });
});
