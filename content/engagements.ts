/**
 * Past engagements for both initiatives (§7.3, §7.4).
 *
 * Note: the Wix site labels the Strategy list "Investment Sectors" — that is
 * a copy-paste error from the Finance page. The correct heading is
 * "Past Engagements" and it lives in copy.ts.
 */

export interface EngagementList {
  strategy: string[];
  finance: string[];
}

export const engagements: EngagementList = {
  strategy: [
    "Digital transformation @ a global health and wellness company",
    "Market entry & growth @ an Ann Arbor restaurant favorite",
    "Social media & pricing strategy @ a local dessert & cafe chain",
  ],
  finance: [
    "Stock pitches in industries including TMT, Consumer, and Industrials",
    "Participation in pitch competitions at Miami University, MIG, and more",
    'Mock IB, PE, and corporate finance "Superday" interviews',
  ],
};

/** "Apply if you like..." bullet lists (§7.3, §7.4). */
export const applyIfYouLike: EngagementList = {
  strategy: [
    "Solving ambiguous problems creatively",
    "Leveraging data and research to craft actionable solutions",
    "Working and bonding with a tight-knit, high-performing team",
  ],
  finance: [
    "Analyzing companies, markets, and financial statements",
    "Building models and turning data into insights",
    "Learning how financial decisions affect real-world outcomes",
  ],
};
