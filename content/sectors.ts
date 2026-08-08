/**
 * The seven MCBC Finance investment sectors (§7.4).
 *
 * `image` is a path under /public/images/sectors/. Placeholder artwork ships
 * with the repo so the grid renders; swap in real photography by replacing
 * the files, keeping the same names.
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
    image: "/images/sectors/consumer-goods.png",
  },
  {
    name: "Energy",
    industries: "Green Energy, Oil & Gas, Distribution",
    image: "/images/sectors/energy.png",
  },
  {
    name: "Healthcare",
    industries: "Pharmacy, Biotech, Equipment",
    image: "/images/sectors/healthcare.png",
  },
  {
    name: "TMT",
    industries: "Software, Hardware, Telecom, Media, Fintech",
    image: "/images/sectors/tmt.png",
  },
  {
    name: "Industrials",
    industries: "Industrials & Manufacturing",
    image: "/images/sectors/industrials.png",
  },
  {
    name: "Prediction Market",
    industries: "Quant-Based Odds & Forecasting",
    image: "/images/sectors/prediction-market.png",
  },
  {
    name: "FIG",
    industries: "Financial Firms & Commercial Banks",
    image: "/images/sectors/fig.png",
  },
];
