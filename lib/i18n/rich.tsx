import { Fragment, type ReactNode } from "react";

/**
 * Like t(), but the values can be elements: rich("By sending… our {link}.",
 * { link: <Link …/> }). Lets a translation place the link or highlight
 * wherever its grammar needs it.
 */
export function rich(template: string, values: Record<string, ReactNode>): ReactNode {
  return template.split(/(\{\w+\})/g).map((part, index) => {
    const key = part.match(/^\{(\w+)\}$/)?.[1];
    return <Fragment key={index}>{key && key in values ? values[key] : part}</Fragment>;
  });
}
