/* Finanční preventivka: pět oblastí po čtyřech tvrzeních. Jediný zdroj pro stránku testu (vkládá se do ní
   jako JSON) i pro server, který podle odpovědí skládá e-mail s výsledkem.
   id tvrzení, t = text, w = váha pro pořadí kroků, tip = doporučený krok. */
export type Tvrzeni = { id: string; t: string; w: number; tip: string; n?: string };
export type Oblast = { id: number; name: string; items: Tvrzeni[] };

export const AREAS: Oblast[] = [
  { id: 1, name: "Firma bez majitele", items: [
    { id: "1.1", t: "Firma vydrží dva měsíce bez mého telefonu.", w: 7, tip: "Naplánujte si dva týdny pryč a sepište, co se během nich zaseklo. To je seznam úkolů pro druhou linii." },
    { id: "1.2", t: "Stav zakázek vidím v systému a nikomu kvůli tomu nemusím volat.", w: 5, tip: "Převeďte stav zakázek do jednoho systému, kde ho vidí vedení i vy. Co je jen v hlavách a v telefonech, se ztratí ve chvíli, kdy jeden člověk vypadne." },
    { id: "1.3", t: "Když nemůžu, má kdo za firmu podepisovat i platit: druhý jednatel nebo prokurista s dispozičním právem k účtům.", w: 10, tip: "Rozhodněte, komu svěříte prokuru nebo funkci druhého jednatele. S advokátem ověřte, že může jednat sám, a v bance mu nastavte dispoziční právo k účtům." },
    { id: "1.4", t: "Máme druhou linii vedení pro obchod, provoz a finance.", w: 6, tip: "Pro každou oblast pojmenujte jednoho člověka a dejte mu rozhodovací pravomoc s jasným limitem." }
  ]},
  { id: 2, name: "Peníze mimo firmu", items: [
    { id: "2.1", t: "Víc než čtvrtina mého majetku je mimo firmu.", w: 7, tip: "Rozhodněte, jakou část zisku si každý rok vyplatíte, a držte se toho, i když by se peníze hodily ve firmě." },
    { id: "2.2", t: "Víc než čtvrtinu majetku mám v investicích mimo firmu, tedy ve fondech, akciích, dluhopisech nebo nemovitostech k pronájmu. Vlastní bydlení ani chalupu nepočítám.", w: 8, tip: "Vlastní bydlení vás neuživí. Postavte vedle firmy majetek, který vydělává i bez vás a dá se v případě potřeby prodat." },
    { id: "2.3", t: "Vím, kolik si z firmy beru mzdou a kolik dividendou, a mám to rozmyšlené na pár let dopředu.", w: 5, tip: "S účetní a daňovým poradcem si spočítejte, kolik vytáhnout mzdou, kolik dividendou a kolik za vás může poslat firma na DIP nebo penzijko." },
    { id: "2.4", t: "Kdyby firma rok nic nevyplatila, rodina by z majetku mimo firmu žila dál jako dosud.", w: 8, tip: "Spočítejte si, kolik domácnost utratí za rok, a mějte tolik mimo firmu v penězích nebo investicích, které jdou rychle prodat. Špatný rok ve firmě vás pak nedonutí brát si z ní peníze, které zrovna potřebuje sama." }
  ]},
  { id: 3, name: "Rodina a dokumenty", items: [
    { id: "3.1", t: "Mám notářskou závěť a v ní určeného správce pozůstalosti.", w: 9, tip: "Správce pozůstalosti jde platně určit jen u notáře, v závěti psané doma ne. Ujme se správy, hned jak se dozví o vaší smrti, a ve firmě může vykonávat vaše práva společníka, třeba zvolit nového jednatele." },
    { id: "3.2", t: "Mám předběžné prohlášení pro případ, kdy kvůli nemoci nebo úrazu nebudu moct rozhodovat.", w: 9, tip: "U notáře určete, kdo bude za vás rozhodovat a jak, kdybyste to sami nezvládli. Na firmu to samo nestačí: prodat nebo zastavit váš podíl smí opatrovník jen se souhlasem soudu." },
    { id: "3.3", t: "Partner, partnerka nebo jiný blízký člověk ví, kde co mám a komu zavolat, kdyby se mi něco stalo.", w: 8, tip: "Sepište jednu stránku: kde co máte, kdo má k čemu přístup a komu volat jako prvnímu." },
    { id: "3.4", t: "Můj podíl ve firmě nepatří do společného jmění, nebo to máme s manželkou či manželem vyřešené manželskou smlouvou.", n: "Pokud nejste v manželství, odpovězte ano.", w: 6, tip: "Zjistěte, jestli podíl patří do společného jmění. Pokud ano, proberte s notářem nebo advokátem manželskou smlouvu." }
  ]},
  { id: 4, name: "Daně a struktura", items: [
    { id: "4.1", t: "Vím, kdy mi u podílu doběhne časový test pro osvobození příjmu z prodeje.", w: 6, tip: "Dohledejte, kdy a jak jste podíl nabyli. Příjem fyzické osoby z prodeje podílu v s.r.o. je osvobozený po pěti letech držby, u akcií po třech, a nad pět milionů ho musíte oznámit finančnímu úřadu. Holding nebo jinou změnu struktury proberte s daňovým poradcem dřív, než začnete jednat s kupcem." },
    { id: "4.2", t: "Ve společenské smlouvě nebo dohodě se společníky mám vyřešené, co bude s mým podílem, když zemřu nebo z firmy odejdu.", w: 6, tip: "S advokátem projděte společenskou smlouvu nebo zakladatelskou listinu: jestli podíl přejde na dědice, kdo za ně bude hlasovat a jak se případně vyrovnáte se společníky. Upravit ji můžete jen zaživa." },
    { id: "4.3", t: "Nemovitosti, ve kterých firma podniká, mám oddělené od provozu, nebo vím, proč to nedělám.", n: "Pokud firma žádné nemovitosti nevlastní, odpovězte ano.", w: 5, tip: "S daňovým poradcem rozhodněte, jestli a kdy oddělit nemovitosti od provozu. Udělejte to s předstihem, změnu těsně před prodejem může finanční úřad zpochybnit." },
    { id: "4.4", t: "Peníze, které firma nepotřebuje na provoz a rezervu, z ní pravidelně dostávám ven.", w: 5, tip: "Nastavte tři páky: přiměřená mzda pro sociální nároky, příspěvek firmy na DIP až 50 000 Kč ročně bez odvodů a dividendy jednou ročně ze zbytku. Přebytky, které zůstávají ve firmě bez plánu, nerostou, utrácejí se." }
  ]},
  { id: 5, name: "Plán odchodu", items: [
    { id: "5.1", t: "Vím, jestli firmu prodám, předám dětem, nebo si ji nechám a povedou ji manažeři.", w: 7, tip: "Vyslovte směr nahlas, i když není definitivní. Bez něj nejde nic dalšího naplánovat." },
    { id: "5.2", t: "S rodinou máme otevřeně probrané, co bude s firmou, až odejdu.", w: 6, tip: "Domluvte si s rodinou samostatný čas jen na tohle téma, ne u nedělního oběda. Pokud máte děti, zeptejte se jich, co chtějí ony, ne co si myslíte, že chtějí." },
    { id: "5.3", t: "Vím zhruba, kolik firma stojí a co tu cenu zvedá nebo sráží.", w: 4, tip: "Nechte si udělat orientační ocenění a pochopte, co cenu zvedá a co ji sráží." },
    { id: "5.4", t: "Vím, kolik měsíčně potřebuji na život a z čeho to budu mít, až z firmy odejdu.", w: 5, tip: "Spočítejte si, kolik měsíčně potřebujete a jaký majetek to bez firmy pokryje. A rozmyslete si, co budete dělat první pondělí po odchodu z firmy." }
  ]}
];

export function pasmo(total: number) {
  if (total <= 15) return { nazev: "Je co dohánět", text: "Firma i rodina dnes stojí hlavně na vás. Většinu nejdůležitějších kroků ale jde udělat během pár týdnů." };
  if (total <= 29) return { nazev: "Příprava je rozjetá", text: "Základy máte, ale pár důležitých kroků chybí." };
  return { nazev: "Připravenost je vysoká", text: "Většinu práce máte hotovou. Zbývá doladit detaily a jednou ročně to celé projít znovu." };
}

/* Z odpovědí (id tvrzení → 0, 1, 2) spočítá skóre, oblasti a tři kroky stejně jako stránka testu:
   nejdřív odpovědi „ne“, pak „částečně“, při shodě podle váhy. */
export function vyhodnot(odpovedi: Record<string, number>) {
  let total = 0, pocet = 0;
  const kandidati: { it: Tvrzeni; v: number; oblast: string }[] = [];
  const oblasti = AREAS.map((a) => {
    let sub = 0;
    for (const it of a.items) {
      const v = odpovedi[it.id];
      if (v === 0 || v === 1 || v === 2) { sub += v; total += v; pocet += 1; if (v < 2) kandidati.push({ it, v, oblast: a.name }); }
    }
    return { id: a.id, name: a.name, score: sub };
  });
  kandidati.sort((x, y) => x.v - y.v || y.it.w - x.it.w);
  const nejslabsi = oblasti.reduce((m, o) => (o.score < m.score ? o : m), oblasti[0]);
  return { total, pocet, oblasti, nejslabsi, kroky: kandidati.slice(0, 3), pasmo: pasmo(total) };
}
