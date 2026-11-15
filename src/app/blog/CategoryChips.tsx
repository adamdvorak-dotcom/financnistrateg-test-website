import { articles, type ArticleCategory } from "./articles";
import { categories } from "./categories";
import { ChipsBar, type Chip } from "./ChipsBar";

/**
 * Štítky kategorií nad výpisem článků. Každá kategorie má vlastní adresu /blog/<kategorie>.
 * Počty se počítají tady na serveru, aby se seznam článků neposílal do prohlížeče.
 */
export function CategoryChips({ active }: { active: ArticleCategory | null }) {
  const items: Chip[] = [
    { href: "/blog", label: "Vše", count: articles.length, on: !active },
    ...categories.map((c) => ({
      href: `/blog/${c.id}`,
      label: c.label,
      count: articles.filter((a) => a.category === c.id).length,
      on: active === c.id,
    })),
  ];
  return <ChipsBar items={items} />;
}
