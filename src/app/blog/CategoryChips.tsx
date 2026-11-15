import Link from "next/link";
import { articles, type ArticleCategory } from "./articles";
import { categories } from "./categories";

/** Štítky kategorií nad výpisem článků. Každá kategorie má vlastní adresu /blog/<kategorie>. */
export function CategoryChips({ active }: { active: ArticleCategory | null }) {
  return (
    <div className="chips">
      <Link href="/blog" className={active ? "" : "on"}>
        Vše
        <span style={{ marginLeft: 5, opacity: 0.55, fontSize: 11 }}>{articles.length}</span>
      </Link>
      {categories.map((c) => (
        <Link key={c.id} href={`/blog/${c.id}`} className={active === c.id ? "on" : ""}>
          {c.label}
          <span style={{ marginLeft: 5, opacity: 0.55, fontSize: 11 }}>
            {articles.filter((a) => a.category === c.id).length}
          </span>
        </Link>
      ))}
    </div>
  );
}
