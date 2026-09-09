import { getProperty } from "@/content/properties";
import { sendMail } from "@/lib/notify";
import { submitInquiry } from "@/lib/inquiry";

// Server actions call out to notify.ts to send the actual email; mock it so
// these tests exercise validation and composition only, never real SMTP.
vi.mock("@/lib/notify", () => ({ sendMail: vi.fn().mockResolvedValue(undefined) }));

const mockSendMail = vi.mocked(sendMail);

const property = getProperty("coastal-harmony-alimos")!;

function formData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  return fd;
}

const validBooking = {
  name: "Jamie Rivera",
  email: "jamie@example.com",
  from: "2026-10-01",
  to: "2026-10-05",
  guests: "2",
  message: "Looking forward to it.",
  propertySlug: property.slug,
  website: "", // honeypot, empty = human
};

beforeEach(() => {
  mockSendMail.mockClear();
});

describe("submitInquiry — booking (propertySlug present)", () => {
  it("resolves ok and emails a subject containing the property name", async () => {
    const result = await submitInquiry({ ok: false }, formData(validBooking));

    expect(result.ok).toBe(true);
    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const [call] = mockSendMail.mock.calls[0];
    expect(call.subject).toContain(property.name);
    expect(call.replyTo).toBe(validBooking.email);
    expect(call.text).toContain(validBooking.name);
  });

  it("rejects an invalid email and does not send", async () => {
    const result = await submitInquiry(
      { ok: false },
      formData({ ...validBooking, email: "not-an-email" }),
    );

    expect(result.ok).toBe(false);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("rejects a departure date that is not after the arrival date", async () => {
    const result = await submitInquiry(
      { ok: false },
      formData({ ...validBooking, to: validBooking.from }),
    );

    expect(result.ok).toBe(false);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("rejects a name shorter than two characters", async () => {
    const result = await submitInquiry({ ok: false }, formData({ ...validBooking, name: "J" }));

    expect(result.ok).toBe(false);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("rejects a guest count outside 1-12", async () => {
    const result = await submitInquiry(
      { ok: false },
      formData({ ...validBooking, guests: "20" }),
    );

    expect(result.ok).toBe(false);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("drops a submission silently when the honeypot is filled, without sending", async () => {
    const result = await submitInquiry(
      { ok: false },
      formData({ ...validBooking, website: "http://spam.example" }),
    );

    expect(result).toEqual({ ok: true });
    expect(mockSendMail).not.toHaveBeenCalled();
  });
});

describe("submitInquiry — generic contact (no propertySlug)", () => {
  const validContact = {
    name: "Jamie Rivera",
    email: "jamie@example.com",
    message: "General question about long stays.",
    website: "",
  };

  it("accepts a submission without dates or guests", async () => {
    const result = await submitInquiry({ ok: false }, formData(validContact));

    expect(result.ok).toBe(true);
    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail.mock.calls[0][0].subject).toBe("Website inquiry");
  });

  it("still rejects an invalid email", async () => {
    const result = await submitInquiry(
      { ok: false },
      formData({ ...validContact, email: "nope" }),
    );

    expect(result.ok).toBe(false);
    expect(mockSendMail).not.toHaveBeenCalled();
  });
});
