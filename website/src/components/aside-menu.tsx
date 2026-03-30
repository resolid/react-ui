import { tx } from "@resolid/react-ui";
import { HistoryNavLink } from "~/components/history-link";

export type Menu = {
  label: string;
  path?: string;
  children?: Menu[];
};

export type AsideLayoutMenuProps = {
  menus: Menu[];
  onClickMenu: () => void;
};

export function AsideLayoutMenu({ menus, onClickMenu }: AsideLayoutMenuProps) {
  return (
    <ul className="space-y-2 p-4">
      {menus.map((menu) => (
        <MenuItem menu={menu} depth={1} key={menu.label} onClickMenu={onClickMenu} />
      ))}
    </ul>
  );
}

function MenuItem({
  menu,
  depth,
  onClickMenu,
}: {
  menu: Menu;
  depth: number;
  onClickMenu: () => void;
}) {
  return (
    <li>
      {menu.path != null ? (
        <HistoryNavLink
          discover="none"
          className={({ isActive }) =>
            tx(
              "block rounded-md py-1.5",
              depth == 2 && "ps-4",
              isActive ? "bg-bg-primary" : "hover:bg-bg-subtle active:bg-bg-muted",
            )
          }
          onClick={() => onClickMenu()}
          to={menu.path}
          end={menu.path.length == 0}
        >
          {menu.label}
        </HistoryNavLink>
      ) : (
        <h5 className={depth > 1 ? "mb-1 ps-4 font-normal" : "mb-2 font-medium"}>{menu.label}</h5>
      )}
      {menu.children && (
        <ul className="space-y-0.5">
          {menu.children.map((child) => (
            <MenuItem depth={depth + 1} menu={child} key={child.label} onClickMenu={onClickMenu} />
          ))}
        </ul>
      )}
    </li>
  );
}
