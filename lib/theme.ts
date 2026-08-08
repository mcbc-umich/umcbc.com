import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Reads the palette back out of the @theme block in app/globals.css at build
 * time.
 *
 * The generated OG image and favicons are drawn by satori, which can't see
 * CSS custom properties — but §5.1 says no hex value may appear outside the
 * @theme block, and duplicating the palette into TypeScript is exactly the
 * drift that rule exists to prevent. So we parse it instead. This only ever
 * runs during `next build`.
 */
const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

function token(name: string): string {
  const match = css.match(
    new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{3,8})\\s*;`),
  );
  if (!match) {
    throw new Error(
      `--color-${name} is not defined in the @theme block of app/globals.css`,
    );
  }
  return match[1];
}

export const theme = {
  ink: token("ink"),
  blue: token("blue"),
  maize: token("maize"),
  paper: token("paper"),
  fog: token("fog"),
  slate: token("slate"),
  rule: token("rule"),
} as const;
