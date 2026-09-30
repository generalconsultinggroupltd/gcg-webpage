import { notFound } from "next/navigation";

/** Anything under /{lang}/ that no page claims lands here, so visitors get
 * the site's own 404 (with header, footer and their language) rather than
 * the framework's bare one. */
export default function CatchAll() {
  notFound();
}
