/**
 * Everyone the site lists: executive board, senior advisors, desk heads and
 * project managers.
 *
 * PHOTOS: headshots were imported from the Wix mockup and live in
 * /public/images/people/ at 600x600. Setting `photo` to "" renders an initials
 * monogram instead of a broken image, which is what Renzo Silva has today.
 *
 * TODO [PHOTOS] — CHECK EVERY FACE AGAINST EVERY NAME BEFORE LAUNCH.
 * The Wix page markup does not label its headshots, so each photo was matched
 * to a person by its position in the page: the board is interleaved
 * (photo, name, photo, name), while the project managers and desk heads are
 * rendered as a block of photos followed by a block of names. That inference
 * is sound but it is an inference, and putting the wrong face beside a name is
 * more embarrassing than misspelling it. Ten minutes with the live mockup
 * side by side clears it.
 *
 * One error has already been found and fixed this way: Ascher Bustos and
 * Rayhan Zahin had each other's photo. The files were swapped rather than the
 * paths, so every filename still matches the person in it. Worth assuming
 * there are others.
 *
 * Renzo Silva has no photo because the mockup uses one image — "mcbc.jpg" —
 * for both him and Daniel Xiao. It is a photo of one specific person, so it
 * cannot be right for both. It is assigned to Daniel here, since on the About
 * page it sits directly against his name. Confirm, and get Renzo a headshot.
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
  group: "board" | "advisor" | "desk-head" | "project-manager" | "member";
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
    photo: "/images/people/daniel-xiao.webp",
  },
  {
    name: "Felicia Zhongzhang",
    role: "Director of Strategy",
    group: "board",
    linkedin: "https://www.linkedin.com/in/felicia-zhongzhang",
    photo: "/images/people/felicia-zhongzhang.webp",
  },
  {
    name: "Suki Zhao",
    role: "Director of Internal",
    group: "board",
    linkedin: "https://www.linkedin.com/in/suki-zhao-716451265",
    photo: "/images/people/suki-zhao.webp",
  },
  {
    name: "Amelia Kayi",
    role: "Director of Recruiting",
    group: "board",
    linkedin: "https://www.linkedin.com/in/amelia-kayi",
    photo: "/images/people/amelia-kayi.webp",
  },
  {
    name: "Jason Moy",
    role: "Director of External",
    group: "board",
    linkedin: "https://www.linkedin.com/in/jason-moy-132371201",
    photo: "/images/people/jason-moy.webp",
  },
  {
    name: "Sky Ni",
    role: "Director of Finance",
    group: "board",
    linkedin: "https://www.linkedin.com/in/sky-ni",
    // TODO [PHOTOS] — see the members note below.
    photo: "",
  },

  // --- Senior advisors (§7.2) ---
  {
    name: "Angie Xu",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2027",
    linkedin: "https://www.linkedin.com/in/angelie-xu",
    photo: "/images/people/angie-xu.webp",
  },
  {
    name: "Barry Wang",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2027",
    linkedin: "https://www.linkedin.com/in/barrywang73",
    photo: "/images/people/barry-wang.webp",
  },
  {
    name: "Jen Li",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2027",
    linkedin: "https://www.linkedin.com/in/jjenlii",
    photo: "/images/people/jen-li.webp",
  },
  {
    name: "Abhinav Ramanathan",
    role: "Senior Advisor",
    group: "advisor",
    detail: "Computer Engineering 2027",
    linkedin: "https://www.linkedin.com/in/abhinav-ramanathan",
    photo: "/images/people/abhinav-ramanathan.webp",
  },
  {
    name: "Leah Zhou",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2027",
    linkedin: "https://www.linkedin.com/in/leahezhou",
    photo: "/images/people/leah-zhou.webp",
  },
  {
    name: "Alexander Zhang",
    role: "Senior Advisor",
    group: "advisor",
    detail: "Computer Science 2027",
    linkedin: "https://www.linkedin.com/in/alexyz1",
    photo: "/images/people/alexander-zhang.webp",
  },
  {
    name: "Jonathan Song",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA & CS 2028",
    linkedin: "https://www.linkedin.com/in/jonathan-j-song",
    photo: "/images/people/jonathan-song.webp",
  },
  {
    name: "Erika Yee",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2028",
    linkedin: "https://www.linkedin.com/in/yee-erika",
    photo: "/images/people/erika-yee.webp",
  },
  {
    name: "Celina Du",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA & CS & Asian Studies 2028",
    linkedin: "https://www.linkedin.com/in/celinadu",
    photo: "/images/people/celina-du.webp",
  },
  {
    name: "Michael Zheng",
    role: "Senior Advisor",
    group: "advisor",
    detail: "BBA 2028",
    linkedin: "https://www.linkedin.com/in/michael-z-zheng",
    photo: "/images/people/michael-zheng.webp",
  },
  {
    name: "Josh Li",
    role: "Senior Advisor",
    group: "advisor",
    detail: "Data Science 2028",
    linkedin: "https://www.linkedin.com/in/manuli1212",
    photo: "/images/people/josh-li.webp",
  },

  // --- Strategy project managers (§7.3) ---
  {
    name: "Tomas Hall",
    role: "Project Manager",
    group: "project-manager",
    linkedin: "https://www.linkedin.com/in/tom-zionede-hall-97226334b",
    photo: "/images/people/tomas-hall.webp",
  },
  {
    name: "Ascher Bustos",
    role: "Project Manager",
    group: "project-manager",
    // TODO [§15.4] — no LinkedIn URL exists in either source site. Ask him
    // for it, then add: linkedin: "https://www.linkedin.com/in/…"
    photo: "/images/people/ascher-bustos.webp",
  },
  {
    name: "Sean Gretzinger",
    role: "Project Manager",
    group: "project-manager",
    linkedin: "https://www.linkedin.com/in/sean-gretzinger",
    photo: "/images/people/sean-gretzinger.webp",
  },
  {
    name: "Rayhan Zahin",
    role: "Project Manager",
    group: "project-manager",
    linkedin: "https://www.linkedin.com/in/rayhan-zahin",
    photo: "/images/people/rayhan-zahin.webp",
  },

  // --- Finance desk heads (§7.4) — sector assignments follow the Wix site ---
  {
    name: "Ashley Liao",
    role: "Desk Head",
    group: "desk-head",
    detail: "Consumer",
    // TODO [§15.4] — LinkedIn URL missing from both source sites.
    photo: "/images/people/ashley-liao.webp",
  },
  {
    name: "Kyle Cui",
    role: "Desk Head",
    group: "desk-head",
    detail: "Industrial",
    linkedin: "https://www.linkedin.com/in/kyle-cui-977913315",
    photo: "/images/people/kyle-cui.webp",
  },
  {
    name: "Jacob Benninger",
    role: "Desk Head",
    group: "desk-head",
    detail: "TMT",
    linkedin: "https://www.linkedin.com/in/jacob-benninger-26716821b",
    photo: "/images/people/jacob-benninger.webp",
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
    photo: "/images/people/lily-graham.webp",
  },
  {
    name: "Tommy Lu",
    role: "Desk Head",
    group: "desk-head",
    detail: "Healthcare",
    // TODO [§15.4] — LinkedIn URL missing from both source sites.
    photo: "/images/people/tommy-lu.webp",
  },

  // --- Members ------------------------------------------------------------
  // Everyone listed on umcbc.com/our-team who is not already shown elsewhere
  // on the site, in the order that page lists them.
  //
  // TODO [ROLES] — /our-team gives several of these people titles that
  // contradict the current executive board: Jason Jiang as Co-President,
  // Rohan Girvin as Senior Vice President, Faye Guan as VP of External,
  // Karl Li as VP of Education, Gina Wang as VP of Strategy, Jaryl Shao as
  // VP of Finance, and Jesse Chang / Calvin Chen as project managers. Those
  // look like last year's board rather than this year's, so no title is
  // asserted here. Once the board confirms who currently holds what, add a
  // `detail` line to each — that is what shows under the name.
  //
  // TODO [PHOTOS] — these members and Sky Ni have headshots on
  // umcbc.com/our-team, but Google serves them from short-lived signed URLs
  // that cannot be downloaded outside a live browser session, so they could
  // not be imported. Until someone saves them by hand, each card shows an
  // initials monogram. See content/README.md for how to add one.
  {
    name: "Jason Jiang",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/jiang-jason",
    photo: "",
  },
  {
    name: "Rohan Girvin",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/rohangirvin",
    photo: "",
  },
  {
    name: "Faye Guan",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/faye-guan",
    photo: "",
  },
  {
    name: "Karl Li",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/karl-li-a47963255",
    photo: "",
  },
  {
    name: "Gina Wang",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/ginaxwang",
    photo: "",
  },
  {
    name: "Jaryl Shao",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/jaryl-shao",
    photo: "",
  },
  {
    name: "Jesse Chang",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/jesse-chang23",
    photo: "",
  },
  {
    name: "Calvin Chen",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/chencx",
    photo: "",
  },
  {
    name: "Mark Hong",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/markhongat",
    photo: "",
  },
  {
    name: "Christopher Louie",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/thechristopherlouie",
    photo: "",
  },
  {
    name: "Kin Wong",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/kinheiwong",
    photo: "",
  },
  {
    name: "Seraphina Ng",
    role: "Member",
    group: "member",
    linkedin: "https://www.linkedin.com/in/seraphinang",
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
export const members = people.filter((p) => p.group === "member");
