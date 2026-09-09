import en from "@/messages/en.json";
import el from "@/messages/el.json";

const keys = (o: object, p = ""): string[] =>
  Object.entries(o).flatMap(([k, v]) =>
    typeof v === "object" ? keys(v as object, `${p}${k}.`) : [`${p}${k}`],
  );

it("el mirrors en exactly", () => expect(keys(el).sort()).toEqual(keys(en).sort()));
it("has nav keys", () =>
  expect(keys(en)).toEqual(
    expect.arrayContaining(["nav.apartments", "nav.owners", "common.bookNow"]),
  ));
