import {
  getPosts,
  getPost,
  getHeadings,
  getReadingMinutes,
  getFaq,
  splitFaq,
  slugify,
  FAQ_ID,
} from "@/lib/journal";

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

describe("slugify", () => {
  it("is stable when applied twice", () => {
    for (const text of ["Understanding Athens' Rental Landscape", "Γειτονιές & Κόστος", "A/B — test"]) {
      expect(slugify(slugify(text))).toBe(slugify(text));
    }
  });

  it("drops apostrophes rather than turning them into separators", () => {
    expect(slugify("A Renter's Playbook")).toBe("a-renters-playbook");
  });

  it("strips accents so Greek headings slug to plain ASCII-ish anchors", () => {
    expect(slugify("Γειτονιές")).toBe("γειτονιες");
  });
});

describe("getHeadings", () => {
  it("finds every section of every post, with unique anchor ids", () => {
    for (const post of getPosts()) {
      const headings = getHeadings(post.body);
      const h2 = headings.filter((heading) => heading.level === 2);

      expect(h2.length).toBeGreaterThanOrEqual(4);
      expect(new Set(headings.map((heading) => heading.id)).size).toBe(headings.length);
      expect(headings.every((heading) => heading.text.trim().length > 0)).toBe(true);
    }
  });

  it("disambiguates repeated headings instead of emitting a duplicate id", () => {
    const headings = getHeadings("## Costs\n\ntext\n\n## Costs\n\nmore");
    expect(headings.map((heading) => heading.id)).toEqual(["costs", "costs-2"]);
  });

  it("ignores hashes inside fenced code blocks", () => {
    expect(getHeadings("## Real\n\n```\n## Not a heading\n```\n")).toHaveLength(1);
  });

  it("strips inline markdown from heading text", () => {
    expect(getHeadings("## The **real** cost")[0]).toMatchObject({
      text: "The real cost",
      id: "the-real-cost",
    });
  });
});

describe("getReadingMinutes", () => {
  it("puts every post in a plausible range", () => {
    for (const post of getPosts()) {
      const minutes = getReadingMinutes(post.body);
      expect(minutes).toBeGreaterThanOrEqual(4);
      expect(minutes).toBeLessThanOrEqual(9);
    }
  });

  it("never returns zero for a short body", () => {
    expect(getReadingMinutes("Three words here")).toBe(1);
  });
});

describe("the closing questions section", () => {
  it("is present and separable in every post", () => {
    for (const post of getPosts()) {
      const { body, faq } = splitFaq(post.body);

      expect(faq, `${post.slug} has no FAQ section`).not.toBeNull();
      expect(body).not.toContain("## Frequently Asked Questions");
      expect(slugify(faq!.split("\n")[0].replace(/^##\s+/, ""))).toBe(FAQ_ID);
    }
  });

  it("parses into four answered questions per post", () => {
    for (const post of getPosts()) {
      const faq = getFaq(post.body);

      expect(faq, post.slug).toHaveLength(4);
      for (const entry of faq) {
        expect(entry.question.length).toBeGreaterThan(0);
        expect(entry.answer.length).toBeGreaterThan(20);
        // A question that swallowed its heading marker would poison the
        // FAQPage structured data built from these.
        expect(entry.question.startsWith("#")).toBe(false);
      }
    }
  });

  it("leaves a body without that section whole", () => {
    expect(splitFaq("## Only section\n\nbody")).toEqual({
      body: "## Only section\n\nbody",
      faq: null,
    });
    expect(getFaq("## Only section\n\nbody")).toEqual([]);
  });
});
