import { agent, tool, Sandbox } from "@21st-sdk/agent"
import { z } from "zod"

export default agent({
  runtime: "claude-code",
  model: "claude-sonnet-4-6",
  permissionMode: "bypassPermissions",
  maxTurns: 25,

  systemPrompt: `Jsi AI asistent na webu Adama Dvořáka, nezávislého finančního poradce (financnistrateg.com).
Odpovídáš na dotazy návštěvníků o jeho finančních službách. Vždy odpovídej v jazyce uživatele (česky nebo anglicky).

INFORMACE O ADAMOVI:
- Nezávislý finanční poradce, 8+ let zkušeností
- 200+ spokojených klientů, 1,2 mld Kč ve správě, 98 % klientů doporučí dál
- Certifikovaný poradce, registrován u ČNB, investiční specialista, hypoteční expert
- Kontakt: adamdvorak@financnistrateg.com | +420 111 222 333
- Lokace: Praha osobně, celá ČR online | Po–Pá 9:00–18:00
- PRVNÍ KONZULTACE JE VŽDY ZDARMA

SLUŽBY:
1. Investiční poradenství — portfolio ETF, fondy, dluhopisy, alternativní aktiva, rebalancing
2. Hypotéky & nemovitosti — výběr nejlepší hypotéky, srovnání bank, refinancování
3. Finanční plánování — pojistná ochrana, tvorba rezervy, daňová optimalizace
4. Penzijní připravení — třetí pilíř, soukromé penzijní připojištění, investiční program

JAK SPOLUPRÁCE PROBÍHÁ:
Krok 1: Bezplatná konzultace (online nebo osobně v Praze, bez závazků)
Krok 2: Analýza & strategie (komplexní analýza, strategie na míru)
Krok 3: Realizace plánu (otevření účtů, výběr produktů, nastavení plánu)
Krok 4: Pravidelný monitoring (čtvrtletní přehledy, rebalancing)

PRAVIDLA:
1. Dokumentace je dostupná lokálně v /workspace/llms.txt a /workspace/llms-full.txt
2. Vždy nejprve prohledej lokální soubory pomocí grep — nečti celé soubory
3. Odpovídej stručně a věcně, uváděj konkrétní informace
4. Vždy nabídni kontakt na Adama pro detailní konzultaci (email nebo telefon)
5. Zdůrazni, že první konzultace je zdarma
6. Pokud dotaz nelze zodpovědět z dokumentace, nabídni přeposlání dotazu Adamovi e-mailem

ESKALACE — kdy použít send_email:
- Uživatel se ptá na něco specifického, co není v dokumentaci
- Uživatel chce mluvit přímo s Adamem nebo si domluvit konzultaci
- Dotaz se týká konkrétní finanční situace uživatele
- Uživatel o to požádá
Při odesílání emailu vždy přilož kontext celé konverzace.`,

  sandbox: Sandbox({
    setup: [
      `mkdir -p /home/user/workspace && cd /home/user/workspace && \
DOCS_URL="\${DOCS_URL:-}" && \
DOCS_LLMS_TXT_URL="\${DOCS_LLMS_TXT_URL:-}" && \
if [ -n "$DOCS_LLMS_TXT_URL" ]; then \
  curl -fsSL "$DOCS_LLMS_TXT_URL" -o llms.txt 2>/dev/null || echo "# Could not fetch llms.txt" > llms.txt; \
elif [ -n "$DOCS_URL" ]; then \
  BASE=$(echo "$DOCS_URL" | sed 's|/$||'); \
  curl -fsSL "$BASE/llms.txt" -o llms.txt 2>/dev/null || echo "# Could not fetch llms.txt from $BASE/llms.txt" > llms.txt; \
  curl -fsSL "$BASE/llms-full.txt" -o llms-full.txt 2>/dev/null || true; \
else \
  echo "# No DOCS_URL configured. Set DOCS_URL env var." > llms.txt; \
fi`,
    ],
  }),

  tools: {
    search_docs: tool({
      description:
        "Prohledá lokální dokumentaci podle klíčového slova. Vrátí odpovídající řádky s kontextem.",
      inputSchema: z.object({
        query: z.string().min(1).describe("Hledaný výraz nebo fráze"),
        file: z
          .enum(["llms.txt", "llms-full.txt"])
          .optional()
          .default("llms-full.txt")
          .describe("Který soubor prohledávat"),
      }),
      execute: async ({ query, file }) => {
        const { execSync } = await import("child_process")
        const targetFile = `/home/user/workspace/${file}`
        try {
          const result = execSync(
            `grep -i -n -C 5 ${JSON.stringify(query)} ${JSON.stringify(targetFile)} | head -200`,
            { encoding: "utf-8", timeout: 10_000 },
          )
          return {
            content: [{ type: "text", text: result || `Žádné výsledky pro "${query}" v ${file}.` }],
          }
        } catch {
          return {
            content: [{ type: "text", text: `Žádné výsledky pro "${query}" v ${file}, nebo soubor neexistuje.` }],
          }
        }
      },
    }),

    list_doc_pages: tool({
      description: "Zobrazí přehled všech dostupných stránek z llms.txt.",
      inputSchema: z.object({}),
      execute: async () => {
        const { readFile } = await import("fs/promises")
        try {
          const content = await readFile("/home/user/workspace/llms.txt", "utf-8")
          return { content: [{ type: "text", text: content }] }
        } catch {
          return {
            content: [{ type: "text", text: "llms.txt nenalezen. Ujistěte se, že je nastavena proměnná DOCS_URL." }],
            isError: true,
          }
        }
      },
    }),

    fetch_doc_page: tool({
      description: "Načte konkrétní stránku dokumentace podle URL. Použij, když grep výsledky nestačí.",
      inputSchema: z.object({
        url: z.string().url().describe("Plná URL stránky k načtení"),
      }),
      execute: async ({ url }) => {
        try {
          const res = await fetch(url, {
            headers: { Accept: "text/plain, text/markdown, text/html" },
            signal: AbortSignal.timeout(15_000),
          })
          if (!res.ok) {
            return {
              content: [{ type: "text", text: `Chyba při načítání ${url}: ${res.status} ${res.statusText}` }],
              isError: true,
            }
          }
          const text = await res.text()
          const truncated = text.length > 30_000 ? text.slice(0, 30_000) + "\n\n[...zkráceno]" : text
          return { content: [{ type: "text", text: truncated }] }
        } catch (error) {
          return {
            content: [{ type: "text", text: `Chyba: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
          }
        }
      },
    }),

    send_email: tool({
      description:
        "Přepošle dotaz Adamovi Dvořákovi e-mailem. Použij až po potvrzení uživatelem, nebo pokud uživatel chce rovnou konzultaci.",
      inputSchema: z.object({
        subject: z.string().min(1).describe("Stručný předmět e-mailu"),
        message: z.string().min(1).describe("Text e-mailu s dotazem a kontextem konverzace"),
        user_email: z.string().email().optional().describe("E-mail uživatele pro odpověď (pokud ho poskytl)"),
      }),
      execute: async ({ subject, message, user_email }) => {
        const apiKey = process.env.RESEND_API_KEY
        if (!apiKey) {
          return {
            content: [{ type: "text", text: "Odesílání e-mailů není nakonfigurováno (chybí RESEND_API_KEY)." }],
            isError: true,
          }
        }
        const to = process.env.SUPPORT_EMAIL || "adamdvorak@financnistrateg.com"
        const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
        const body: Record<string, unknown> = {
          from,
          to: [to],
          subject: `[Web Asistent] ${subject}`,
          text: user_email ? `${message}\n\n---\nE-mail uživatele: ${user_email}` : message,
        }
        if (user_email) body.reply_to = user_email
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(15_000),
          })
          if (!res.ok) {
            const err = await res.text()
            return {
              content: [{ type: "text", text: `Chyba při odesílání e-mailu (${res.status}): ${err}` }],
              isError: true,
            }
          }
          const data = await res.json()
          return {
            content: [{ type: "text", text: `E-mail byl úspěšně odeslán (id: ${data.id}). Adam vás brzy kontaktuje.` }],
          }
        } catch (error) {
          return {
            content: [{ type: "text", text: `Chyba: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
          }
        }
      },
    }),
  },
})
