/**
 * The four homepage stats (§7.1).
 *
 * `value` is the number the count-up animates to; `prefix` and `suffix` are
 * rendered either side of it and are never animated.
 */

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 15, prefix: "$", suffix: "K", label: "Assets Under Management" },
  { value: 50, suffix: "+", label: "Businesses Served" },

  // TODO [§15.2] — CONFIRM BEFORE LAUNCH. The homepage stat says "60+ Active
  // Members" while both About pages say "a vibrant community of 50+ members".
  // Pick one number and use it in both places — the About copy lives in
  // copy.ts under `about.community`.
  { value: 60, suffix: "+", label: "Active Members" },

  // TODO [§15.1] — CONFIRM BEFORE LAUNCH. "15+ Years of Experience" cannot be
  // squared with a 2017 founding (that is 9 years). Either correct the number
  // or replace this stat with something verifiable.
  { value: 15, suffix: "+", label: "Years of Experience" },
];
