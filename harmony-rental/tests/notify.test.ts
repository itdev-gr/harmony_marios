import { sendMail } from "@/lib/notify";

const ORIGINAL_ENV = { ...process.env };

function setEnv(vars: Record<string, string | undefined>) {
  for (const [key, value] of Object.entries(vars)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

const opts = { subject: "Test", text: "Body" };

describe("sendMail — missing SMTP_HOST guard", () => {
  it("logs and resolves (dev fallback) when NODE_ENV is not production", async () => {
    setEnv({ SMTP_HOST: undefined, NODE_ENV: "development", VERCEL_ENV: undefined });
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    await expect(sendMail(opts)).resolves.toBeUndefined();
    expect(infoSpy).toHaveBeenCalled();

    infoSpy.mockRestore();
  });

  it("logs and resolves when NODE_ENV is production but VERCEL_ENV is unset (local `next start`)", async () => {
    setEnv({ SMTP_HOST: undefined, NODE_ENV: "production", VERCEL_ENV: undefined });
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    await expect(sendMail(opts)).resolves.toBeUndefined();
    expect(infoSpy).toHaveBeenCalled();

    infoSpy.mockRestore();
  });

  it("logs and resolves when VERCEL_ENV is 'preview' (not a real production deploy)", async () => {
    setEnv({ SMTP_HOST: undefined, NODE_ENV: "production", VERCEL_ENV: "preview" });
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    await expect(sendMail(opts)).resolves.toBeUndefined();
    expect(infoSpy).toHaveBeenCalled();

    infoSpy.mockRestore();
  });

  it("throws when NODE_ENV and VERCEL_ENV are both 'production' (real prod deploy)", async () => {
    setEnv({ SMTP_HOST: undefined, NODE_ENV: "production", VERCEL_ENV: "production" });

    await expect(sendMail(opts)).rejects.toThrow(/SMTP_HOST/);
  });
});
