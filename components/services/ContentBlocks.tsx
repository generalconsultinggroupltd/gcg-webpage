/** A titled text block with optional check-list bullet points. */
export type ContentBlock = { title: string; text: string; points?: string[] };
import { CheckIcon } from "@/components/ui/Icons";
import { reveal } from "@/lib/motion";

/** Grid of titled text blocks with optional check-list bullet points. */
export function ContentBlocks({
  items,
  columns = 2,
}: {
  items: ContentBlock[];
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={`grid gap-6 ${
        columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {items.map((item, index) => (
        <li
          key={item.title}
          {...reveal(index % columns)}
          className="flex flex-col rounded-lg border-t-2 border-gold-500 bg-white p-7 shadow-card ring-1 ring-line"
        >
          <h3 className="font-serif text-xl font-semibold text-navy-950">{item.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
          {item.points && (
            <ul className="mt-4 space-y-2">
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-ink">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
