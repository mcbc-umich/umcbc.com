/**
 * The seven MCBC Finance investment sectors (§7.4).
 *
 * `image` is a path under /public/images/sectors/, imported from the Wix
 * mockup and matched to each sector by what the photo actually shows.
 * Prediction Market is deliberately empty — the mockup ships six sector
 * photos for seven sectors, so one was always going to be missing. An empty
 * string renders a plain tinted panel rather than a broken image.
 *
 * TODO [LICENSING] — two of these arrived as stock-library preview files: an
 * Adobe Stock "360_F_…" image for Healthcare and a Shutterstock "…260nw…"
 * image for Industrials. Confirm the club holds a licence for those two or
 * replace them. Consumer Goods (Pexels) and TMT (Unsplash) are free to use.
 */

export interface Sector {
  name: string;
  industries: string;
  image: string;
}

export const sectors: Sector[] = [
  {
    name: "Consumer Goods",
    industries: "Electronics, Packaging, Retail",
    image: "/images/sectors/consumer-goods.webp",
  },
  {
    name: "Energy",
    industries: "Green Energy, Oil & Gas, Distribution",
    image: "/images/sectors/energy.webp",
  },
  {
    name: "Healthcare",
    industries: "Pharmacy, Biotech, Equipment",
    image: "/images/sectors/healthcare.webp",
  },
  {
    name: "TMT",
    industries: "Software, Hardware, Telecom, Media, Fintech",
    image: "/images/sectors/tmt.webp",
  },
  {
    name: "Industrials",
    industries: "Industrials & Manufacturing",
    image: "/images/sectors/industrials.webp",
  },
  {
    name: "Prediction Market",
    industries: "Quant-Based Odds & Forecasting",
    image: "",
  },
  {
    name: "FIG",
    industries: "Financial Firms & Commercial Banks",
    image: "/images/sectors/fig.webp",
  },
];
