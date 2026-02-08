import {
  Button,
  type Dict,
  Input,
  NativeSelect,
  NumberInput,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Switch,
  tx,
} from "@resolid/react-ui";
import { type ReactNode, useState } from "react";
import { SpriteIcon } from "~/components/sprite-icon";

export type PropItem = {
  name: string;
  type: string;
  control: string;
  typeValues: null | string[];
  description: string;
  defaultValue?: string;
  required: boolean;
};

export const MdxCodeDemo = (props: {
  children: (props: Dict<string | boolean | number | undefined>) => ReactNode;
  componentProps: PropItem[];
  settingProps: Record<string, string | undefined>;
}) => {
  const settingPropsKeys = Object.keys(props.settingProps);

  const validProps = props.componentProps
    .filter((prop) => {
      return settingPropsKeys.includes(prop.name);
    })
    .sort((a, b) => {
      return settingPropsKeys.indexOf(a.name) - settingPropsKeys.indexOf(b.name);
    });

  const [state, setState] = useState<Dict<string | boolean | number | undefined>>(
    Object.fromEntries(
      validProps.map(({ name, defaultValue }) => {
        const value = props.settingProps[name]
          ? props.settingProps[name]
          : defaultValue && /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(defaultValue)
            ? defaultValue
            : defaultValue == "Number.MIN_SAFE_INTEGER" || defaultValue == "Number.MAX_SAFE_INTEGER"
              ? undefined
              : defaultValue == "true" || defaultValue == "false"
                ? defaultValue == "true"
                : defaultValue
                  ? defaultValue.slice(1, -1)
                  : undefined;

        return [name, value];
      }),
    ),
  );

  return (
    <div className={"relative"}>
      <div className={"flex min-h-32 items-center justify-center"}>{props.children(state)}</div>
      <Popover placement={"top-end"}>
        <PopoverTrigger
          className={"absolute start-0 bottom-0"}
          render={(props) => <Button size={"xs"} variant={"soft"} color={"neutral"} {...props} />}
        >
          属性设置
        </PopoverTrigger>
        <PopoverContent className={"flex flex-col gap-3 p-3 text-sm"}>
          <PopoverArrow />
          {validProps.map((prop) => {
            const propInputId = `prop-${prop.name}`;

            return (
              <div className={"flex items-center justify-between gap-5"} key={propInputId}>
                {prop.control == "boolean" && (
                  <Switch
                    size={"sm"}
                    checked={Boolean(state[prop.name])}
                    onChange={(value) => {
                      setState((prev) => ({ ...prev, [prop.name]: value }));
                    }}
                  >
                    {prop.description}
                  </Switch>
                )}
                {prop.control == "string" && (
                  <>
                    <label htmlFor={propInputId}>{prop.description}</label>
                    <Input
                      id={propInputId}
                      size={"xs"}
                      className={"w-1/2"}
                      autoComplete={"off"}
                      value={state[prop.name] as string}
                      onChange={(value) => {
                        setState((prev) => ({ ...prev, [prop.name]: value }));
                      }}
                    />
                  </>
                )}
                {prop.control == "number" && (
                  <>
                    <label htmlFor={propInputId}>{prop.description}</label>
                    <NumberInput
                      id={propInputId}
                      size={"xs"}
                      className={"w-1/2"}
                      value={state[prop.name] ? Number(state[prop.name]) : undefined}
                      onChange={(value) => {
                        setState((prev) => ({ ...prev, [prop.name]: value }));
                      }}
                    />
                  </>
                )}
                {prop.control == "select" &&
                  (prop.name == "color" ? (
                    <>
                      <span>{prop.description}</span>
                      <div className={"inline-flex w-auto justify-between gap-1"}>
                        {prop.typeValues?.map((option) => {
                          const color = option.toString().slice(1, -1);

                          return (
                            <button
                              className={tx(
                                "inline-flex h-6 w-6 items-center justify-center rounded-md text-fg-emphasized",
                                color == "primary" && "bg-bg-primary-emphasis",
                                color == "secondary" && "bg-bg-secondary-emphasis",
                                color == "success" && "bg-bg-success-emphasis",
                                color == "warning" && "bg-bg-warning-emphasis",
                                color == "danger" && "bg-bg-danger-emphasis",
                                color == "neutral" && "bg-bg-neutral-emphasis",
                              )}
                              key={`${prop.name}-${color}`}
                              title={color}
                              onClick={() => {
                                setState((prev) => ({ ...prev, [prop.name]: color }));
                              }}
                            >
                              {state[prop.name] == color && (
                                <SpriteIcon size={"1.25em"} name={"check"} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <label htmlFor={propInputId}>{prop.description}</label>
                      <NativeSelect
                        id={propInputId}
                        size={"xs"}
                        value={String(state[prop.name])}
                        onChange={(e) => {
                          setState((prev) => ({
                            ...prev,
                            [prop.name]:
                              e.target.value == "true" || e.target.value == "false"
                                ? e.target.value == "true"
                                : e.target.value,
                          }));
                        }}
                      >
                        {prop.typeValues?.map((item) => {
                          const option =
                            item != "true" && item != "false" ? item.trim().slice(1, -1) : item;

                          return (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </>
                  ))}
              </div>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
};
