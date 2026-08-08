/**
 * Everyone the site lists: executive board, senior advisors, desk heads and
 * project managers.
 *
 * PHOTOS: `photo` is a path under /public/images/people/, e.g.
 * "/images/people/daniel-xiao.jpg". It is intentionally left as "" for
 * everyone right now — the club photos have not been exported from the old
 * sites yet (§9 is a human step). A card with no photo renders an initials
 * monogram instead, which is a deliberate fallback rather than a broken image.
 * Drop a square 600x600 file into public/images/people/ and fill in the path.
 *
 * TODO [§15.3] — EVERY NAME AND CLASS YEAR MUST BE CONFIRMED BY A PERSON
 * BEFORE LAUNCH. The two source sites disagree on several spellings
 * (Felicia Zhongzang/Zhongzhang, Jacob Benniger/Benninger, Tom/Tomas Hall,
 * Johnathan/Jonathan Song, Abhinav Ramanthan/Ramanathan) and on Celina Du's
 * program and class year. The spellings below follow the Google Sites roster
 * because each is tied to a LinkedIn URL.
 */

export interface Person {
  name: string;
  role: string;
  group: "board" | "advisor" | "desk-head" | "project-manager";
  detail?: string; // "BBA 2027" or "TMT"
  linkedin?: string; // full https URL
  photo: string; // path under /public/images/people/
}

export const people: Person[] = [
  // --- Executive board (§7.2) — Wix roster, which is the newer of the two ---
  {
    name: "Daniel Xiao",
    role: "President",
    group: "board",
    linkedin: "https://www.linkedin.com/in/xiaodaniel",
    photo: "",
  },
  {
    name: "Felicia Zhongzhang",
    role: "Director of Strategy",
    group: "board",
    linkedin: "https://www.linkedin.com/in/felicia-zhongzhang",
    photo: "",
  },
  {
    name: "Suki Zhao",
    role: "Director of Internal",
    group: "board",
    linkedin: "https://www.linkedin.com/in/suki-zhao-716451265",
    photo: "",
  },
  {
    name: "Amelia Kayi",
    role: "Director of Recruiting",
    group: "board",
    linkedin: "https://www.linkedin.com/in/amelia-kayi",
    photo: "",
  },
  {
    name: "Jason Moy",
    role: "Director of External",
    group: "board",
    linkedin: "https://www.linkedin.com/in/jason-moy-132371201",
    photo: "",
  },

  // --- Senior advisors (§7.2) ---
  {
    name: "Angie Xu",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2027",
    linkedin: "https://www.linkedin.com/in/angelie-xu",
    photo: "",
  },
  {
    name: "Barry Wang",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2027",
    linkedin: "https://www.linkedin.com/in/barrywang73",
    photo: "",
  },
  {
    name: "Jen Li",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2027",
    linkedin: "https://www.linkedin.com/in/jjenlii",
    photo: "",
  },
  {
    name: "Abhinav Ramanathan",
    role: "Senior Advisor",
    group: "advisor",
    detail: "Computer Engineering 2027",
    linkedin: "https://www.linkedin.com/in/abhinav-ramanathan",
    photo: "",
  },
  {
    name: "Leah Zhou",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2027",
    linkedin: "https://www.linkedin.com/in/leahezhou",
    photo: "",
  },
  {
    name: "Alexander Zhang",
    role: "Senior Advisor",
    group: "advisor",
    detail: "Computer Science 2027",
    linkedin: "https://www.linkedin.com/in/alexyz1",
    photo: "",
  },
  {
    name: "Jonathan Song",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA & CS 2028",
    linkedin: "https://www.linkedin.com/in/jonathan-j-song",
    photo: "",
  },
  {
    name: "Erika Yee",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2028",
    linkedin: "https://www.linkedin.com/in/yee-erika",
    photo: "",
  },
  {
    name: "Celina Du",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA & CS & Asian Studies 2028",
    linkedin: "https://www.linkedin.com/in/celinadu",
    photo: "",
  },
  {
    name: "Michael Zheng",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2028",
    linkedin: "https://www.linkedin.com/in/michael-z-zheng",
    photo: "",
  },
  {
    name: "Josh Li",
    role: "Senior Advisor",
    group: "advisor",
    detail: "Data Science 2028",
    linkedin: "https://www.linkedin.com/in/manuli1212",
    photo: "",
  },

  // --- Strategy project managers (§7.3) ---
  {
    name: "Tomas Hall",
    role: "Project Manager",
    group: "project-manager",
    linkedin: "https://www.linkedin.com/in/tom-zionede-hall-97226334b",
    photo: "",
  },
  {
    name: "Ascher Bustos",
    role: "Project Manager",
    group: "project-manager",
    // TODO [§15.4] — no LinkedIn URL exists in either source site. Ask him
    // for it, then add: linkedin: "https://www.linkedin.com/in/…"
    photo: "",
  },
  {
    name: "Sean Gretzinger",
    role: "Project Manager",
    group: "project-manager",
    linkedin: "https://www.linkedin.com/in/sean-gretzinger",
    photo: "",
  },
  {
    name: "Rayhan Zahin",
    role: "Project Manager",
    group: "project-manager",
    linkedin: "https://www.linkedin.com/in/rayhan-zahin",
    photo: "",
  },

  // --- Finance desk heads (§7.4) — sector assignments follow the Wix site ---
  {
    name: "Ashley Liao",
    role: "Desk Head",
    group: "desk-head",
    detail: "Consumer",
    // TODO [§15.4] — LinkedIn URL missing from both source sites.
    photo: "",
  },
  {
    name: "Kyle Cui",
    role: "Desk Head",
    group: "desk-head",
    detail: "Industrial",
    linkedin: "https://www.linkedin.com/in/kyle-cui-977913315",
    photo: "",
  },
  {
    name: "Jacob Benninger",
    role: "Desk Head",
    group: "desk-head",
    detail: "TMT",
    linkedin: "https://www.linkedin.com/in/jacob-benninger-26716821b",
    photo: "",
  },
  {
    name: "Renzo Silva",
    role: "Desk Head",
    group: "desk-head",
    detail: "FIG",
    linkedin: "https://www.linkedin.com/in/renzo-e-65210526b",
    photo: "",
  },
  {
    name: "Lily Graham",
    role: "Desk Head",
    group: "desk-head",
    detail: "Prediction Market",
    linkedin: "https://www.linkedin.com/in/lily-graham-b84151320",
    photo: "",
  },
  // TODO [§15.4] — Alex Ye and Michael Zhang are BOTH listed as the Energy
  // desk head on the Wix site. Confirm whether that is a genuine co-head
  // arrangement or whether one of them runs a different sector, and fix the
  // `detail` below. Neither has a LinkedIn URL in either source site.
  {
    name: "Alex Ye",
    role: "Desk Head",
    group: "desk-head",
    detail: "Energy",
    photo: "",
  },
  {
    name: "Michael Zhang",
    role: "Desk Head",
    group: "desk-head",
    detail: "Energy",
    photo: "",
  },
  {
    name: "Tommy Lu",
    role: "Desk Head",
    group: "desk-head",
    detail: "Healthcare",
    // TODO [§15.4] — LinkedIn URL missing from both source sites.
    photo: "",
  },
];

/** Convenience selectors so pages don't repeat the filter. */
export const board = people.filter((p) => p.group === "board");
export const advisors = people.filter((p) => p.group === "advisor");
export const deskHeads = people.filter((p) => p.group === "desk-head");
export const projectManagers = people.filter(
  (p) => p.group === "project-manager",
);
