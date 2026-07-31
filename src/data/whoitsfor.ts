export interface WhoItsFor {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export const whoIsThisFor: WhoItsFor[] = [
  {
    image: "/assets/uxui_whoitsfor.png",
    eyebrow: "ROLE",
    title: "Portfolio & Brand Designers",
    description: "Your portfolio is the pitch. It has to feel considered before anyone reads a word of it.",
    features: [
      "Grid Reveal for the work index",
      "Case Study Transition between projects",
      "Text Reveal for the pacing of a long-form write-up",
      "Magnetic Button where the CTA needs to feel like software rather than a link"
    ],
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8"></rect><rect x="13" y="3" width="8" height="8"></rect><rect x="3" y="13" width="8" height="8"></rect><rect x="13" y="13" width="8" height="8"></rect></svg>'
  },
  {
    image: "/assets/videographer_whoitsfor.png",
    eyebrow: "ROLE",
    title: "Videographers & Motion Designers",
    description: "Your work moves. Most WordPress themes don't, and an embedded player is a poor substitute for a site that behaves like your reel.",
    features: [
      "Scroll Sequence turns a frame set into scroll-driven playback",
      "Pinned Scroll holds a panel while the story runs past it"
    ],
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'
  },
  {
    image: "/assets/director_whoitsfor.png",
    eyebrow: "ROLE",
    title: "Photographers",
    description: "Image-led sites need presentation, not chrome.",
    features: [
      "Before/After for retouching and process work",
      "Filterable Grid for a body of work with categories",
      "Grid Reveal so the set arrives with intent, not all at once"
    ],
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>'
  },
  {
    image: "/assets/agency_whoitsfor.png",
    eyebrow: "ROLE",
    title: "Studios & Agencies",
    description: "You build client sites and then hand them over. Whatever you install has to still work when you're not there.",
    features: [
      "Nine blocks, theme-agnostic, no page builder dependency",
      "Content survives uninstall",
      "One license covers every site you build"
    ],
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
  }
];
