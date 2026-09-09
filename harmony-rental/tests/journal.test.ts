import { getPosts, getPost } from "@/lib/journal";

const LEGACY_SLUGS = [
  "navigating-athens-rental-market-2024-insiders-guide",
  "how-to-secure-rental-apartment-athens-guide",
  "renters-guide-athens-best-neighborhoods",
  "furnished-vs-unfurnished-apartments-athens-cost-analysis",
];

it("returns all 4 legacy posts with their exact legacy slugs", () => {
  const posts = getPosts();
  expect(posts).toHaveLength(4);
  expect(new Set(posts.map((post) => post.slug))).toEqual(new Set(LEGACY_SLUGS));
});

it("keeps each post's body substantial (tables and FAQs preserved, not stubs)", () => {
  for (const post of getPosts()) {
    expect(post.body.length).toBeGreaterThan(3000);
  }
});

it("gives every post a non-empty title and description", () => {
  for (const post of getPosts()) {
    expect(post.title.trim().length).toBeGreaterThan(0);
    expect(post.description.trim().length).toBeGreaterThan(0);
  }
});

it("sorts newest first, then by title (all four share the legacy publish date)", () => {
  const posts = getPosts();
  expect(posts.every((post) => post.date === "2025-10-06")).toBe(true);
  const titles = posts.map((post) => post.title);
  expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
});

it("tags every post with the renting-in-athens category", () => {
  for (const post of getPosts()) {
    expect(post.category).toBe("renting-in-athens");
  }
});

it("getPost resolves a known slug and preserves table markup in the body", () => {
  const post = getPost("furnished-vs-unfurnished-apartments-athens-cost-analysis");
  expect(post?.title).toBe("Furnished vs Unfurnished: Athens Cost Analysis");
  expect(post?.body).toContain("| Expense Category |");
  expect(post?.body).toContain("€8,000 - €12,000");
});

it("getPost returns undefined for an unknown slug", () => {
  expect(getPost("not-a-real-post")).toBeUndefined();
});
