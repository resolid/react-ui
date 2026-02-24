import type { ComponentProps } from "react";
import { Polymorphic, tx } from "@resolid/react-ui";

export const MdxHeading = (props: ComponentProps<"h2" | "h3" | "h4"> & { as: string }) => {
  const { as, id, children, className, ...rest } = props;

  return (
    <Polymorphic as={as} id={id} className={tx("scroll-mt-20", className)} {...rest}>
      <a className="no-underline hover:underline" href={`#${id}`}>
        {children}
      </a>
    </Polymorphic>
  );
};
