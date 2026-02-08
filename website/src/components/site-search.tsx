import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogPortal,
  DialogTrigger,
  Listbox,
  ListboxContent,
  ListboxFilter,
  ListboxList,
  useEventListener,
} from "@resolid/react-ui";
import { debounce } from "@resolid/utils";
import { useState } from "react";
import { useFetcher } from "react-router";
import { HistoryLink } from "~/components/history-link";
import { SpriteIcon } from "~/components/sprite-icon";

export const SiteSearch = () => {
  const [open, setOpen] = useState(false);

  useEventListener("keydown", (event) => {
    if (event.key.toLowerCase() == "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      setOpen(true);
    }
  });

  const { data, load } = useFetcher<{ value: string; label: string; description: string }[]>();

  const handleChange = debounce(async (value) => {
    if (value != "") {
      await load("/api/search?q=" + value);
    }
  }, 500);

  return (
    <Dialog open={open} onOpenChange={setOpen} finalFocus={false}>
      <DialogTrigger
        render={(props) => (
          <button
            className={
              "inline-flex items-center justify-between rounded-md border border-bg-subtlest bg-bg-subtlest px-2 py-1 text-fg-subtlest hover:bg-bg-normal md:w-70"
            }
            {...props}
          >
            <div className={"inline-flex"}>
              <SpriteIcon size={"1.125em"} className={"md:me-1.5"} name={"search"} />
              <span className={"hidden md:block"}>搜索</span>
            </div>
            <kbd
              className={
                "hidden rounded-md border border-bg-subtle bg-bg-normal px-1.5 py-1 text-[0.75em] leading-none md:block"
              }
            >
              Ctrl + K
            </kbd>
          </button>
        )}
      />
      <DialogPortal>
        <DialogBackdrop />
        <DialogContent className="my-20 max-w-[calc(100vw-1rem)] p-2 md:w-160">
          <Listbox
            className={"w-full border-none"}
            onChange={() =>
              requestAnimationFrame(() => {
                setOpen(false);
              })
            }
            collection={data ?? []}
            searchFilter={() => true}
            renderItem={(item) => {
              return (
                <HistoryLink to={item.value} className={"flex flex-col gap-1"}>
                  <span className={"text-base"}>{item.label}</span>
                  <span className={"text-sm text-fg-subtlest"}>{item.description}</span>
                </HistoryLink>
              );
            }}
          >
            <ListboxFilter onChange={handleChange} />
            <ListboxContent className={"mt-2 max-h-60"}>
              <ListboxList checkmark={false} />
            </ListboxContent>
          </Listbox>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
