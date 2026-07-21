import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND_NAME} collects, stores, and shares data in the app and on this site.`,
};

const EFFECTIVE_DATE = "July 21, 2026";
const CONTACT_EMAIL = "bjc.dev.app@gmail.com";

export default function PrivacyPage() {
  return (
    <PageShell>
      <header className="mb-8 max-w-2xl sm:mb-10">
        <h1
          className="text-[34px] font-bold leading-tight tracking-tight sm:text-[44px]"
          style={{ color: "var(--cp-ink)", fontFamily: "var(--font-display)" }}
        >
          Privacy Policy
        </h1>
        <p
          className="mt-4 text-[15px] leading-relaxed"
          style={{ color: "var(--cp-graphite)" }}
        >
          Effective {EFFECTIVE_DATE}
        </p>
      </header>

      <div
        className="space-y-8 text-[15px] leading-relaxed sm:text-[16px]"
        style={{ color: "var(--cp-graphite)" }}
      >
        <section>
          <p>
            This policy covers the {BRAND_NAME} website and the {BRAND_NAME}{" "}
            iOS app. There is no {BRAND_NAME} account server — the app stores
            your training data on your own device, and the sections below
            explain exactly what leaves it, and where it goes.
          </p>
        </section>

        <section>
          <h2
            className="text-[19px] font-semibold sm:text-[21px]"
            style={{ color: "var(--cp-ink)" }}
          >
            What we collect
          </h2>
          <div className="mt-3 space-y-4">
            <div>
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "var(--cp-ink)" }}
              >
                Identity (optional)
              </h3>
              <p className="mt-1">
                If you sign in with Apple or Google, or enter it yourself, we
                store your name, email, and profile photo on your device. You
                can skip this entirely and use the app with no name at all.
              </p>
            </div>
            <div>
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "var(--cp-ink)" }}
              >
                Training data
              </h3>
              <p className="mt-1">
                Your goal race, race date, goal time, training frequency,
                weekly mileage, experience level, and preferences — all
                answered during setup and stored on your device to build and
                adjust your training plan.
              </p>
            </div>
            <div>
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "var(--cp-ink)" }}
              >
                Injury check-in
              </h3>
              <p className="mt-1">
                A self-reported flag and severity rating for current pain or
                injury, used only to keep your plan conservative. This is not
                medical information we interpret or diagnose, and it stays on
                your device.
              </p>
            </div>
            <div>
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "var(--cp-ink)" }}
              >
                Coach conversations
              </h3>
              <p className="mt-1">
                Messages you send to Coach, along with relevant profile
                context (your goal race, experience, and current week&rsquo;s
                plan), are sent to Anthropic to generate a response. See{" "}
                <span style={{ color: "var(--cp-ink)" }}>Third parties</span>{" "}
                below.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2
            className="text-[19px] font-semibold sm:text-[21px]"
            style={{ color: "var(--cp-ink)" }}
          >
            Third parties
          </h2>
          <p className="mt-3">
            We don&rsquo;t sell your data. The app talks directly to these
            services on your behalf — each has its own privacy practices,
            linked below:
          </p>
          <div className="mt-3 space-y-4">
            <div>
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "var(--cp-ink)" }}
              >
                Apple
              </h3>
              <p className="mt-1">
                Handles Sign in with Apple and all in-app purchases through
                the App Store. See{" "}
                <a
                  href="https://www.apple.com/legal/privacy/"
                  className="underline underline-offset-2 transition-colors duration-150"
                  style={{
                    textDecorationColor: "var(--cp-cinder)",
                    color: "var(--cp-ink)",
                  }}
                >
                  Apple&rsquo;s privacy policy
                </a>
                .
              </p>
            </div>
            <div>
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "var(--cp-ink)" }}
              >
                Google
              </h3>
              <p className="mt-1">
                Handles Google Sign-In, providing your name, email, and
                profile photo if you choose that option. See{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="underline underline-offset-2 transition-colors duration-150"
                  style={{
                    textDecorationColor: "var(--cp-cinder)",
                    color: "var(--cp-ink)",
                  }}
                >
                  Google&rsquo;s privacy policy
                </a>
                .
              </p>
            </div>
            <div>
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "var(--cp-ink)" }}
              >
                Anthropic
              </h3>
              <p className="mt-1">
                Powers the Coach chat feature. Your messages and relevant
                training context are sent to Anthropic to generate replies.
                See{" "}
                <a
                  href="https://www.anthropic.com/legal/privacy"
                  className="underline underline-offset-2 transition-colors duration-150"
                  style={{
                    textDecorationColor: "var(--cp-cinder)",
                    color: "var(--cp-ink)",
                  }}
                >
                  Anthropic&rsquo;s privacy policy
                </a>
                .
              </p>
            </div>
            <div>
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "var(--cp-ink)" }}
              >
                Intervals.icu
              </h3>
              <p className="mt-1">
                Optional. If you connect your own Intervals.icu account with
                your own personal API key, the app fetches your activities and
                fitness/fatigue data directly from Intervals.icu and stores a
                local copy on your device to power adaptive training plans.
                You can disconnect at any time, which deletes that local copy.
                See{" "}
                <a
                  href="https://intervals.icu/privacy"
                  className="underline underline-offset-2 transition-colors duration-150"
                  style={{
                    textDecorationColor: "var(--cp-cinder)",
                    color: "var(--cp-ink)",
                  }}
                >
                  Intervals.icu&rsquo;s privacy policy
                </a>
                .
              </p>
            </div>
            <div>
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "var(--cp-ink)" }}
              >
                Superwall
              </h3>
              <p className="mt-1">
                Manages subscriptions and entitlement status for PaceSplits
                Pro. See{" "}
                <a
                  href="https://superwall.com/privacy"
                  className="underline underline-offset-2 transition-colors duration-150"
                  style={{
                    textDecorationColor: "var(--cp-cinder)",
                    color: "var(--cp-ink)",
                  }}
                >
                  Superwall&rsquo;s privacy policy
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2
            className="text-[19px] font-semibold sm:text-[21px]"
            style={{ color: "var(--cp-ink)" }}
          >
            Where your data lives
          </h2>
          <p className="mt-3">
            Your name, training answers, and injury check-in are stored
            locally on your device. Your Intervals.icu key is stored in your
            device&rsquo;s Keychain. We don&rsquo;t operate a server that
            collects or stores this information — deleting the app removes
            it. Disconnecting Intervals.icu, or using Log Out in Profile,
            clears the corresponding data immediately.
          </p>
        </section>

        <section>
          <h2
            className="text-[19px] font-semibold sm:text-[21px]"
            style={{ color: "var(--cp-ink)" }}
          >
            Notifications
          </h2>
          <p className="mt-3">
            Workout reminders are scheduled locally on your device based on
            your training plan. They don&rsquo;t involve a push notification
            server or any third party.
          </p>
        </section>

        <section>
          <h2
            className="text-[19px] font-semibold sm:text-[21px]"
            style={{ color: "var(--cp-ink)" }}
          >
            Your choices
          </h2>
          <p className="mt-3">
            Skip sign-in and use the app anonymously. Disconnect Intervals.icu
            at any time from Profile. Use Log Out in Profile to clear your
            saved name, email, and photo without affecting your training plan.
            Delete the app to remove everything stored on your device.
          </p>
        </section>

        <section>
          <h2
            className="text-[19px] font-semibold sm:text-[21px]"
            style={{ color: "var(--cp-ink)" }}
          >
            Children
          </h2>
          <p className="mt-3">
            {BRAND_NAME} is not directed at children under 13, and we
            don&rsquo;t knowingly collect data from them.
          </p>
        </section>

        <section>
          <h2
            className="text-[19px] font-semibold sm:text-[21px]"
            style={{ color: "var(--cp-ink)" }}
          >
            Changes to this policy
          </h2>
          <p className="mt-3">
            If this policy changes, we&rsquo;ll update the effective date
            above. Material changes will be reflected here before they take
            effect.
          </p>
        </section>

        <section>
          <h2
            className="text-[19px] font-semibold sm:text-[21px]"
            style={{ color: "var(--cp-ink)" }}
          >
            Contact
          </h2>
          <p className="mt-3">
            Questions about this policy or your data:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline underline-offset-2 transition-colors duration-150"
              style={{
                textDecorationColor: "var(--cp-cinder)",
                color: "var(--cp-ink)",
              }}
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
