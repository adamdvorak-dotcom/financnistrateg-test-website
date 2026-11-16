"use client";
import { useLang } from "./useLang";
import { NewsletterBox } from "../NewsletterBox";
import { T } from "../texty";

/* Přihlášení k newsletteru pod výpisem článků. Dřív bylo na konci úvodní stránky. */
export function BlogNewsletter() {
  const [lang] = useLang();
  const t = T[lang];
  return (
    <section id="newsletter" className="blog-nl">
      <div className="container">
        <NewsletterBox
          lang={lang}
          t={{ eye: t.nlEye, title: t.nlTitle, sub: t.nlSub, ph: t.nlPh, btn: t.nlBtn, sending: t.nlSending, note: t.nlNote }}
        />
      </div>
    </section>
  );
}
